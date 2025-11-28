// assets/app.js

document.addEventListener("DOMContentLoaded", () => {
  // ---- DOM 요소 캐시 ----
  const modeInputs = document.querySelectorAll('input[name="mode"]');
  const nonfsFields = document.getElementById("nonfsFields");
  const fsFields = document.getElementById("fsFields");
  const highRiskFlag = document.getElementById("highRiskFlag");
  const valuationForm = document.getElementById("valuationForm");
  const errorBox = document.getElementById("errorBox");
  const resultsSection = document.getElementById("resultsSection");

  // 결과 카드
  const lowEquityEl = document.getElementById("lowEquityValue");
  const baseEquityEl = document.getElementById("baseEquityValue");
  const highEquityEl = document.getElementById("highEquityValue");
  const lowDescEl = document.getElementById("lowDesc");
  const baseDescEl = document.getElementById("baseDesc");
  const highDescEl = document.getElementById("highDesc");

  const resultTableBody = document.getElementById("resultTableBody");

  let chartInstance = null;

  // ---- 모드 전환 (비금융 / 금융) ----
  modeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const mode = getMode();
      if (mode === "nonfs") {
        nonfsFields.classList.remove("ml-hidden");
        fsFields.classList.add("ml-hidden");
      } else {
        nonfsFields.classList.add("ml-hidden");
        fsFields.classList.remove("ml-hidden");
      }
      toggleModeSpecificOptions(mode);
    });
  });

  // 초기 상태에서도 한 번 호출
  toggleModeSpecificOptions(getMode());

  function getMode() {
    const checked = document.querySelector('input[name="mode"]:checked');
    return checked ? checked.value : "nonfs";
  }

  function toggleModeSpecificOptions(mode) {
    const fsOptionBlocks = document.querySelectorAll(".ml-only-fs");
    fsOptionBlocks.forEach((el) => {
      if (mode === "fs") el.classList.remove("ml-hidden");
      else el.classList.add("ml-hidden");
    });

    const nonfsBlocks = document.querySelectorAll(".ml-only-nonfs");
    nonfsBlocks.forEach((el) => {
      if (mode === "nonfs") el.classList.remove("ml-hidden");
      else el.classList.add("ml-hidden");
    });
  }

  // ---- 1. 기본 멀티플 룰 ----
  // 필요하면 이 숫자만 바꿔서 전체 밴드 튜닝하면 됨
  const multipleRules = {
    nonfs: {
      // EV/EBITDA 기준 업종 평균 (Base)
      baseEbitda: 7.0,
      lowDiff: -1.5, // Low = 5.5배
      highDiff: +1.5, // High = 8.5배
    },
    fs: {
      // PBR 기준 업권 평균 (Base)
      basePbr: 0.9,
      lowDiff: -0.3, // Low = 0.6배
      highDiff: +0.2, // High = 1.1배
    },
  };

  // ---- 2. 플래그/스코어를 멀티플에 반영하는 함수 ----
  function adjustMultiples(mode, rawMultiples, opts) {
    const { sizeBucket, growthScore, isPrivate, isHighRisk, extraShift = 0 } = opts;

    let { low, base, high } = rawMultiples;

    // 규모: 소형이면 살짝 디스카운트, 대형이면 살짝 프리미엄
    const sizeAdj = sizeBucket === "small" ? -0.3 : sizeBucket === "large" ? +0.3 : 0;

    // 성장 스코어: -2~+2 → -0.5~+0.5 정도
    const growthAdj = (growthScore || 0) * 0.25;

    // 금융 포트폴리오 리스크 플래그
    const riskAdj = isHighRisk && mode === "fs" ? -0.1 : 0;

    low += sizeAdj + growthAdj + riskAdj + extraShift;
    base += sizeAdj + growthAdj + riskAdj + extraShift;
    high += sizeAdj + growthAdj + riskAdj + extraShift;

    return { low, base, high };
  }

  // 비금융 플래그 → 멀티플 시프트
  function computeNonfsFlagShift() {
    let shift = 0;

    const highGrowth = document.getElementById("chkGrowth");
    const turnaround = document.getElementById("chkTurnaround");
    const govRisk = document.getElementById("chkGovRisk");
    const cycleRadio = document.querySelector('input[name="cycleNonfs"]:checked');
    const stageRadio = document.querySelector('input[name="stageNonfs"]:checked');

    if (highGrowth && highGrowth.checked) shift += 0.4; // 고성장 → 상향
    if (turnaround && turnaround.checked) shift -= 0.3; // 턴어라운드 → 보수적
    if (govRisk && govRisk.checked) shift -= 0.3; // 회계/내부통제 취약 → 디스카운트

    const cycle = cycleRadio ? cycleRadio.value : "normal";
    if (cycle === "low") shift -= 0.2;
    if (cycle === "high") shift += 0.2;

    const stage = stageRadio ? stageRadio.value : "Mature";
    if (stage === "Early") shift -= 0.2;
    if (stage === "Mature") shift += 0.1; // 성숙기업이면 약간 프리미엄

    return shift;
  }

  // 금융 플래그 → 멀티플 시프트
  function computeFsFlagShift() {
    let shift = 0;

    const govRiskFs = document.getElementById("fsChkGovRisk");
    const cycleRadio = document.querySelector('input[name="cycleFs"]:checked');

    if (govRiskFs && govRiskFs.checked) shift -= 0.1;

    const cycle = cycleRadio ? cycleRadio.value : "normal";
    if (cycle === "low") shift -= 0.1;
    if (cycle === "high") shift += 0.1;

    return shift;
  }

  // ---- 3. 메인 계산 로직 ----
  valuationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorBox.classList.add("ml-hidden");
    errorBox.textContent = "";

    const mode = getMode();
    const growthScore = parseInt(document.getElementById("growthScore").value, 10) || 0;
    const sizeBucket = document.getElementById("sizeBucket").value;
    const isPrivate = document.getElementById("isPrivate").checked;
    const isHighRisk = highRiskFlag && highRiskFlag.checked;
    const currency = document.getElementById("currency").value;

    let inputOk = true;
    const errorMessages = [];

    // 비금융 입력값
    let sales = null;
    let ebitda = null;
    let netIncome = null;
    let debt = null;
    let cash = null;

    // 금융 입력값
    let equityBook = null;
    let netIncomeFs = null;

    if (mode === "nonfs") {
      sales = toNumber("sales");
      ebitda = toNumber("ebitda");
      netIncome = toNumber("netIncome", true);
      debt = toNumber("debt");
      cash = toNumber("cash");

      if (ebitda === null || isNaN(ebitda) || ebitda <= 0) {
        inputOk = false;
        errorMessages.push("EBITDA를 0보다 큰 값으로 입력해주세요.");
      }
    } else {
      equityBook = toNumber("equityBook");
      netIncomeFs = toNumber("netIncomeFs");

      if (equityBook === null || equityBook <= 0) {
        inputOk = false;
        errorMessages.push("자기자본(Book Value)을 0보다 큰 값으로 입력해주세요.");
      }
    }

    if (!inputOk) {
      showError(errorMessages.join(" "));
      return;
    }

    // ---- 멀티플 설정 ----
    let rawMultiples;
    if (mode === "nonfs") {
      const base = multipleRules.nonfs.baseEbitda;
      rawMultiples = {
        low: base + multipleRules.nonfs.lowDiff,
        base,
        high: base + multipleRules.nonfs.highDiff,
      };
    } else {
      const base = multipleRules.fs.basePbr;
      rawMultiples = {
        low: base + multipleRules.fs.lowDiff,
        base,
        high: base + multipleRules.fs.highDiff,
      };
    }

    // 플래그에 따른 추가 시프트
    const extraShift =
      mode === "nonfs" ? computeNonfsFlagShift() : computeFsFlagShift();

    const adjustedMultiples = adjustMultiples(mode, rawMultiples, {
      sizeBucket,
      growthScore,
      isPrivate,
      isHighRisk,
      extraShift,
    });

    // 비상장 할인 (결과 레벨에서 일괄 적용)
    const privateDiscountRate = isPrivate ? 0.25 : 0.0;

    let resultRows = [];
    let chartValues = [];

    if (mode === "nonfs") {
      // EV = EBITDA * 멀티플 / Equity = EV - 순차입금
      const evLow = ebitda * adjustedMultiples.low;
      const evBase = ebitda * adjustedMultiples.base;
      const evHigh = ebitda * adjustedMultiples.high;

      const netDebt = (debt || 0) - (cash || 0);

      const eqLow = evLow - netDebt;
      const eqBase = evBase - netDebt;
      const eqHigh = evHigh - netDebt;

      const eqLowAdj = eqLow * (1 - privateDiscountRate);
      const eqBaseAdj = eqBase * (1 - privateDiscountRate);
      const eqHighAdj = eqHigh * (1 - privateDiscountRate);

      // 카드 업데이트
      lowEquityEl.textContent = formatValue(eqLowAdj, currency);
      baseEquityEl.textContent = formatValue(eqBaseAdj, currency);
      highEquityEl.textContent = formatValue(eqHighAdj, currency);

      lowDescEl.textContent = `EV/EBITDA ${adjustedMultiples.low.toFixed(
        1
      )}배, 비상장 할인 ${privateDiscountRate * 100}% 적용`;
      baseDescEl.textContent = `EV/EBITDA ${adjustedMultiples.base.toFixed(
        1
      )}배, 비상장 할인 ${privateDiscountRate * 100}% 적용`;
      highDescEl.textContent = `EV/EBITDA ${adjustedMultiples.high.toFixed(
        1
      )}배, 비상장 할인 ${privateDiscountRate * 100}% 적용`;

      resultRows = [
        {
          caseName: "Low Case",
          multipleText: `EV/EBITDA ${adjustedMultiples.low.toFixed(1)}배`,
          baseMetric: `EBITDA ${formatValue(ebitda, currency)}`,
          ev: evLow,
          eq: eqLowAdj,
          note: "보수적 하단 밴드",
        },
        {
          caseName: "Base Case",
          multipleText: `EV/EBITDA ${adjustedMultiples.base.toFixed(1)}배`,
          baseMetric: `EBITDA ${formatValue(ebitda, currency)}`,
          ev: evBase,
          eq: eqBaseAdj,
          note: "산업 평균 밴드",
        },
        {
          caseName: "High Case",
          multipleText: `EV/EBITDA ${adjustedMultiples.high.toFixed(1)}배`,
          baseMetric: `EBITDA ${formatValue(ebitda, currency)}`,
          ev: evHigh,
          eq: eqHighAdj,
          note: "고성장/리레이팅 가정",
        },
      ];

      chartValues = [eqLowAdj, eqBaseAdj, eqHighAdj];
    } else {
      // 금융: PBR 기반 → Equity Value = Book * PBR
      const pbrLow = adjustedMultiples.low;
      const pbrBase = adjustedMultiples.base;
      const pbrHigh = adjustedMultiples.high;

      const eqLow = equityBook * pbrLow;
      const eqBase = equityBook * pbrBase;
      const eqHigh = equityBook * pbrHigh;

      const eqLowAdj = eqLow * (1 - privateDiscountRate);
      const eqBaseAdj = eqBase * (1 - privateDiscountRate);
      const eqHighAdj = eqHigh * (1 - privateDiscountRate);

      lowEquityEl.textContent = formatValue(eqLowAdj, currency);
      baseEquityEl.textContent = formatValue(eqBaseAdj, currency);
      highEquityEl.textContent = formatValue(eqHighAdj, currency);

      const riskNote = isHighRisk ? " (리스크 플래그 반영)" : "";
      lowDescEl.textContent = `PBR ${pbrLow.toFixed(
        2
      )}배, 비상장 할인 ${privateDiscountRate * 100}%${riskNote}`;
      baseDescEl.textContent = `PBR ${pbrBase.toFixed(
        2
      )}배, 비상장 할인 ${privateDiscountRate * 100}%${riskNote}`;
      highDescEl.textContent = `PBR ${pbrHigh.toFixed(
        2
      )}배, 비상장 할인 ${privateDiscountRate * 100}%${riskNote}`;

      resultRows = [
        {
          caseName: "Low Case",
          multipleText: `PBR ${pbrLow.toFixed(2)}배`,
          baseMetric: `자기자본 ${formatValue(equityBook, currency)}`,
          ev: eqLow,
          eq: eqLowAdj,
          note: "리스크 반영 하단 밴드",
        },
        {
          caseName: "Base Case",
          multipleText: `PBR ${pbrBase.toFixed(2)}배`,
          baseMetric: `자기자본 ${formatValue(equityBook, currency)}`,
          ev: eqBase,
          eq: eqBaseAdj,
          note: "업권 평균 밴드",
        },
        {
          caseName: "High Case",
          multipleText: `PBR ${pbrHigh.toFixed(2)}배`,
          baseMetric: `자기자본 ${formatValue(equityBook, currency)}`,
          ev: eqHigh,
          eq: eqHighAdj,
          note: "프리미엄/리레이팅 가정",
        },
      ];

      chartValues = [eqLowAdj, eqBaseAdj, eqHighAdj];
    }

    // 테이블 & 차트 렌더링
    renderResultTable(resultRows, currency);
    renderChart(chartValues, currency);

    // 결과 섹션 보여주기
    resultsSection.classList.remove("ml-hidden");
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ---- 유틸리티 함수들 ----
  function toNumber(id, allowEmpty = false) {
    const el = document.getElementById(id);
    if (!el) return null;
    if (allowEmpty && (el.value === "" || el.value === null)) return null;
    const v = parseFloat(el.value);
    return isNaN(v) ? null : v;
  }

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.remove("ml-hidden");
  }

  function formatValue(value, currency) {
    if (value === null || typeof value !== "number" || isNaN(value)) return "-";
    const rounded = Math.round(value * 10) / 10; // 소수 한 자리
    const formatted = rounded.toLocaleString("ko-KR");
    const suffix = currency === "KRW" ? "억 원" : ` ${currency}`;
    return `${formatted}${suffix}`;
  }

  function renderResultTable(rows, currency) {
    resultTableBody.innerHTML = "";
    rows.forEach((row) => {
      const tr = document.createElement("tr");

      const tdCase = document.createElement("td");
      tdCase.textContent = row.caseName;

      const tdMultiple = document.createElement("td");
      tdMultiple.textContent = row.multipleText;

      const tdMetric = document.createElement("td");
      tdMetric.textContent = row.baseMetric;

      const tdEv = document.createElement("td");
      tdEv.textContent = formatValue(row.ev, currency);

      const tdEq = document.createElement("td");
      tdEq.textContent = formatValue(row.eq, currency);

      const tdNote = document.createElement("td");
      tdNote.textContent = row.note;

      tr.appendChild(tdCase);
      tr.appendChild(tdMultiple);
      tr.appendChild(tdMetric);
      tr.appendChild(tdEv);
      tr.appendChild(tdEq);
      tr.appendChild(tdNote);

      resultTableBody.appendChild(tr);
    });
  }

  function renderChart(values, currency) {
    const canvas = document.getElementById("valueChart");
    if (!canvas || typeof Chart === "undefined") return;

    const labels = ["Low", "Base", "High"];

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: `Equity Value (${currency})`,
            data: values,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: "#e5e7eb" }, ticks: { font: { size: 10 } } },
        },
      },
    });
  }
});
