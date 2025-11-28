// assets/app.js

document.addEventListener("DOMContentLoaded", () => {
  const modeInputs = document.querySelectorAll('input[name="mode"]');
  const nonfsFields = document.getElementById("nonfsFields");
  const fsFields = document.getElementById("fsFields");
  const highRiskFlag = document.getElementById("highRiskFlag");
  const valuationForm = document.getElementById("valuationForm");
  const errorBox = document.getElementById("errorBox");
  const resultsSection = document.getElementById("resultsSection");

  // 결과 카드 요소들
  const lowEquityEl = document.getElementById("lowEquityValue");
  const baseEquityEl = document.getElementById("baseEquityValue");
  const highEquityEl = document.getElementById("highEquityValue");
  const lowDescEl = document.getElementById("lowDesc");
  const baseDescEl = document.getElementById("baseDesc");
  const highDescEl = document.getElementById("highDesc");
  const resultTableBody = document.getElementById("resultTableBody");

  let chartInstance = null;

  // ---- 1. 모드 변경에 따른 입력 필드 전환 ----
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
      // 금융 모드일 때만 리스크 플래그 의미 있음
      toggleFsOptions(mode);
    });
  });

  function getMode() {
    const checked = document.querySelector('input[name="mode"]:checked');
    return checked ? checked.value : "nonfs";
  }

  function toggleFsOptions(mode) {
    const fsOptionBlocks = document.querySelectorAll(".ml-only-fs");
    fsOptionBlocks.forEach((el) => {
      if (mode === "fs") {
        el.classList.remove("ml-hidden");
      } else {
        el.classList.add("ml-hidden");
      }
    });
  }

  // ---- 2. 룰북/멀티플 설정 ----
  // 실제 업무에 맞게 숫자 조정하면 됨
  const multipleRules = {
    nonfs: {
      baseEbitda: 7.0,
      lowDiff: -1.5,
      highDiff: +1.5,
    },
    fs: {
      basePbr: 0.9,
      lowDiff: -0.3,
      highDiff: +0.2,
    },
  };

  // 성장 점수, 규모, 비상장 여부 등을 간단하게 반영
  function adjustMultiples(mode, rawMultiples, opts) {
    const { sizeBucket, growthScore, isPrivate, isHighRisk } = opts;

    let { low, base, high } = rawMultiples;

    // 규모: 소형이면 약간 하향, 대형이면 약간 상향
    const sizeAdj = sizeBucket === "small" ? -0.3 : sizeBucket === "large" ? +0.3 : 0;

    // 성장 점수: -2~+2 → -0.5~+0.5 정도로 반영
    const growthAdj = (growthScore || 0) * 0.25;

    // 금융 리스크: PBR 밴드 보수적 조정
    const riskAdj = isHighRisk && mode === "fs" ? -0.1 : 0;

    low += sizeAdj + growthAdj + riskAdj;
    base += sizeAdj + growthAdj + riskAdj;
    high += sizeAdj + growthAdj + riskAdj;

    // 비상장사는 멀티플 자체를 조정하기보단 결과에서 할인 적용 예정
    // 필요하면 여기서도 소폭 조정 가능

    return { low, base, high };
  }

  // ---- 3. 계산 처리 ----
  valuationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    errorBox.classList.add("ml-hidden");
    errorBox.textContent = "";

    const mode = getMode();
    const growthScore = parseInt(document.getElementById("growthScore").value, 10) || 0;
    const sizeBucket = document.getElementById("sizeBucket").value;
    const isPrivate = document.getElementById("isPrivate").checked;
    const isHighRisk = highRiskFlag.checked;

    const currency = document.getElementById("currency").value;

    // 기본 값 검증 + 입력값 파싱
    let inputOk = true;
    let errorMessages = [];

    let sales = null;
    let ebitda = null;
    let netIncome = null;
    let debt = null;
    let cash = null;

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

    // 멀티플 설정
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

    const adjustedMultiples = adjustMultiples(mode, rawMultiples, {
      sizeBucket,
      growthScore,
      isPrivate,
      isHighRisk,
    });

    // 비상장 할인 (%)
    const privateDiscountRate = isPrivate ? 0.25 : 0.0; // 기본 25% 디스카운트

    let resultRows = [];
    let chartValues = [];

    if (mode === "nonfs") {
      const evLow = ebitda * adjustedMultiples.low;
      const evBase = ebitda * adjustedMultiples.base;
      const evHigh = ebitda * adjustedMultiples.high;

      const eqLow = evLow - (debt || 0) + (cash || 0);
      const eqBase = evBase - (debt || 0) + (cash || 0);
      const eqHigh = evHigh - (debt || 0) + (cash || 0);

      const eqLowAdj = eqLow * (1 - privateDiscountRate);
      const eqBaseAdj = eqBase * (1 - privateDiscountRate);
      const eqHighAdj = eqHigh * (1 - privateDiscountRate);

      // 카드 업데이트
      lowEquityEl.textContent = formatValue(eqLowAdj, currency);
      baseEquityEl.textContent = formatValue(eqBaseAdj, currency);
      highEquityEl.textContent = formatValue(eqHighAdj, currency);

      lowDescEl.textContent = `EV/EBITDA ${adjustedMultiples.low.toFixed(1)}배, 비상장 할인 ${
        privateDiscountRate * 100
      }% 적용`;
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
      // 금융: 기본은 PBR 기준
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

      let riskNote = isHighRisk ? " (리스크 반영 밴드)" : "";
      lowDescEl.textContent = `PBR ${pbrLow.toFixed(2)}배, 비상장 할인 ${
        privateDiscountRate * 100
      }%${riskNote}`;
      baseDescEl.textContent = `PBR ${pbrBase.toFixed(2)}배, 비상장 할인 ${
        privateDiscountRate * 100
      }%${riskNote}`;
      highDescEl.textContent = `PBR ${pbrHigh.toFixed(2)}배, 비상장 할인 ${
        privateDiscountRate * 100
      }%${riskNote}`;

      resultRows = [
        {
          caseName: "Low Case",
          multipleText: `PBR ${pbrLow.toFixed(2)}배`,
          baseMetric: `자기자본 ${formatValue(equityBook, currency)}`,
          ev: eqLow, // 금융은 EV ~ Equity로 간주
          eq: eqLowAdj,
          note: "리스크 반영 하단 밴드",
        },
        {
          caseName: "Base Case",
          multipleText: `PBR ${pbrBase.toFixed(2)}배`,
          baseMetric: `자기자본 ${formatValue(equityBook, currency)}`,
          ev: eqBase,
          eq: eqBaseAdj,
          note: "산업 평균 또는 목표 밴드",
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

    // 테이블 렌더링
    renderResultTable(resultRows, currency);

    // 차트 렌더링
    renderChart(chartValues, currency);

    // 결과 섹션 표시
    resultsSection.classList.remove("ml-hidden");
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ---- 유틸 함수들 ----
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
