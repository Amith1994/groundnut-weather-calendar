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
  forecastGrid: document.querySelector("#forecastGrid"),
  advisoryTableBody: document.querySelector("#advisoryTableBody"),
  summaryText: document.querySelector("#summaryText"),
  scenarioList: document.querySelector("#scenarioList"),
  signalCards: document.querySelector("#signalCards"),
  generatedAtLabel: document.querySelector("#generatedAtLabel"),
  generateBtn: document.querySelector("#generateBtn"),
  loadSampleBtn: document.querySelector("#loadSampleBtn"),
  copyJsonBtn: document.querySelector("#copyJsonBtn"),
  forecastTemplate: document.querySelector("#forecastCardTemplate")
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
    month: "short"
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

function renderForecastEditors(days) {
  els.forecastGrid.innerHTML = "";
  days.forEach((day, index) => {
    const fragment = els.forecastTemplate.content.cloneNode(true);
    fragment.querySelector(".forecast-date").textContent = formatDate(day.date);
    fragment.querySelector(".forecast-day-index").textContent = `Day ${index + 1}`;

    fragment.querySelectorAll("input").forEach((input) => {
      const key = input.dataset.key;
      input.value = day[key];
    });

    els.forecastGrid.appendChild(fragment);
  });
}

function loadSample() {
  els.cropInput.value = sampleData.crop;
  els.districtInput.value = sampleData.district;
  els.stageInput.value = sampleData.stage;
  els.prevAdvisoryInput.value = JSON.stringify(sampleData.prevAdvisory, null, 2);
  renderForecastEditors(sampleData.forecast);
  generateAdvisory();
}

function collectForecast() {
  return Array.from(els.forecastGrid.querySelectorAll(".forecast-card")).map((card, index) => {
    const original = sampleData.forecast[index];
    const payload = { date: original.date };
    card.querySelectorAll("input").forEach((input) => {
      const key = input.dataset.key;
      payload[key] = input.type === "number" ? Number(input.value) : input.value.trim();
    });
    return payload;
  });
}

function normalizePreviousAdvisory(inputText) {
  const parsed = safeJsonParse(inputText);
  if (parsed && typeof parsed === "object") {
    return domains.map((domain) => ({
      domain,
      actions: Array.isArray(parsed[domain]) ? parsed[domain] : ["No previous advisory available."]
    }));
  }

  return domains.map((domain) => ({
    domain,
    actions: ["See pasted previous advisory text.", inputText.slice(0, 180) || "No previous advisory available."]
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
    avgWind: Number(avgWind.toFixed(1)),
    highHumidityDays,
    cloudyDays,
    heatStressRisk: maxTemp >= 35,
    sprayWindowPoor: days.filter((day) => day.rainfallMm > 0 || day.windSpeedKmph >= 15).length >= 2,
    drainageNeed: totalRain >= 15 || rainyDays >= 2,
    moistureStress: totalRain < 5 && maxTemp >= 35
  };
}

function derivePestScenarios(stage, signals) {
  const normalizedStage = stage.toLowerCase();
  const scenarios = [];

  if (normalizedStage.includes("flower") || normalizedStage.includes("pegg")) {
    scenarios.push({
      name: "Leaf miner and thrips",
      riskLevel: signals.heatStressRisk ? "moderate" : "low",
      triggerReasons: ["warm weather", "dry intervals", "tender foliage"],
      recommendation: "Scout at 4-5 field spots and conserve natural enemies before any need-based action."
    });
  }

  if (signals.highHumidityDays >= 2 || signals.cloudyDays >= 2) {
    scenarios.push({
      name: "Tikka leaf spot / rust",
      riskLevel: "moderate",
      triggerReasons: ["humid mornings", "cloudy spell", "intermittent rainfall"],
      recommendation: "Inspect lower canopy, improve aeration, and use only generic fungicide options if a safe spray window appears."
    });
  }

  if (signals.drainageNeed) {
    scenarios.push({
      name: "Stem rot / collar rot risk pockets",
      riskLevel: "low",
      triggerReasons: ["wet soil patches", "temporary water stagnation"],
      recommendation: "Prevent standing water and avoid injuring plants during field operations after rainfall."
    });
  }

  return scenarios;
}

function buildAdvisories(stage, signals, scenarios) {
  const agromet = [];
  const agronomy = [];
  const pestDisease = [];
  const important = [];

  if (signals.moistureStress) {
    agromet.push("Give light irrigation during morning or evening to reduce flowering stress.");
    agromet.push("Use organic mulch to reduce evaporation and moderate soil temperature.");
  } else {
    agromet.push("Give only need-based irrigation on dry days and avoid excess moisture ahead of rain.");
  }

  if (signals.drainageNeed) {
    agromet.push("Keep field channels open for quick drainage as rainfall is expected over multiple days.");
  }

  if (signals.avgWind >= 15) {
    agromet.push("Avoid spraying and delicate field operations during windy periods.");
  }

  agronomy.push("Complete weeding and intercultivation before the wetter spell to avoid root disturbance later.");
  if (stage.toLowerCase().includes("pegg")) {
    agronomy.push("Apply gypsum during pegging only when soil is moist and workable, not during active rain.");
  } else {
    agronomy.push("Time fertilizer or soil amendments only when the soil is neither too dry nor waterlogged.");
  }
  agronomy.push("Postpone top-dressing if heavy wetness develops to reduce nutrient loss and compaction.");

  pestDisease.push("Scout for stage-relevant pests and disease in 4-5 field spots; act only on observed need.");
  if (scenarios.some((item) => item.name.includes("Tikka"))) {
    pestDisease.push("Watch for tikka leaf spot or rust as humidity and cloudiness rise after rainfall.");
  } else {
    pestDisease.push("Monitor leaf miner, thrips, and sucking pests during warm dry intervals.");
  }
  pestDisease.push("Use only generic pesticides or fungicides when required, and avoid spraying on rainy or windy days.");

  important.push("Maintain field sanitation and remove heavily infested debris to lower pest and disease carryover.");
  important.push("Use compost, FYM, or biofertilizers in moist but non-waterlogged soil for better efficiency.");
  if (signals.moistureStress) {
    important.push("Strengthen moisture conservation with mulch instead of repeated shallow irrigation.");
  } else {
    important.push("Balance moisture with mulch and drainage so pegging and pod set are not stressed.");
  }

  return [
    { domain: domains[0], actions: agromet.slice(0, 3) },
    { domain: domains[1], actions: agronomy.slice(0, 3) },
    { domain: domains[2], actions: pestDisease.slice(0, 3) },
    { domain: domains[3], actions: important.slice(0, 3) }
  ];
}

function summarizeImpact(stage, signals) {
  const parts = [];
  if (signals.heatStressRisk) parts.push("warm to hot afternoons");
  if (signals.drainageNeed) parts.push("intermittent rainfall requiring drainage readiness");
  if (signals.highHumidityDays >= 2) parts.push("humid conditions that can raise foliar disease watch");
  if (signals.avgWind >= 15) parts.push("moderate wind that narrows spray windows");

  const narrative = parts.length
    ? parts.join(", ")
    : "generally steady weather with limited stress signals";

  return `For ${stage.toLowerCase()}, the next 5 days suggest ${narrative}, so advisories shift toward timely field operations, careful irrigation, and weather-safe pest management.`;
}

function renderSignals(signals) {
  const cards = [
    { label: "5-day rain", value: `${signals.totalRain} mm` },
    { label: "Rainy days", value: `${signals.rainyDays}` },
    { label: "Peak max temp", value: `${signals.maxTemp} °C` },
    { label: "Avg wind", value: `${signals.avgWind} km/h` }
  ];

  els.signalCards.innerHTML = "";
  cards.forEach((card) => {
    const article = document.createElement("article");
    article.className = "signal-card";
    article.innerHTML = `<span>${card.label}</span><strong>${card.value}</strong>`;
    els.signalCards.appendChild(article);
  });
}

function renderTable(oldStructured, newStructured) {
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

function renderScenarios(scenarios) {
  els.scenarioList.innerHTML = "";
  scenarios.forEach((scenario) => {
    const article = document.createElement("article");
    article.className = "scenario-item";
    article.innerHTML = `
      <h4>${scenario.name}<span class="risk-pill">${scenario.riskLevel.toUpperCase()}</span></h4>
      <p><strong>Triggers:</strong> ${scenario.triggerReasons.join(", ")}</p>
      <p>${scenario.recommendation}</p>
    `;
    els.scenarioList.appendChild(article);
  });
}

function generateAdvisory() {
  const crop = els.cropInput.value.trim() || "Groundnut";
  const district = els.districtInput.value.trim() || "Chitradurga";
  const stage = els.stageInput.value.trim() || "Flowering to pegging";
  const forecast = collectForecast();
  const oldStructured = normalizePreviousAdvisory(els.prevAdvisoryInput.value.trim());
  const signals = analyzeForecast(forecast);
  const scenarios = derivePestScenarios(stage, signals);
  const newStructured = buildAdvisories(stage, signals, scenarios);

  renderSignals(signals);
  els.summaryText.textContent = summarizeImpact(stage, signals);
  renderTable(oldStructured, newStructured);
  renderScenarios(scenarios);
  els.generatedAtLabel.textContent = `Generated for ${crop} in ${district}`;

  window.latestAdvisoryOutput = {
    crop,
    district,
    stage,
    generatedAt: new Date().toISOString(),
    forecast,
    signals,
    pestScenarios: scenarios,
    oldAdvisory: oldStructured,
    newAdvisory: newStructured
  };
}

function copyJson() {
  const payload = window.latestAdvisoryOutput || {};
  navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
    .then(() => {
      els.copyJsonBtn.textContent = "Copied";
      window.setTimeout(() => {
        els.copyJsonBtn.textContent = "Copy JSON";
      }, 1200);
    });
}

els.loadSampleBtn.addEventListener("click", loadSample);
els.generateBtn.addEventListener("click", generateAdvisory);
els.copyJsonBtn.addEventListener("click", copyJson);

loadSample();
