const districts = [
  "Bagalkot",
  "Ballari",
  "Belagavi",
  "Bengaluru Rural",
  "Bengaluru Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikkaballapur",
  "Chikkamagaluru",
  "Chitradurga",
  "Dakshina Kannada",
  "Davanagere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru",
  "Raichur",
  "Ramanagara",
  "Shivamogga",
  "Tumakuru",
  "Udupi",
  "Uttara Kannada",
  "Vijayapura",
  "Vijayanagara",
  "Yadgir"
];

const stageTemplates = {
  groundnut: [
    "Land preparation",
    "Seed treatment",
    "Sowing",
    "Germination and establishment",
    "Vegetative growth",
    "Flowering",
    "Pegging",
    "Pod development",
    "Pod filling",
    "Maturity and harvest"
  ],
  cereals: [
    "Land preparation",
    "Seed treatment or nursery",
    "Sowing or transplanting",
    "Germination and establishment",
    "Vegetative growth",
    "Tillering",
    "Flowering",
    "Grain filling",
    "Maturity and harvest"
  ],
  pulses: [
    "Land preparation",
    "Seed treatment",
    "Sowing",
    "Germination and establishment",
    "Vegetative growth",
    "Flowering",
    "Pod formation",
    "Pod filling",
    "Maturity and harvest"
  ],
  oilseeds: [
    "Land preparation",
    "Seed treatment",
    "Sowing",
    "Germination and establishment",
    "Vegetative growth",
    "Flowering",
    "Capsule or seed development",
    "Maturity and harvest"
  ],
  cotton: [
    "Land preparation",
    "Seed treatment",
    "Sowing",
    "Germination and establishment",
    "Vegetative growth",
    "Square formation",
    "Flowering",
    "Boll development",
    "Boll opening and picking"
  ],
  sugarcane: [
    "Field preparation",
    "Sett treatment",
    "Planting",
    "Germination",
    "Tillering",
    "Grand growth",
    "Cane elongation",
    "Maturity and harvest"
  ],
  tobacco: [
    "Nursery raising",
    "Transplanting",
    "Establishment",
    "Vegetative growth",
    "Leaf expansion",
    "Topping and sucker management",
    "Leaf maturity",
    "Harvest and curing"
  ],
  mulberry: [
    "Field preparation",
    "Planting",
    "Establishment",
    "Vegetative growth",
    "Canopy build-up",
    "Leaf harvest readiness",
    "Harvest and pruning"
  ],
  fruits: [
    "Planting or field establishment",
    "Vegetative growth",
    "Flower initiation",
    "Flowering",
    "Fruit set",
    "Fruit development",
    "Fruit maturity and harvest"
  ],
  banana: [
    "Land preparation",
    "Planting",
    "Establishment",
    "Vegetative growth",
    "Bunch initiation",
    "Flowering",
    "Bunch development",
    "Harvest"
  ],
  grapes: [
    "Pruning and vineyard preparation",
    "Bud burst",
    "Shoot growth",
    "Flowering",
    "Berry set",
    "Berry development",
    "Ripening and harvest"
  ],
  vegetables: [
    "Nursery or seed treatment",
    "Sowing or transplanting",
    "Establishment",
    "Vegetative growth",
    "Flowering",
    "Fruit or pod set",
    "Development",
    "Harvest"
  ],
  onion: [
    "Nursery raising",
    "Transplanting",
    "Establishment",
    "Vegetative growth",
    "Bulb initiation",
    "Bulb development",
    "Maturity and harvest"
  ],
  spices: [
    "Land preparation",
    "Planting or sowing",
    "Establishment",
    "Vegetative growth",
    "Rhizome or spike development",
    "Maturity",
    "Harvest"
  ],
  plantation: [
    "Nursery or seedling preparation",
    "Planting and establishment",
    "Vegetative growth",
    "Flower initiation",
    "Nut or berry set",
    "Development",
    "Maturity and harvest"
  ],
  coffee: [
    "Nursery or planting",
    "Establishment",
    "Vegetative flush",
    "Flowering",
    "Fruit set",
    "Berry development",
    "Ripening and harvest"
  ]
};

const cropGroups = [
  {
    label: "Field Crops",
    items: [
      { name: "Groundnut", type: "groundnut" },
      { name: "Paddy", type: "cereals" },
      { name: "Maize", type: "cereals" },
      { name: "Ragi", type: "cereals" },
      { name: "Jowar", type: "cereals" },
      { name: "Bajra", type: "cereals" },
      { name: "Red gram", type: "pulses" },
      { name: "Bengal gram", type: "pulses" },
      { name: "Green gram", type: "pulses" },
      { name: "Black gram", type: "pulses" },
      { name: "Horse gram", type: "pulses" },
      { name: "Sunflower", type: "oilseeds" },
      { name: "Sesame", type: "oilseeds" },
      { name: "Soybean", type: "oilseeds" },
      { name: "Safflower", type: "oilseeds" },
      { name: "Castor", type: "oilseeds" },
      { name: "Cotton", type: "cotton" },
      { name: "Sugarcane", type: "sugarcane" },
      { name: "Tobacco", type: "tobacco" },
      { name: "Mulberry", type: "mulberry" }
    ]
  },
  {
    label: "Horticultural Crops",
    items: [
      { name: "Mango", type: "fruits" },
      { name: "Banana", type: "banana" },
      { name: "Grapes", type: "grapes" },
      { name: "Pomegranate", type: "fruits" },
      { name: "Sapota", type: "fruits" },
      { name: "Guava", type: "fruits" },
      { name: "Papaya", type: "fruits" },
      { name: "Citrus", type: "fruits" },
      { name: "Tomato", type: "vegetables" },
      { name: "Onion", type: "onion" },
      { name: "Chilli", type: "vegetables" },
      { name: "Brinjal", type: "vegetables" },
      { name: "Okra", type: "vegetables" },
      { name: "Beans", type: "vegetables" },
      { name: "Cabbage", type: "vegetables" },
      { name: "Cauliflower", type: "vegetables" },
      { name: "Cucumber", type: "vegetables" },
      { name: "Turmeric", type: "spices" },
      { name: "Ginger", type: "spices" }
    ]
  },
  {
    label: "Plantation and Spice Crops",
    items: [
      { name: "Coconut", type: "plantation" },
      { name: "Arecanut", type: "plantation" },
      { name: "Coffee", type: "coffee" },
      { name: "Tea", type: "plantation" },
      { name: "Cocoa", type: "plantation" },
      { name: "Black pepper", type: "plantation" },
      { name: "Cardamom", type: "plantation" },
      { name: "Cashew", type: "plantation" }
    ]
  }
];

const cropMap = new Map(
  cropGroups.flatMap((group) => group.items.map((item) => [item.name, item]))
);

const sampleForecast = {
  days: [
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
    },
    {
      date: "2026-04-30",
      tempMaxC: 35,
      tempMinC: 23,
      rainfallMm: 0,
      humidityMorningPct: 72,
      humidityEveningPct: 38,
      windSpeedKmph: 14,
      windDirection: "W",
      cloudCoverPct: 25
    },
    {
      date: "2026-05-01",
      tempMaxC: 36,
      tempMinC: 23,
      rainfallMm: 1,
      humidityMorningPct: 70,
      humidityEveningPct: 36,
      windSpeedKmph: 15,
      windDirection: "W",
      cloudCoverPct: 20
    }
  ]
};

const els = {
  cropSelect: document.querySelector("#cropSelect"),
  districtSelect: document.querySelector("#districtSelect"),
  stageSelect: document.querySelector("#stageSelect"),
  forecastJsonInput: document.querySelector("#forecastJsonInput"),
  loadSampleBtn: document.querySelector("#loadSampleBtn"),
  generateBtn: document.querySelector("#generateBtn"),
  weatherSummaryGrid: document.querySelector("#weatherSummaryGrid"),
  advisoryTableBody: document.querySelector("#advisoryTableBody"),
  outputTitle: document.querySelector("#outputTitle"),
  messageBox: document.querySelector("#messageBox")
};

function showMessage(text, type) {
  els.messageBox.textContent = text;
  els.messageBox.className = `message-box ${type}`;
  els.messageBox.hidden = false;
}

function clearMessage() {
  els.messageBox.hidden = true;
  els.messageBox.textContent = "";
  els.messageBox.className = "message-box";
}

function formatDate(dateText) {
  return new Date(dateText).toLocaleDateString("en-IN", {
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

function populateCropSelect() {
  els.cropSelect.innerHTML = "";

  cropGroups.forEach((group) => {
    const optgroup = document.createElement("optgroup");
    optgroup.label = group.label;

    group.items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.name;
      option.textContent = item.name;
      optgroup.appendChild(option);
    });

    els.cropSelect.appendChild(optgroup);
  });
}

function populateDistrictSelect() {
  els.districtSelect.innerHTML = "";

  districts.forEach((district) => {
    const option = document.createElement("option");
    option.value = district;
    option.textContent = district;
    els.districtSelect.appendChild(option);
  });
}

function getSelectedCropMeta() {
  return cropMap.get(els.cropSelect.value) || cropMap.get("Groundnut");
}

function populateStageSelect(preferredStage) {
  const cropMeta = getSelectedCropMeta();
  const stages = stageTemplates[cropMeta.type] || stageTemplates.cereals;

  els.stageSelect.innerHTML = "";

  stages.forEach((stage) => {
    const option = document.createElement("option");
    option.value = stage;
    option.textContent = stage;
    els.stageSelect.appendChild(option);
  });

  if (preferredStage && stages.includes(preferredStage)) {
    els.stageSelect.value = preferredStage;
  }
}

function loadSampleJson() {
  els.cropSelect.value = "Groundnut";
  els.districtSelect.value = "Chitradurga";
  populateStageSelect("Flowering");
  els.stageSelect.value = "Flowering";
  els.forecastJsonInput.value = JSON.stringify(sampleForecast, null, 2);
  clearMessage();
  generateAdvisory();
}

function parseForecastJson() {
  let parsed;

  try {
    parsed = JSON.parse(els.forecastJsonInput.value.trim());
  } catch {
    throw new Error("Invalid JSON. Please check the weather forecast format.");
  }

  const days = Array.isArray(parsed) ? parsed : parsed.days;

  if (!Array.isArray(days) || days.length < 5) {
    throw new Error("Please provide at least 5 forecast day entries in the JSON input.");
  }

  return days.slice(0, 5).map((day, index) => {
    const requiredKeys = [
      "date",
      "tempMaxC",
      "tempMinC",
      "rainfallMm",
      "humidityMorningPct",
      "humidityEveningPct",
      "windSpeedKmph",
      "windDirection",
      "cloudCoverPct"
    ];

    requiredKeys.forEach((key) => {
      if (day[key] === undefined || day[key] === null || day[key] === "") {
        throw new Error(`Missing \`${key}\` in forecast day ${index + 1}.`);
      }
    });

    return {
      date: day.date,
      tempMaxC: Number(day.tempMaxC),
      tempMinC: Number(day.tempMinC),
      rainfallMm: Number(day.rainfallMm),
      humidityMorningPct: Number(day.humidityMorningPct),
      humidityEveningPct: Number(day.humidityEveningPct),
      windSpeedKmph: Number(day.windSpeedKmph),
      windDirection: String(day.windDirection),
      cloudCoverPct: Number(day.cloudCoverPct)
    };
  });
}

function analyzeForecast(days) {
  const totalRain = days.reduce((sum, day) => sum + day.rainfallMm, 0);
  const rainyDays = days.filter((day) => day.rainfallMm >= 5).length;
  const maxTemp = Math.max(...days.map((day) => day.tempMaxC));
  const minTemp = Math.min(...days.map((day) => day.tempMinC));
  const avgWind = days.reduce((sum, day) => sum + day.windSpeedKmph, 0) / days.length;
  const humidDays = days.filter((day) => day.humidityMorningPct >= 80 || day.humidityEveningPct >= 55).length;
  const cloudyDays = days.filter((day) => day.cloudCoverPct >= 60).length;
  const windyDays = days.filter((day) => day.windSpeedKmph >= 15).length;

  return {
    dateFrom: days[0].date,
    dateTo: days[days.length - 1].date,
    totalRain,
    rainyDays,
    maxTemp,
    minTemp,
    avgWind: Number(avgWind.toFixed(1)),
    humidDays,
    cloudyDays,
    windyDays,
    heatStressRisk: maxTemp >= 35,
    drainageNeed: totalRain >= 15 || rainyDays >= 2,
    humidityRisk: humidDays >= 2 || cloudyDays >= 2,
    moistureStress: totalRain < 5 && maxTemp >= 35,
    sprayWindowPoor: rainyDays >= 1 || windyDays >= 2
  };
}

function getAgronomyAction(cropName, cropType, stage) {
  const normalizedStage = stage.toLowerCase();

  if (cropName === "Groundnut") {
    if (normalizedStage.includes("flower")) {
      return "Maintain even soil moisture and avoid root disturbance during flowering.";
    }
    if (normalizedStage.includes("pegg")) {
      return "Apply gypsum during pegging only when the soil is moist and workable.";
    }
    if (normalizedStage.includes("pod")) {
      return "Avoid heavy interculture during pod development and protect the pegging zone.";
    }
  }

  if (cropType === "cereals") {
    if (normalizedStage.includes("tiller")) {
      return "Complete weeding and split nutrient application during active tillering.";
    }
    if (normalizedStage.includes("flower") || normalizedStage.includes("grain")) {
      return "Avoid moisture stress at flowering and grain filling for better yield formation.";
    }
  }

  if (cropType === "pulses") {
    return "Keep the field weed-free and avoid excessive nitrogen during reproductive stages.";
  }

  if (cropType === "cotton") {
    return "Protect squares and bolls by keeping the field clean and avoiding moisture stress.";
  }

  if (cropType === "sugarcane") {
    return "Maintain earthing-up, trash mulching, and timely nutrient application in the active growth phase.";
  }

  if (cropType === "vegetables" || cropType === "onion") {
    return "Complete staking, weeding, and stage-wise nutrient application before prolonged wet weather.";
  }

  if (cropType === "banana" || cropType === "fruits" || cropType === "grapes") {
    return "Support plants or branches where needed and avoid nutrient application during waterlogged conditions.";
  }

  if (cropType === "plantation" || cropType === "coffee" || cropType === "spices") {
    return "Keep basins clean, maintain mulch, and schedule nutrients only when field conditions are workable.";
  }

  return "Complete stage-appropriate interculture and nutrient application only under suitable soil moisture.";
}

function getPestFocus(cropName, cropType, signals) {
  if (cropName === "Groundnut") {
    return signals.humidityRisk
      ? "Watch for tikka leaf spot or rust and inspect the lower canopy after humid or cloudy weather."
      : "Monitor leaf miner, thrips, and sucking pests at 4 to 5 field spots during warm dry intervals.";
  }

  if (cropType === "cereals") {
    return signals.humidityRisk
      ? "Watch for foliar disease build-up after cloudy or humid weather and inspect the inner canopy."
      : "Monitor stem borer, leaf folder, or similar chewing pests based on the selected cereal crop.";
  }

  if (cropType === "pulses") {
    return signals.humidityRisk
      ? "Watch for leaf spot, powdery growth, or pod disease under humid weather."
      : "Monitor pod borer and sucking pests regularly during flowering and pod formation.";
  }

  if (cropType === "cotton") {
    return signals.humidityRisk
      ? "Watch for boll rot or foliar disease under repeated humidity and poor aeration."
      : "Monitor sucking pests and bollworm damage through regular scouting.";
  }

  if (cropType === "vegetables" || cropType === "onion") {
    return signals.humidityRisk
      ? "Watch for blight, leaf spot, or fruit rot after humid and cloudy weather."
      : "Monitor sucking pests, fruit borer, and leaf-feeding damage regularly.";
  }

  if (cropType === "banana" || cropType === "fruits" || cropType === "grapes") {
    return signals.humidityRisk
      ? "Watch for fruit rot, anthracnose, mildew, or leaf spot depending on the crop."
      : "Monitor fruit borers, hoppers, mealybugs, or mites based on the crop stage.";
  }

  if (cropType === "plantation" || cropType === "coffee" || cropType === "spices") {
    return signals.humidityRisk
      ? "Watch for rot, leaf spot, or spike disease build-up in humid shaded conditions."
      : "Monitor borers, scale, or stage-specific sucking pests in the plantation block.";
  }

  return "Monitor the crop regularly for stage-specific pest and disease symptoms before any intervention.";
}

function buildAdvisories(cropName, cropType, stage, signals) {
  const agrometeorology = [];
  const agronomy = [];
  const pestDisease = [];
  const importantPractices = [];

  if (signals.moistureStress) {
    agrometeorology.push(`Provide light irrigation during morning or evening to reduce stress at ${stage.toLowerCase()}.`);
  } else {
    agrometeorology.push("Give irrigation only on need-based dry days and avoid excess watering before rainfall.");
  }

  if (signals.drainageNeed) {
    agrometeorology.push("Keep field channels and drainage lines open to prevent water stagnation.");
  } else {
    agrometeorology.push("Maintain even soil moisture and avoid sudden dry-wet fluctuations.");
  }

  agrometeorology.push(
    signals.sprayWindowPoor
      ? "Avoid spraying during rainy or windy periods."
      : "Use calm and dry weather windows for any needed spray operation."
  );

  agronomy.push(getAgronomyAction(cropName, cropType, stage));
  agronomy.push("Finish weeding and interculture before wet weather delays field operations.");
  agronomy.push("Avoid heavy field movement when soil is too wet to reduce root-zone compaction.");

  pestDisease.push(getPestFocus(cropName, cropType, signals));
  pestDisease.push("Follow IPM first: field scouting, sanitation, natural enemy conservation, and need-based intervention.");
  pestDisease.push("If control is required, use only generic pesticides or fungicides and do not spray on rainy or windy days.");

  importantPractices.push("Use compost, FYM, or biofertilizers only when soil is moist but not waterlogged.");
  importantPractices.push("Maintain field sanitation and remove heavily infested or diseased plant parts promptly.");
  importantPractices.push(
    signals.drainageNeed
      ? "Balance mulching with good drainage so root activity and reproductive growth are not affected."
      : "Use mulch and organic matter to improve moisture-use efficiency and reduce field stress."
  );

  return [
    { domain: "Agrometeorology", actions: agrometeorology.slice(0, 3) },
    { domain: "Agronomy", actions: agronomy.slice(0, 3) },
    { domain: "Pest & Disease", actions: pestDisease.slice(0, 3) },
    { domain: "Important Practices & Yield Enhancers", actions: importantPractices.slice(0, 3) }
  ];
}

function renderWeatherSummary(signals) {
  const cards = [
    {
      label: "Forecast window",
      value: `${formatDate(signals.dateFrom)} to ${formatDate(signals.dateTo)}`
    },
    {
      label: "Temperature",
      value: `${signals.minTemp} C to ${signals.maxTemp} C`
    },
    {
      label: "Rainfall",
      value: `${signals.totalRain} mm across ${signals.rainyDays} rainy day(s)`
    },
    {
      label: "Humidity and cloud",
      value: `${signals.humidDays} humid day(s), ${signals.cloudyDays} cloudy day(s)`
    },
    {
      label: "Wind and spray window",
      value: signals.sprayWindowPoor
        ? `Average wind ${signals.avgWind} km/h, avoid spray on risky days`
        : `Average wind ${signals.avgWind} km/h, better spray window possible`
    }
  ];

  els.weatherSummaryGrid.innerHTML = "";

  cards.forEach((card) => {
    const article = document.createElement("article");
    article.className = "summary-card";
    article.innerHTML = `<span>${card.label}</span><strong>${card.value}</strong>`;
    els.weatherSummaryGrid.appendChild(article);
  });
}

function renderAdvisoryTable(advisories) {
  els.advisoryTableBody.innerHTML = "";

  advisories.forEach((item) => {
    const row = document.createElement("tr");
    const domainCell = document.createElement("td");
    const advisoryCell = document.createElement("td");

    domainCell.textContent = item.domain;
    advisoryCell.appendChild(createBulletList(item.actions));

    row.append(domainCell, advisoryCell);
    els.advisoryTableBody.appendChild(row);
  });
}

function generateAdvisory() {
  clearMessage();

  try {
    const forecastDays = parseForecastJson();
    const cropMeta = getSelectedCropMeta();
    const cropName = els.cropSelect.value;
    const districtName = els.districtSelect.value;
    const stage = els.stageSelect.value;
    const signals = analyzeForecast(forecastDays);
    const advisories = buildAdvisories(cropName, cropMeta.type, stage, signals);

    renderWeatherSummary(signals);
    renderAdvisoryTable(advisories);
    els.outputTitle.textContent = `Advisory - ${districtName} - ${cropName} - ${stage}`;
    showMessage("Advisory generated successfully from the forecast JSON.", "success");
  } catch (error) {
    showMessage(error.message, "error");
  }
}

els.cropSelect.addEventListener("change", () => {
  populateStageSelect();
});

els.loadSampleBtn.addEventListener("click", loadSampleJson);
els.generateBtn.addEventListener("click", generateAdvisory);

populateCropSelect();
populateDistrictSelect();
els.cropSelect.value = "Groundnut";
els.districtSelect.value = "Chitradurga";
populateStageSelect("Flowering");
loadSampleJson();
