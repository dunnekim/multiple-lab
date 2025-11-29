// ----- Rulebook: Non-FS industries -----
const nonFsRules = {
  "IT·인터넷·플랫폼": {
    evSalesBand: [1.0, 3.0, 6.0],
    evEbitdaBand: [8, 10, 12],
    earlyPsCap: 5.0,
    psWarningHigh: 6.0,
    typicalEbitdaMargin: 20
  },
  "게임·엔터": {
    evSalesBand: [2.0, 3.5, 6.0],
    evEbitdaBand: [10, 13, 16],
    earlyPsCap: 1.5,
    psWarningHigh: 6.0,
    typicalEbitdaMargin: 25
  },
  "헬스케어·바이오": {
    evSalesBand: [1.0, 2.5, 4.0],
    evEbitdaBand: [8, 11, 14],
    earlyPsCap: 4.0,
    psWarningHigh: 5.0,
    typicalEbitdaMargin: 18
  },
  "반도체·딥테크": {
    evSalesBand: [1.5, 3.0, 6.0],
    evEbitdaBand: null,
    earlyPsCap: 5.0,
    psWarningHigh: 6.0,
    typicalEbitdaMargin: 10
  },
  "로봇·자동화": {
    evSalesBand: [2.0, 3.5, 6.0],
    evEbitdaBand: null,
    earlyPsCap: 5.0,
    psWarningHigh: 6.0,
    typicalEbitdaMargin: 8
  },
  "제조업·부품": {
    evSalesBand: [0.2, 0.6, 1.5],
    evEbitdaBand: [4, 5.5, 7],
    earlyPsCap: 0.7,
    psWarningHigh: 1.5,
    typicalEbitdaMargin: 12
  },
  "원자재": {
    evSalesBand: [0.4, 0.9, 1.4],
    evEbitdaBand: [6, 8, 10],
    earlyPsCap: 1.0,
    psWarningHigh: 1.8,
    typicalEbitdaMargin: 15
  },
  "에너지·유틸리티": {
    evSalesBand: [0.8, 1.3, 2.0],
    evEbitdaBand: [6, 8, 10],
    earlyPsCap: 2.0,
    psWarningHigh: 2.5,
    typicalEbitdaMargin: 25
  },
  "소비재·화장품": {
    evSalesBand: [1.0, 1.6, 2.5],
    evEbitdaBand: [7, 9, 11],
    earlyPsCap: 2.0,
    psWarningHigh: 3.0,
    typicalEbitdaMargin: 15
  },
  "필수소비재": {
    evSalesBand: [0.5, 1.0, 1.8],
    evEbitdaBand: [7, 9, 11],
    earlyPsCap: 1.5,
    psWarningHigh: 2.0,
    typicalEbitdaMargin: 12
  },
  "리테일·유통": {
    evSalesBand: [0.3, 0.7, 1.2],
    evEbitdaBand: [5, 7, 9],
    earlyPsCap: 1.2,
    psWarningHigh: 1.5,
    typicalEbitdaMargin: 8
  },
  "운송·물류": {
    evSalesBand: [0.4, 0.8, 1.3],
    evEbitdaBand: [6, 8, 10],
    earlyPsCap: 1.0,
    psWarningHigh: 1.5,
    typicalEbitdaMargin: 10
  },
  "조선·중공업": {
    evSalesBand: [0.2, 0.4, 0.6],
    evEbitdaBand: [4, 5.5, 7],
    earlyPsCap: 0.5,
    psWarningHigh: 0.7,
    typicalEbitdaMargin: 5
  },
  "건설·자재": {
    evSalesBand: [0.3, 0.5, 0.8],
    evEbitdaBand: [4, 5.5, 7],
    earlyPsCap: 0.6,
    psWarningHigh: 1.0,
    typicalEbitdaMargin: 8
  },
  "서비스": {
    evSalesBand: [0.6, 1.2, 2.0],
    evEbitdaBand: [7, 9, 12],
    earlyPsCap: 2.0,
    psWarningHigh: 3.0,
    typicalEbitdaMargin: 15
  }
};

const nonFsOrder = [
  "IT·인터넷·플랫폼",
  "게임·엔터",
  "헬스케어·바이오",
  "반도체·딥테크",
  "로봇·자동화",
  "제조업·부품",
  "원자재",
  "에너지·유틸리티",
  "소비재·화장품",
  "필수소비재",
  "리테일·유통",
  "운송·물류",
  "조선·중공업",
  "건설·자재",
  "서비스"
];

// ----- Rulebook: FS industries -----
const fsRules = {
  "금융지주": { type: "PBR", band: [0.4, 0.7, 1.0] },
  "상업은행": { type: "PBR", band: [0.4, 0.7, 1.0] },
  "저축은행·조합": { type: "PBR", band: [0.3, 0.6, 0.9] },
  "생명보험": { type: "PBR", band: [0.4, 0.8, 1.2] },
  "손해보험": { type: "PBR", band: [0.5, 0.9, 1.3] },
  "증권·선물": { type: "PBR", band: [0.5, 1.0, 1.5] },
  "자산운용": { type: "PBR", band: [1.0, 1.5, 2.0] },
  "투자자문·일임": { type: "PER", band: [8, 12, 18] },
  "신기술금융·VC": { type: "PBR", band: [0.6, 1.0, 1.4] },
  "카드사": { type: "PBR", band: [0.6, 1.1, 1.6] },
  "리스·할부금융": { type: "PBR", band: [0.5, 1.0, 1.4] }
};

const fsOrder = [
  "금융지주",
  "상업은행",
  "저축은행·조합",
  "생명보험",
  "손해보험",
  "증권·선물",
  "자산운용",
  "투자자문·일임",
  "신기술금융·VC",
  "카드사",
  "리스·할부금융"
];

// ----- 공통 util -----
function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

function formatNumber(v) {
  if (isNaN(v) || !isFinite(v)) return "-";
  return v.toLocaleString("ko-KR", { maximumFractionDigits: 1 });
}

function cycleFactor(value) {
  if (value === "low") return 0.95;    // 침체: -5%
  if (value === "high") return 1.05;   // 호황: +5%
  return 1.0;                          // 정상
}

function cycleLabel(value) {
  if (value === "low") return "침체";
  if (value === "high") return "호황";
  return "정상";
}

function nonFsStageLabel(stage) {
  if (stage === "Early") return "초기(Early)";
  if (stage === "Mature") return "성숙(Mature)";
  return "성장(Growth)";
}

function fsStageLabel(stageCode) {
  if (stageCode === "Stage1") return "초기(Early)";
  if (stageCode === "Stage3") return "성숙(Mature)";
  return "성장(Growth)";
}

function getNonFsCycle() {
  const radios = document.querySelectorAll('input[name="cycleNonfs"]');
  for (const r of radios) {
    if (r.checked) return r.value;
  }
  return "normal";
}

function getFsCycle() {
  const radios = document.querySelectorAll('input[name="cycleFs"]');
  for (const r of radios) {
    if (r.checked) return r.value;
  }
  return "normal";
}

function getNonFsStage() {
  const radios = document.querySelectorAll('input[name="stageNonfs"]');
  for (const r of radios) {
    if (r.checked) return r.value;
  }
  return "Mature";
}

// ----- Risk Scoring (Non-FS) -----
function computeNonFsRisk(margin, typicalMargin, ndToEbitda, cycle) {
  const volScore = 1.5;

  let cycleScore;
  if (cycle === "low") cycleScore = 1.0;
  else if (cycle === "high") cycleScore = 2.5;
  else cycleScore = 1.5;

  let marginScore;
  if (margin == null || isNaN(margin)) {
    marginScore = 2.0;
  } else {
    const diff = margin - typicalMargin;
    if (diff >= 5) marginScore = 0.5;
    else if (diff >= 0) marginScore = 1.5;
    else if (diff >= -5) marginScore = 2.5;
    else marginScore = 3.5;
  }

  let levScore;
  if (!isFinite(ndToEbitda)) {
    levScore = 3.5;
  } else if (ndToEbitda < 1) {
    levScore = 0.5;
  } else if (ndToEbitda < 3) {
    levScore = 1.5;
  } else if (ndToEbitda < 4) {
    levScore = 2.5;
  } else {
    levScore = 3.5;
  }

  const risk = (volScore + cycleScore + marginScore + levScore) / 4;
  const riskClamped = clamp(risk, 0.5, 4.5);

  const factors = [
    { key: "margin", score: marginScore },
    { key: "leverage", score: levScore },
    { key: "cycle", score: cycleScore },
    { key: "vol", score: volScore }
  ];
  factors.sort((a, b) => b.score - a.score);
  const main = factors[0].key;

  return { riskScore: riskClamped, marginScore, levScore, cycleScore, volScore, mainFactor: main };
}

function riskLabelAndEmoji(riskScore) {
  if (riskScore < 1.0) return { emoji: "🟢", label: "Low" };
  if (riskScore < 2.5) return { emoji: "🟡", label: "Moderate" };
  if (riskScore < 4.0) return { emoji: "🟠", label: "Elevated" };
  return { emoji: "🔴", label: "High" };
}

function buildNonFsRiskText(riskInfo, margin, typicalMargin, ndToEbitda, cycle) {
  const { riskScore, mainFactor } = riskInfo;
  const { emoji, label } = riskLabelAndEmoji(riskScore);
  const scoreText = `${emoji} ${label} (${riskScore.toFixed(1)}점)`;

  let detail = "";
  if (mainFactor === "margin") {
    const diff = (margin != null && !isNaN(margin)) ? (margin - typicalMargin) : null;
    if (diff != null) {
      detail = `주요 리스크 요인: 수익성(EBITDA 마진, 업종 평균 대비 ${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%p).`;
    } else {
      detail = "주요 리스크 요인: 수익성(EBITDA 마진).";
    }
  } else if (mainFactor === "leverage") {
    if (isFinite(ndToEbitda)) {
      detail = `주요 리스크 요인: 레버리지(ND/EBITDA 약 ${ndToEbitda.toFixed(1)}배).`;
    } else {
      detail = "주요 리스크 요인: 레버리지(ND/EBITDA가 매우 높은 구간).";
    }
  } else if (mainFactor === "cycle") {
    detail = `주요 리스크 요인: 업종 사이클(${cycleLabel(cycle)} 국면).`;
  } else {
    detail = "주요 리스크 요인: 실적 변동성.";
  }

  let interpretation;
  if (riskScore < 1.0) {
    interpretation = "마진과 레버리지가 모두 방어적인 구간으로, 멀티플 상단 적용도 비교적 부담이 크지 않은 수준입니다.";
  } else if (riskScore < 2.5) {
    interpretation = "전형적인 업계 평균 리스크 수준으로, 밴드 중앙부 멀티플 적용이 합리적입니다.";
  } else if (riskScore < 4.0) {
    interpretation = "수익성 또는 레버리지 중 하나가 업종 평균 대비 열위하여, 멀티플 상단 적용 시 보수적 검토가 필요합니다.";
  } else {
    interpretation = "저마진·고레버리지 조합 등 구조적 리스크가 크므로, 밴드 하단 중심의 보수적 멀티플 적용이 요구됩니다.";
  }

  return {
    header: scoreText,
    detail,
    interpretation
  };
}

// ----- Risk Scoring (FS) -----
function computeFsRisk(roe, hasGovRisk, cycle) {
  let base;
  if (roe == null || isNaN(roe)) base = 2.5;
  else if (roe < 3) base = 3.5;
  else if (roe < 8) base = 2.5;
  else if (roe < 15) base = 1.8;
  else base = 1.5;

  let risk = base;
  if (hasGovRisk) risk += 0.5;
  if (cycle === "low") risk += 0.2;
  if (cycle === "high") risk += 0.2;

  risk = clamp(risk, 0.5, 4.5);

  let main;
  if (hasGovRisk) main = "governance";
  else if (roe != null && !isNaN(roe) && roe < 8) main = "roe";
  else if (cycle !== "normal") main = "cycle";
  else main = "normal";

  return { riskScore: risk, mainFactor: main };
}

function buildFsRiskText(riskInfo, roe, hasGovRisk, cycle) {
  const { riskScore, mainFactor } = riskInfo;
  const { emoji, label } = riskLabelAndEmoji(riskScore);
  const scoreText = `${emoji} ${label} (${riskScore.toFixed(1)}점)`;

  let detail;
  if (mainFactor === "governance") {
    detail = "주요 리스크 요인: 회계·내부통제/지배구조.";
  } else if (mainFactor === "roe") {
    detail = `주요 리스크 요인: 낮은 ROE(약 ${roe.toFixed(1)}%).`;
  } else if (mainFactor === "cycle") {
    detail = `주요 리스크 요인: 업종 사이클(${cycleLabel(cycle)} 국면).`;
  } else {
    detail = "주요 리스크 요인: 전형적인 업권 변동성.";
  }

  let interpretation;
  if (riskScore < 1.0) {
    interpretation = "자기자본 수익성과 재무건전성이 우수한 편으로, 업권 내 밸류에이션 디스카운트는 제한적입니다.";
  } else if (riskScore < 2.5) {
    interpretation = "전형적인 업권 평균 수준의 리스크입니다. PBR/PER 밴드의 중앙부 적용이 타당합니다.";
  } else if (riskScore < 4.0) {
    interpretation = "수익성 또는 거버넌스 측면에서 약점이 있어, 상단 멀티플 적용에는 주의가 필요합니다.";
  } else {
    interpretation = "구조적 리스크 또는 규제/손실 가능성이 높아, 보수적인 밴드 하단 멀티플 적용이 요구됩니다.";
  }

  return {
    header: scoreText,
    detail,
    interpretation
  };
}

// ----- 핵심: Non-FS Valuation -----
function runNonFsValuation() {
  const industry = document.getElementById("industrySelect").value;
  const rule = nonFsRules[industry];

  const sales = parseFloat(document.getElementById("salesInput").value) || 0;
  const ebitda = parseFloat(document.getElementById("ebitdaInput").value) || 0;
  const netDebt = parseFloat(document.getElementById("netDebtInput").value) || 0;

  const isPrivate = document.getElementById("nonfsChkPrivate").checked;
  const isHighGrowth = document.getElementById("chkGrowth").checked;
  const isTurnaround = document.getElementById("chkTurnaround").checked;
  const hasGovRisk = document.getElementById("chkGovRisk").checked;
  const cycle = getNonFsCycle();
  const stage = getNonFsStage();

  const margin = sales > 0 ? (ebitda / sales) * 100 : null;
  const ndToEbitda = (ebitda > 0) ? (netDebt / ebitda) : Infinity;
  const marginDiff = (margin != null && !isNaN(margin)) ? (margin - rule.typicalEbitdaMargin) : null;

  const usePsOnly = (rule.evEbitdaBand == null || ebitda <= 0 || stage === "Early");
  let metricType = usePsOnly ? "PS" : "EV/EBITDA";

  let baseMultiple, lowBand, highBand, bandArray;
  if (metricType === "PS") {
    const [low, mid, high] = rule.evSalesBand;
    lowBand = low;
    highBand = high;
    baseMultiple = (low + mid + high) / 3;
    bandArray = rule.evSalesBand;
  } else {
    const [low, mid, high] = rule.evEbitdaBand;
    lowBand = low;
    highBand = high;
    baseMultiple = (low + mid + high) / 3;
    bandArray = rule.evEbitdaBand;
  }

  let gScore = 0, pScore = 0, lScore = 0;

  if (isHighGrowth) gScore += 0.5;

  if (marginDiff != null) {
    if (marginDiff >= 5) pScore += 0.4;
    else if (marginDiff >= 0) pScore += 0.2;
    else if (marginDiff >= -5) pScore -= 0.2;
    else pScore -= 0.4;
  }

  if (isFinite(ndToEbitda)) {
    if (ndToEbitda < 1) lScore += 0.2;
    else if (ndToEbitda >= 3 && ndToEbitda < 4) lScore -= 0.2;
    else if (ndToEbitda >= 4) lScore -= 0.4;
  } else {
    lScore -= 0.4;
  }

  const factor = 1 + (gScore + pScore + lScore) / 10;
  let adjMultiple = baseMultiple * factor;

  adjMultiple *= cycleFactor(cycle);

  if (isTurnaround) {
    adjMultiple *= 0.9;
  }

  if (metricType === "PS" && stage === "Early" && rule.earlyPsCap != null) {
    adjMultiple = Math.min(adjMultiple, rule.earlyPsCap);
  }

  adjMultiple = clamp(adjMultiple, lowBand, highBand);

  let ev = 0;
  if (metricType === "PS") {
    ev = sales * adjMultiple;
  } else {
    ev = ebitda * adjMultiple;
  }
  const equityBeforeDiscount = ev - netDebt;

  const privateDiscountApplied = 0;
  const equityAfterDiscount = equityBeforeDiscount;

  const riskInfo = computeNonFsRisk(margin, rule.typicalEbitdaMargin, ndToEbitda, cycle);
  const riskText = buildNonFsRiskText(riskInfo, margin, rule.typicalEbitdaMargin, ndToEbitda, cycle);

  let multipleWarning = "";
  if (metricType === "PS" && rule.psWarningHigh && adjMultiple >= rule.psWarningHigh) {
    multipleWarning = `· PS ${adjMultiple.toFixed(1)}배는 해당 업종 역사적 밴드 상단 또는 테마 구간에 근접한 수준입니다.`;
  }

  return {
    industry,
    stage,
    stageLabel: nonFsStageLabel(stage),
    metricType,
    adjMultiple,
    ev,
    equityBeforeDiscount,
    equityAfterDiscount,
    privateDiscountApplied,
    sales,
    ebitda,
    netDebt,
    margin,
    marginDiff,
    ndToEbitda,
    cycle,
    rule,
    bandArray,
    gScore,
    pScore,
    lScore,
    isPrivate,
    isHighGrowth,
    isTurnaround,
    hasGovRisk,
    riskInfo,
    riskText,
    multipleWarning
  };
}

// ----- 핵심: FS Valuation -----
function runFsValuation() {
  const fsIndustry = document.getElementById("fsIndustrySelect").value;
  const rule = fsRules[fsIndustry];

  const years = parseFloat(document.getElementById("fsYearsInput").value) || 0;
  const equity = parseFloat(document.getElementById("equityInput").value) || 0;
  const netIncome = parseFloat(document.getElementById("netIncomeInput").value) || 0;
  const roe = parseFloat(document.getElementById("roeInput").value);

  const hasGovRisk = document.getElementById("fsChkGovRisk").checked;
  const cycle = getFsCycle();

  let stageCode;
  if (years < 5 || equity < 1000 || (roe != null && roe < 5)) {
    stageCode = "Stage1";   // Early
  } else if (years >= 7 && (roe != null && roe > 12)) {
    stageCode = "Stage3";   // Mature
  } else {
    stageCode = "Stage2";   // Growth
  }
  const stageLabel = fsStageLabel(stageCode);

  const [low, mid, high] = rule.band;
  let baseMultiple;
  if (roe == null || isNaN(roe)) {
    baseMultiple = mid;
  } else {
    if (roe < 5) baseMultiple = low;
    else if (roe <= 12) baseMultiple = mid;
    else baseMultiple = high;
  }

  let adjMultiple = baseMultiple;
  if (stageCode === "Stage1") {
    adjMultiple = Math.max(baseMultiple * 0.9, low);
  } else if (stageCode === "Stage3") {
    adjMultiple = Math.min(baseMultiple * 1.05, high);
  }

  if (hasGovRisk) {
    if (rule.type === "PBR") {
      adjMultiple = Math.max(adjMultiple - 0.1, low);
    } else {
      adjMultiple = Math.max(adjMultiple - 1, low);
    }
  }

  adjMultiple *= cycleFactor(cycle);
  adjMultiple = clamp(adjMultiple, low, high);

  let equityValue = 0;
  if (rule.type === "PBR") {
    equityValue = equity * adjMultiple;
  } else {
    equityValue = netIncome * adjMultiple;
  }

  const privateDiscountApplied = 0;
  const equityAfterDiscount = equityValue;

  const riskInfo = computeFsRisk(roe, hasGovRisk, cycle);
  const riskText = buildFsRiskText(riskInfo, roe, hasGovRisk, cycle);

  return {
    fsIndustry,
    stageCode,
    stageLabel,
    rule,
    adjMultiple,
    equityValue,
    equityAfterDiscount,
    privateDiscountApplied,
    equity,
    netIncome,
    roe,
    hasGovRisk,
    cycle,
    riskInfo,
    riskText,
    years
  };
}

// ----- 입력 요약 (인쇄용) 업데이트 -----
function updatePrintSummary(mode, nonFs, fs) {
  const sumCompany = document.getElementById("sumCompany");
  const sumMode = document.getElementById("sumMode");
  const sumIndustry = document.getElementById("sumIndustry");
  const sumSize = document.getElementById("sumSize");
  const sumProfit = document.getElementById("sumProfit");
  const sumLeverage = document.getElementById("sumLeverage");
  const sumStage = document.getElementById("sumStage");
  const sumPrivate = document.getElementById("sumPrivate");
  const sumCycle = document.getElementById("sumCycle");
  const sumFlags = document.getElementById("sumFlags");

  const company = (document.getElementById("companyName").value || "").trim();
  sumCompany.textContent = company || "-";

  if (mode === "nonfs") {
    const industry = nonFs.industry;
    const sales = nonFs.sales;
    const ebitda = nonFs.ebitda;
    const netDebt = nonFs.netDebt;
    const margin = nonFs.margin;
    const ndToEbitda = nonFs.ndToEbitda;
    const stageLabel = nonFs.stageLabel;
    const isHighGrowth = nonFs.isHighGrowth;
    const isTurnaround = nonFs.isTurnaround;
    const hasGovRisk = nonFs.hasGovRisk;
    const isPrivate = nonFs.isPrivate;
    const cycle = nonFs.cycle;

    sumMode.textContent = "비금융 (일반 기업)";
    sumIndustry.textContent = industry;
    sumSize.textContent = `매출 ${formatNumber(sales)}억`;
    if (ebitda || ebitda === 0) {
      const mText = (margin != null && !isNaN(margin)) ? ` (마진 약 ${margin.toFixed(1)}%)` : "";
      sumProfit.textContent = `EBITDA ${formatNumber(ebitda)}억${mText}`;
    } else {
      sumProfit.textContent = "-";
    }
    if (isFinite(ndToEbitda)) {
      sumLeverage.textContent = `순차입금 ${formatNumber(netDebt)}억, ND/EBITDA 약 ${ndToEbitda.toFixed(1)}배`;
    } else {
      sumLeverage.textContent = `순차입금 ${formatNumber(netDebt)}억`;
    }
    sumStage.textContent = stageLabel;
    sumPrivate.textContent = isPrivate
      ? "비상장 (EV에 비상장 레벨 내포, 별도 할인 미적용)"
      : "비상장 플래그 미선택 (별도 할인 미적용)";

    sumCycle.textContent = cycleLabel(cycle);

    let flags = [];
    if (isHighGrowth) flags.push("고성장");
    if (isTurnaround) flags.push("턴어라운드");
    if (hasGovRisk) flags.push("회계/통제 리스크");
    sumFlags.textContent = flags.length ? flags.join(", ") : "-";

  } else {
    const fsIndustry = fs.fsIndustry;
    const equity = fs.equity;
    const netIncome = fs.netIncome;
    const roe = fs.roe;
    const hasGovRisk = fs.hasGovRisk;
    const cycle = fs.cycle;
    const years = fs.years;
    const stageLabel = fs.stageLabel;

    sumMode.textContent = "금융 (은행/보험/금융사)";
    sumIndustry.textContent = fsIndustry;
    sumSize.textContent = `자기자본 ${formatNumber(equity)}억`;
    sumProfit.textContent = `당기순이익 ${formatNumber(netIncome)}억, ROE ${isNaN(roe) ? "-" : roe.toFixed(1) + "%"}`;
    sumLeverage.textContent = "-";
    sumStage.textContent = `${stageLabel} (업력 ${years}년)`;

    sumPrivate.textContent = "업권 멀티플에 비상장 레벨이 내포된 것으로 보고, 별도 비상장 할인은 적용하지 않았습니다.";
    sumCycle.textContent = cycleLabel(cycle);

    let flags = [];
    if (hasGovRisk) flags.push("회계/통제 리스크");
    sumFlags.textContent = flags.length ? flags.join(", ") : "-";
  }
}

// ----- UI wiring -----
const modeSelect = document.getElementById("modeSelect");
const nonfsInputsDiv = document.getElementById("nonfsInputs");
const fsInputsDiv = document.getElementById("fsInputs");
const resultContainer = document.getElementById("resultContainer");

const btnRun = document.getElementById("btnRun");
const btnReset = document.getElementById("btnReset");
const btnPdf = document.getElementById("btnPdf");

// 업종/업권 옵션 자동 생성
const industrySelect = document.getElementById("industrySelect");
nonFsOrder.forEach(key => {
  if (!nonFsRules[key]) return;
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = key;
  industrySelect.appendChild(opt);
});

const fsIndustrySelect = document.getElementById("fsIndustrySelect");
fsOrder.forEach(key => {
  if (!fsRules[key]) return;
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = key;
  fsIndustrySelect.appendChild(opt);
});

modeSelect.addEventListener("change", () => {
  const mode = modeSelect.value;
  if (mode === "nonfs") {
    nonfsInputsDiv.style.display = "";
    fsInputsDiv.style.display = "none";
  } else {
    nonfsInputsDiv.style.display = "none";
    fsInputsDiv.style.display = "";
  }
});

btnRun.addEventListener("click", () => {
  const mode = modeSelect.value;
  const companyName = (document.getElementById("companyName").value || "").trim();

  if (mode === "nonfs") {
    const res = runNonFsValuation();

    const metricTitle = (res.metricType === "PS") ? "EV/Sales (PS)" : "EV/EBITDA";
    const bandText = res.bandArray ? res.bandArray.join(" / ") : "-";

    let html = "";
    html += `<h2>Multiple Lab – 약식 멀티플 Valuation 결과${companyName ? " (" + companyName + ")" : ""}</h2>`;
    html += `<div class="highlight-line">업종: ${res.industry} · 단계: ${res.stageLabel} · 평가축: ${metricTitle}</div>`;

    html += `<h3>1. Executive Summary</h3>`;
    html += `<table>
      <tr><th>항목</th><th>값</th></tr>
      <tr><td>적용 멀티플</td><td>${metricTitle} ${res.adjMultiple.toFixed(2)}배 (업종 밴드 ${bandText}배)</td></tr>
      <tr><td>EV (기업가치)</td><td>${formatNumber(res.ev)} 억원</td></tr>
      <tr><td>Equity (추가 비상장 할인 전)</td><td><strong>${formatNumber(res.equityBeforeDiscount)} 억원</strong></td></tr>
    </table>`;

    html += `<h3>2. 입력/가정 요약</h3>`;
    const marginText = (res.margin != null && !isNaN(res.margin)) ? `${res.margin.toFixed(1)}%` : "-";
    const ndText = isFinite(res.ndToEbitda) ? `${res.ndToEbitda.toFixed(1)}배` : "-";
    html += `<table>
      <tr><th>항목</th><th>값</th></tr>
      <tr><td>매출</td><td>${formatNumber(res.sales)} 억원</td></tr>
      <tr><td>EBITDA / 마진</td><td>${formatNumber(res.ebitda)} 억원 (${marginText})</td></tr>
      <tr><td>순차입금 / ND/EBITDA</td><td>${formatNumber(res.netDebt)} 억원 (${ndText})</td></tr>
      <tr><td>업종 사이클</td><td>${cycleLabel(res.cycle)} (멀티플에 약 ±5% 수준 반영)</td></tr>
      <tr><td>업종 평균 EBITDA 마진</td><td>${res.rule.typicalEbitdaMargin.toFixed(1)}%</td></tr>
    </table>`;

    // G/P/L 멀티플 결정 근거
    html += `<h3>3. 멀티플 결정 근거 (G·P·L)</h3>`;
    html += `<p class="muted">· G(성장성), P(수익성), L(레버리지) 3개 축을 기반으로 업종 밴드(하단–중단–상단) 내에서 적정 멀티플 위치를 결정하고, 업종 사이클(침체·정상·호황)을 별도 계수로 반영하였습니다.</p><ul>`;

    // G
    if (res.isHighGrowth) {
      html += `<li><strong>G – 성장성:</strong> 고성장 플래그(3년 CAGR ≥ 15%)가 활성화되어, 업종 평균 대비 높은 성장성을 반영하는 상향 요인으로 작용하였습니다.</li>`;
    } else {
      html += `<li><strong>G – 성장성:</strong> 별도의 고성장 플래그는 없으며, 성장성 측면에서는 업종 평균 수준으로 보고 추가 프리미엄은 반영하지 않았습니다.</li>`;
    }

    // P
    if (res.marginDiff != null) {
      const diff = res.marginDiff;
      if (diff >= 5) {
        html += `<li><strong>P – 수익성:</strong> EBITDA 마진이 업종 평균 대비 약 +${diff.toFixed(1)}%p 상회하여, 멀티플 상향 요인으로 작용하였습니다.</li>`;
      } else if (diff >= 0) {
        html += `<li><strong>P – 수익성:</strong> EBITDA 마진이 업종 평균 대비 소폭(+${diff.toFixed(1)}%p) 상회하는 수준으로, 제한적인 상향 요인으로 반영하였습니다.</li>`;
      } else if (diff >= -5) {
        html += `<li><strong>P – 수익성:</strong> EBITDA 마진이 업종 평균 대비 약 ${diff.toFixed(1)}%p 낮으나, 경미한 차이로 판단하여 큰 디스카운트 요인은 아닙니다.</li>`;
      } else {
        html += `<li><strong>P – 수익성:</strong> EBITDA 마진이 업종 평균 대비 ${diff.toFixed(1)}%p 이상 열위하여, 멀티플 디스카운트 요인으로 작용하였습니다.</li>`;
      }
    } else {
      html += `<li><strong>P – 수익성:</strong> 유의미한 EBITDA 마진 정보가 없어, 업종 평균 수준으로 가정하고 수익성에 따른 추가 조정은 제한적으로 보았습니다.</li>`;
    }

    // L
    if (!isFinite(res.ndToEbitda)) {
      html += `<li><strong>L – 레버리지:</strong> EBITDA가 미미하거나 적자에 가까운 구조로 ND/EBITDA 지표가 유효하지 않아, 레버리지 리스크를 보수적으로 평가하였습니다.</li>`;
    } else if (res.ndToEbitda < 1) {
      html += `<li><strong>L – 레버리지:</strong> ND/EBITDA 약 ${res.ndToEbitda.toFixed(1)}배로, 매우 보수적인 저레버리지 구간으로 판단하였습니다.</li>`;
    } else if (res.ndToEbitda < 3) {
      html += `<li><strong>L – 레버리지:</strong> ND/EBITDA 약 ${res.ndToEbitda.toFixed(1)}배로, 업종 내 통상적인 수준으로 보았습니다.</li>`;
    } else if (res.ndToEbitda < 4) {
      html += `<li><strong>L – 레버리지:</strong> ND/EBITDA 약 ${res.ndToEbitda.toFixed(1)}배로, 다소 높은 레버리지 구간으로 인식하여 멀티플 하향 요인으로 반영하였습니다.</li>`;
    } else {
      html += `<li><strong>L – 레버리지:</strong> ND/EBITDA 약 ${res.ndToEbitda.toFixed(1)}배로, 높은 레버리지 구조로 판단되어 멀티플 디스카운트 요인으로 작용하였습니다.</li>`;
    }

    // Cycle
    const cf = cycleFactor(res.cycle);
    html += `<li><strong>업종 사이클:</strong> 현재 사이클을 ‘${cycleLabel(res.cycle)}’로 가정하여 사이클 계수 ${cf.toFixed(2)}를 적용, 멀티플에 약 ${((cf - 1) * 100).toFixed(1)}% 수준의 보정 효과를 반영하였습니다.</li>`;
    html += `</ul>`;

    html += `<p>위 요소를 합산한 결과, 업종 밴드(${bandText}배) 내에서 <strong>${metricTitle} ${res.adjMultiple.toFixed(2)}배</strong>가 합리적이라고 판단하였습니다.</p>`;
    if (res.multipleWarning) {
      html += `<p style="color:#b91c1c;">${res.multipleWarning}</p>`;
    }

    // 비상장 할인 설명
    html += `<h3>4. 비상장 할인</h3>`;
    html += `<p>본 약식 산정에서는 EV 및 멀티플 자체를 비상장 레벨에 맞춰 설계하고 있으며, 비상장 플래그 선택 여부와 무관하게 <strong>추가적인 일괄 비상장 할인</strong>(예: 일괄 20~30% 디스카운트)은 적용하지 않았습니다. 실제 거래 구조(지분 유동성, 경영권 여부, 소수지분 조건 등)에 따라서는 별도의 할인 또는 프리미엄을 케이스 바이 케이스로 검토하는 것이 바람직합니다.</p>`;

    // Risk
    html += `<h3>5. Risk Scoring</h3>`;
    html += `<p><strong>Risk Score: ${res.riskText.header}</strong><br />${res.riskText.detail}<br />${res.riskText.interpretation}</p>`;

    resultContainer.innerHTML = html;

    updatePrintSummary("nonfs", res, null);

  } else {
    const res = runFsValuation();
    const rule = res.rule;
    const metricTitle = (rule.type === "PBR") ? "PBR" : "PER";

    let html = "";
    html += `<h2>Multiple Lab – 약식 멀티플 Valuation 결과 (금융)${companyName ? " (" + companyName + ")" : ""}</h2>`;
    html += `<div class="highlight-line">업권: ${res.fsIndustry} · 단계: ${res.stageLabel} · 평가축: ${metricTitle}</div>`;

    html += `<h3>1. Executive Summary</h3>`;
    html += `<table>
      <tr><th>항목</th><th>값</th></tr>
      <tr><td>적용 멀티플</td><td>${metricTitle} ${res.adjMultiple.toFixed(2)}배 (업권 밴드 ${rule.band.join(" / ")}배)</td></tr>
      <tr><td>Equity Value</td><td><strong>${formatNumber(res.equityAfterDiscount)} 억원</strong></td></tr>
      <tr><td>비상장 할인</td><td>업권 멀티플에 비상장 레벨이 내포된 것으로 보고, 추가 비상장 할인은 적용하지 않았습니다.</td></tr>
    </table>`;

    html += `<h3>2. 입력/가정 요약</h3>`;
    html += `<table>
      <tr><th>항목</th><th>값</th></tr>
      <tr><td>자기자본</td><td>${formatNumber(res.equity)} 억원</td></tr>
      <tr><td>당기순이익 / ROE</td><td>${formatNumber(res.netIncome)} 억원 / ${isNaN(res.roe) ? "-" : res.roe.toFixed(1) + "%"}</td></tr>
      <tr><td>업력</td><td>${res.years} 년</td></tr>
      <tr><td>업종 사이클</td><td>${cycleLabel(res.cycle)} (멀티플에 약 ±5% 수준 반영)</td></tr>
    </table>`;

    html += `<h3>3. 멀티플 결정 근거</h3>`;
    html += `<p class="muted">· ROE 수준과 Stage(초기/성장/성숙)를 기준으로 업권 밴드 내에서 Low/Mid/High를 선택하고, 회계·내부통제/지배구조 리스크 플래그가 있는 경우 한 단계 보수적인 멀티플을 적용합니다. 업종 사이클(침체·정상·호황)에 따라 약 ±5% 범위에서 추가 조정하며, 금융업권의 경우 멀티플 자체가 비상장 레벨을 상당 부분 내포한다고 보고 일반적인 비상장 할인은 추가로 적용하지 않습니다.</p>`;

    html += `<h3>4. Risk Scoring</h3>`;
    html += `<p><strong>Risk Score: ${res.riskText.header}</strong><br />${res.riskText.detail}<br />${res.riskText.interpretation}</p>`;

    resultContainer.innerHTML = html;

    updatePrintSummary("fs", null, res);
  }
});

btnReset.addEventListener("click", () => {
  window.location.reload();
});

// PDF 저장 시 파일명 유도: document.title 동적 변경
btnPdf.addEventListener("click", () => {
  const prevTitle = document.title;

  const company = (document.getElementById("companyName").value || "").trim();
  const mode = document.getElementById("modeSelect").value;

  let suffix = "";
  if (company) {
    suffix = company;
  } else {
    suffix = (mode === "nonfs" ? "Non-FS Snapshot" : "FS Snapshot");
  }

  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  const dateStr = `${y}${m}${d}`;

  document.title = `Multiple Lab - ${suffix} - ${dateStr}`;

  window.print();

  document.title = prevTitle;
});
