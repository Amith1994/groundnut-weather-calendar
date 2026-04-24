const sampleData = {
  crop: "Groundnut",
  district: "Chitradurga",
  stage: "Flowering to pegging",
  prevAdvisory: {
    Agrometeorology: [
      "Provide light irrigation at 6-7 day interval.",
      "Maintain field drainage in case of rainfall.",
      "Use mulching to conserve moisture."
    ],
    Agronomy: [
      "Complete weeding and intercultivation.",
      "Apply gypsum during pegging if soil moisture is adequate.",
      "Avoid fertilizer application in dry soil."
    ],
    "Pest & Disease": [
      "Monitor leaf miner and sucking pests.",
      "Spray need-based pesticide only under calm weather.",
      "Watch for leaf spot under humid conditions."
    ],
    "Important Practices & Yield Enhancers": [
      "Apply compost or FYM where possible.",
      "Use biofertilizers for better nutrient uptake.",
      "Maintain field sanitation."
    ]
  },
  forecast: [
    {
      date: "2026-04-25",
      tempMaxC: 35,
      tempMinC: 22,
      rainfallMm: 2,
      humidityMorningPct: 78,
      humidityEveningPct: 42,
      windSpeedKmph: 14,
      windDirection: "SW",
      cloudCoverPct: 35
    },
    {
      date: "2026-04-26",
      tempMaxC: 36,
      tempMinC: 23,
      rainfallMm: 0,
      humidityMorningPct: 72,
      humidityEveningPct: 36,
      windSpeedKmph: 16,
      windDirection: "W",
      cloudCoverPct: 20
    },
    {
      date: "2026-04-27",
      tempMaxC: 34,
      tempMinC: 22,
      rainfallMm: 8,
      humidityMorningPct: 84,
      humidityEveningPct: 52,
      windSpeedKmph: 18,
      windDirection: "SW",
      cloudCoverPct: 60
    },
    {
      date: "2026-04-28",
      tempMaxC: 33,
      tempMinC: 21,
      rainfallMm: 12,
      humidityMorningPct: 88,
      humidityEveningPct: 60,
      windSpeedKmph: 20,
      windDirection: "SW",
      cloudCoverPct: 75
    },
    {
      date: "2026-04-29",
      tempMaxC: 34,
      tempMinC: 22,
      rainfallMm: 3,
      humidityMorningPct: 80,
      humidityEveningPct: 48,
      windSpeedKmph: 12,
      windDirection: "S",
      cloudCoverPct: 45
    }
  ]
};

const domains = [
  "Agrometeorology",
  "Agronomy",
  "Pest & Disease",
  "Important Practices & Yield Enhancers"
];

const els = {
  cropInput: document.querySelector("#cropInput"),
  districtInput: document.querySelector("#districtInput"),
  stageInput: document.querySelector("#stageInput"),
  prevAdvisoryInput: document.querySelector("#prevAdvisoryInput"),
  forecastTableBody: document.querySelector("#forecastTableBody"),
  advisoryTableBody: document.querySelector("#advisoryTableBody"),
  outputTitle: document.querySelector("#outputTitle"),
  generateBtn: document.querySelector("#generateBtn"),
  loadSampleBtn: document.querySelector("#loadSampleBtn")
};

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function createBulletList(items) {
  const list = document.createElement("ul");
  list.className = "cell-list";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  return list;
}

function renderForecastTable(days) {
  els.forecastTableBody.innerHTML = "";

  days.forEach((day) => {
    const row = document.createElement("tr");
    row.className = "forecast-row";
    row.innerHTML = `
      <td>${formatDate(day.date)}</td>
      <td><input data-key="tempMaxC" type="number" value="${day.tempMaxC}"></td>
      <td><input data-key="tempMinC" type="number" value="${day.tempMinC}"></td>
      <td><input data-key="rainfallMm" type="number" value="${day.rainfallMm}"></td>
      <td><input data-key="humidityMorningPct" type="number" value="${day.humidityMorningPct}"></td>
      <td><input data-key="humidityEveningPct" type="number" value="${day.humidityEveningPct}"></td>
      <td><input data-key="windSpeedKmph" type="number" value="${day.windSpeedKmph}"></td>
      <td><input data-key="windDirection" type="text" value="${day.windDirection}"></td>
      <td><input data-key="cloudCoverPct" type="number" value="${day.cloudCoverPct}"></td>
    `;
    row.dataset.date = day.date;
    els.forecastTableBody.appendChild(row);
  });
}

function collectForecast() {
  return Array.from(els.forecastTableBody.querySelectorAll(".forecast-row")).map((row) => {
    const payload = { date: row.dataset.date };
    row.querySelectorAll("input").forEach((input) => {
      payload[input.dataset.key] = input.type === "number" ? Number(input.value) : input.value.trim();
    });
    return payload;
  });
}

function normalizePreviousAdvisory(inputText) {
  const parsed = safeJsonParse(inputText);

  if (parsed && typeof parsed === "object") {
    return domains.map((domain) => ({
      domain,
      actions: Array.isArray(parsed[domain]) && parsed[domain].length
        ? parsed[domain]
        : ["No previous advisory provided."]
    }));
  }

  return domains.map((domain) => ({
    domain,
    actions: inputText
      ? ["Review the pasted previous advisory text manually.", inputText.slice(0, 180)]
      : ["No previous advisory provided."]
  }));
}

function analyzeForecast(days) {
  const totalRain = days.reduce((sum, day) => sum + day.rainfallMm, 0);
  const rainyDays = days.filter((day) => day.rainfallMm >= 5).length;
  const maxTemp = Math.max(...days.map((day) => day.tempMaxC));
  const avgWind = days.reduce((sum, day) => sum + day.windSpeedKmph, 0) / days.length;
  const highHumidityDays = days.filter((day) => day.humidityMorningPct >= 80 || day.humidityEveningPct >= 55).length;
  const cloudyDays = days.filter((day) => day.cloudCoverPct >= 60).length;

  return {
    totalRain,
    rainyDays,
    maxTemp,
    avgWind,
    highHumidityDays,
    cloudyDays,
    heatStressRisk: maxTemp >= 35,
    drainageNeed: totalRain >= 15 || rainyDays >= 2,
    sprayWindowPoor: days.some((day) => day.rainfallMm > 0 || day.windSpeedKmph >= 15),
    humidityRisk: highHumidityDays >= 2 || cloudyDays >= 2,
    moistureStress: totalRain < 5 && maxTemp >= 35
  };
}

function derivePestFocus(stage, signals) {
  const stageText = stage.toLowerCase();

  if (signals.humidityRisk) {
    return "Watch for tikka leaf spot or rust and inspect the lower canopy after humid or cloudy weather.";
  }

  if (stageText.includes("flower") || stageText.includes("pegg")) {
    return "Monitor leaf miner, thrips, and sucking pests at 4-5 field spots during warm dry intervals.";
  }

  return "Monitor stage-relevant pests regularly and take action only after field observation.";
}

function buildAdvisories(stage, signals) {
  const agromet = [];
  const agronomy = [];
  const pestDisease = [];
  const important = [];

  if (signals.moistureStress) {
    agromet.push("Give light irrigation during morning or evening to reduce crop stress.");
    agromet.push("Use mulch to conserve moisture and reduce soil temperature.");
  } else {
    agromet.push("Give irrigation only on need-based dry days and avoid excess watering before rain.");
  }

  if (signals.drainageNeed) {
    agromet.push("Keep drainage channels open to prevent water stagnation after rainfall.");
  } else {
    agromet.push("Maintain soil moisture evenly and avoid sudden dry-wet stress.");
  }

  agromet.push(
    signals.sprayWindowPoor
      ? "Avoid spraying during rainy or windy periods."
      : "Use calm weather windows for any necessary spray operations."
  );

  agronomy.push("Complete weeding and intercultivation before wet weather delays field work.");
  agronomy.push(
    stage.toLowerCase().includes("pegg")
      ? "Apply gypsum during pegging only when soil is moist and workable."
      : "Plan fertilizer or soil amendment application only when soil moisture is suitable."
  );
  agronomy.push("Avoid heavy field movement when soil is too wet to prevent compaction near the root zone.");

  pestDisease.push(derivePestFocus(stage, signals));
  pestDisease.push("Use IPM first: field scouting, sanitation, and need-based intervention only.");
  pestDisease.push("If spraying is required, use only generic pesticides or fungicides and avoid rainy or windy days.");

  important.push("Maintain field sanitation and remove heavily infested plant parts from the field.");
  important.push("Use compost, FYM, or biofertilizers in moist but non-waterlogged soil.");
  important.push(
    signals.drainageNeed
      ? "Balance mulch with good drainage so pegging and pod development are not affected."
      : "Use mulch and organic matter to improve moisture use efficiency."
  );

  return [
    { domain: domains[0], actions: agromet.slice(0, 3) },
    { domain: domains[1], actions: agronomy.slice(0, 3) },
    { domain: domains[2], actions: pestDisease.slice(0, 3) },
    { domain: domains[3], actions: important.slice(0, 3) }
  ];
}

function renderAdvisoryTable(oldStructured, newStructured) {
  els.advisoryTableBody.innerHTML = "";

  domains.forEach((domain) => {
    const oldEntry = oldStructured.find((item) => item.domain === domain);
    const newEntry = newStructured.find((item) => item.domain === domain);
    const row = document.createElement("tr");

    const domainCell = document.createElement("td");
    domainCell.textContent = domain;

    const oldCell = document.createElement("td");
    oldCell.appendChild(createBulletList(oldEntry.actions));

    const newCell = document.createElement("td");
    newCell.appendChild(createBulletList(newEntry.actions));

    row.append(domainCell, oldCell, newCell);
    els.advisoryTableBody.appendChild(row);
  });
}

function generateAdvisory() {
  const forecast = collectForecast();
  const stage = els.stageInput.value.trim() || "Flowering to pegging";
  const district = els.districtInput.value.trim() || "Chitradurga";
  const oldStructured = normalizePreviousAdvisory(els.prevAdvisoryInput.value.trim());
  const signals = analyzeForecast(forecast);
  const newStructured = buildAdvisories(stage, signals);

  els.outputTitle.textContent = `Advisory Table - Updated Forecast for ${district}`;
  renderAdvisoryTable(oldStructured, newStructured);
}

function loadSample() {
  els.cropInput.value = sampleData.crop;
  els.districtInput.value = sampleData.district;
  els.stageInput.value = sampleData.stage;
  els.prevAdvisoryInput.value = JSON.stringify(sampleData.prevAdvisory, null, 2);
  renderForecastTable(sampleData.forecast);
  generateAdvisory();
}

els.generateBtn.addEventListener("click", generateAdvisory);
els.loadSampleBtn.addEventListener("click", loadSample);

loadSample();
