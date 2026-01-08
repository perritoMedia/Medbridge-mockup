const referralInput = document.getElementById("referralInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const loadSampleBtn = document.getElementById("loadSampleBtn");
const confidenceScore = document.getElementById("confidenceScore");
const destinationPathway = document.getElementById("destinationPathway");
const aiRationale = document.getElementById("aiRationale");
const topRecommendation = document.getElementById("topRecommendation");
const recommendationList = document.getElementById("recommendationList");
const entityTags = document.getElementById("entityTags");
const signalList = document.getElementById("signalList");

const samples = [
  {
    text:
      "Patient: Daniel Singh, 29\nReason for referral: Chest tightness on exertion with occasional palpitations.\nHistory: Asthma as a child, no current inhaler. Family history of cardiac disease.\nCurrent treatment: None.\nRequest: Cardiology assessment for possible arrhythmia.",
    score: "91%",
    pathway: "Cardiology Rapid Access Clinic",
    rationale:
      "Referral highlights exertional chest symptoms with family history, triggering cardiology pathway rule set.",
    entityTags: ["Chest tightness", "Palpitations", "Family history", "Exertional symptoms"],
    signals: [
      { label: "Urgency", value: "Urgent review" },
      { label: "Red flags", value: "Cardiac risk" },
      { label: "Model confidence", value: "0.91" },
    ],
    primary: {
      title: "Cardiology Rapid Access Clinic",
      detail: "Matches chest symptoms + palpitations + family history red flags.",
      badge: "Urgent match",
    },
    list: [
      {
        title: "Respiratory (Asthma Review)",
        detail: "Rule out reactive airway component.",
        score: "74%",
      },
      {
        title: "ECG + Holter Monitoring",
        detail: "Diagnostics before consult.",
        score: "69%",
      },
      {
        title: "Community Lifestyle Support",
        detail: "Smoking/exercise counselling if needed.",
        score: "55%",
      },
    ],
  },
  {
    text:
      "Patient: Aisha Noor, 63\nReason for referral: Episodes of memory loss, disorientation, and reduced daily functioning.\nHistory: Hypertension, type 2 diabetes.\nCurrent treatment: Metformin, amlodipine.\nRequest: Cognitive assessment and support.",
    score: "86%",
    pathway: "Memory Clinic & Cognitive Assessment",
    rationale:
      "Symptoms indicate progressive cognitive decline; aligns with memory clinic pathway for assessment.",
    entityTags: ["Memory loss", "Disorientation", "Type 2 diabetes", "Hypertension"],
    signals: [
      { label: "Urgency", value: "Routine" },
      { label: "Red flags", value: "None detected" },
      { label: "Model confidence", value: "0.86" },
    ],
    primary: {
      title: "Memory Clinic & Cognitive Assessment",
      detail: "Matches cognitive decline + age risk factors.",
      badge: "High match",
    },
    list: [
      {
        title: "Geriatric Medicine",
        detail: "Holistic review of comorbidities.",
        score: "73%",
      },
      {
        title: "Community Support Services",
        detail: "Daily living assistance + carers assessment.",
        score: "68%",
      },
      {
        title: "Mental Health Liaison",
        detail: "Screen for depression or anxiety overlap.",
        score: "60%",
      },
    ],
  },
];

let sampleIndex = 0;

function renderRecommendation(sample) {
  confidenceScore.textContent = sample.score;
  destinationPathway.textContent = sample.pathway;
  aiRationale.textContent = sample.rationale;

  topRecommendation.innerHTML = `
    <div>
      <p class="label">Primary suggestion</p>
      <h3>${sample.primary.title}</h3>
      <p class="muted">${sample.primary.detail}</p>
    </div>
    <span class="badge">${sample.primary.badge}</span>
  `;

  entityTags.innerHTML = sample.entityTags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");

  signalList.innerHTML = sample.signals
    .map(
      (signal) => `
        <li><span>${signal.label}</span><strong>${signal.value}</strong></li>
      `
    )
    .join("");

  recommendationList.innerHTML = sample.list
    .map(
      (item) => `
        <div class="list-item">
          <div>
            <h4>${item.title}</h4>
            <p class="muted">${item.detail}</p>
          </div>
          <span>${item.score}</span>
        </div>
      `
    )
    .join("");
}

function analyzeReferral() {
  const text = referralInput.value.toLowerCase();
  let selectedSample = samples[0];

  if (text.includes("memory") || text.includes("cognitive")) {
    selectedSample = samples[1];
  } else if (text.includes("chest") || text.includes("palp")) {
    selectedSample = samples[0];
  }

  renderRecommendation(selectedSample);
}

analyzeBtn.addEventListener("click", analyzeReferral);
loadSampleBtn.addEventListener("click", () => {
  sampleIndex = (sampleIndex + 1) % samples.length;
  referralInput.value = samples[sampleIndex].text;
  renderRecommendation(samples[sampleIndex]);
});
