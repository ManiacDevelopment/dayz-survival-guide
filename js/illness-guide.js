const illnesses = [
  {
    name: "Cholera",
    symptoms: ["Vomiting", "Fever", "Rapid water loss", "Sickness icon"],
    causes: ["Drank dirty water", "Drank from unknown bottle", "Used contaminated container"],
    cure: ["Tetracycline pills", "Multivitamins if available", "Tiny sips of water", "Tiny bites of food"],
    warning: "Do not eat or drink large amounts. You may vomit and lose more water."
  },
  {
    name: "Salmonella / Food Poisoning",
    symptoms: ["Vomiting", "Stomach sickness", "Sickness icon"],
    causes: ["Ate raw meat", "Ate rotten food", "Ate with bloody hands", "Drank with bloody hands"],
    cure: ["Charcoal tablets", "Multivitamins if available", "Eat and drink slowly"],
    warning: "Clean your hands or wear gloves before eating after cutting animals."
  },
  {
    name: "Common Cold / Influenza",
    symptoms: ["Sneezing", "Coughing", "Fever", "Sickness icon"],
    causes: ["Got cold", "Got wet", "Low food/water stats", "Close contact with sick player"],
    cure: ["Stay warm", "Dry or replace wet clothes", "Tetracycline pills", "Multivitamins", "Eat and drink safely"],
    warning: "Warmth and strong stats are part of the cure."
  },
  {
    name: "Wound Infection",
    symptoms: ["Fever", "Pain sounds", "Blurred vision", "Health loss", "Water loss", "Sickness icon"],
    causes: ["Used dirty rag", "Used non-disinfected bandage", "Let bleeding heal untreated"],
    cure: ["Early stage: disinfect wound", "Later stage: tetracycline pills", "Use clean bandages going forward"],
    warning: "This can become lethal if ignored."
  },
  {
    name: "Chemical / Gas Poisoning",
    symptoms: ["Vomiting", "Coughing", "Blood loss", "Health loss", "Sickness icon"],
    causes: ["Entered toxic gas zone", "Chemical exposure", "Consumed unsafe chemical liquid"],
    cure: ["Leave contaminated area", "Use clean food and water", "Charcoal tablets where relevant", "Stabilize blood and health"],
    warning: "Gas exposure can kill quickly. Escape first, treat second."
  },
  {
    name: "Kuru / Brain Prion Disease",
    symptoms: ["Laughing", "Shaking hands", "Strange sounds"],
    causes: ["Ate human meat", "Ate human fat"],
    cure: ["No practical cure", "Avoid cannibalism"],
    warning: "This is effectively permanent. Prevention is the real cure."
  }
];

const allSymptoms = [...new Set(illnesses.flatMap(item => item.symptoms))].sort();
const allCauses = [...new Set(illnesses.flatMap(item => item.causes))].sort();

let selectedSymptoms = [];
let selectedCauses = [];

const symptomMount = document.getElementById("symptomChoices");
const causeMount = document.getElementById("causeChoices");
const resultMount = document.getElementById("illnessResult");

function toggleValue(list, value) {
  return list.includes(value)
    ? list.filter(item => item !== value)
    : [...list, value];
}

function getFilteredIllnesses() {
  if (selectedSymptoms.length === 0 && selectedCauses.length === 0) {
    return [];
  }

  return illnesses
    .map(illness => {
      const symptomMatches = selectedSymptoms.filter(symptom => illness.symptoms.includes(symptom)).length;
      const causeMatches = selectedCauses.filter(cause => illness.causes.includes(cause)).length;
      const totalMatches = symptomMatches + causeMatches;

      return {
        ...illness,
        symptomMatches,
        causeMatches,
        totalMatches
      };
    })
    .filter(illness => illness.totalMatches > 0)
    .sort((a, b) => b.totalMatches - a.totalMatches);
}

function getAvailableCauses() {
  if (selectedSymptoms.length === 0) {
    return allCauses;
  }

  const matchingIllnesses = illnesses.filter(illness =>
    selectedSymptoms.some(symptom => illness.symptoms.includes(symptom))
  );

  return [...new Set(matchingIllnesses.flatMap(item => item.causes))].sort();
}

function renderSymptoms() {
  symptomMount.innerHTML = allSymptoms.map(symptom => `
    <button
      class="choice-btn ${selectedSymptoms.includes(symptom) ? "active" : ""}"
      type="button"
      data-symptom="${symptom}">
      ${symptom}
    </button>
  `).join("");

  symptomMount.querySelectorAll("[data-symptom]").forEach(button => {
    button.addEventListener("click", () => {
      selectedSymptoms = toggleValue(selectedSymptoms, button.dataset.symptom);

      const availableCauses = getAvailableCauses();
      selectedCauses = selectedCauses.filter(cause => availableCauses.includes(cause));

      renderAll();
    });
  });
}

function renderCauses() {
  const availableCauses = getAvailableCauses();

  if (availableCauses.length === 0) {
    causeMount.innerHTML = `<p class="empty-state">Select symptoms first.</p>`;
    return;
  }

  causeMount.innerHTML = availableCauses.map(cause => `
    <button
      class="choice-btn ${selectedCauses.includes(cause) ? "active" : ""}"
      type="button"
      data-cause="${cause}">
      ${cause}
    </button>
  `).join("");

  causeMount.querySelectorAll("[data-cause]").forEach(button => {
    button.addEventListener("click", () => {
      selectedCauses = toggleValue(selectedCauses, button.dataset.cause);
      renderAll();
    });
  });
}

function renderResults() {
  const matches = getFilteredIllnesses();

  if (matches.length === 0) {
    resultMount.innerHTML = `<p class="empty-state">Select symptoms to begin.</p>`;
    return;
  }

  resultMount.innerHTML = `
    <div class="result-grid">
      ${matches.map(match => `
        <div class="result-card">
          <span class="match-score">
            Match: ${match.totalMatches} point${match.totalMatches === 1 ? "" : "s"}
          </span>

          <h3>${match.name}</h3>

          <p><strong>Likely causes:</strong> ${match.causes.join(", ")}</p>
          <p><strong>Symptoms:</strong> ${match.symptoms.join(", ")}</p>

          <h4>Cure</h4>
          <ul>
            ${match.cure.map(step => `<li>${step}</li>`).join("")}
          </ul>

          <h4>Important</h4>
          <p>${match.warning}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function renderAll() {
  renderSymptoms();
  renderCauses();
  renderResults();
}

renderAll();
