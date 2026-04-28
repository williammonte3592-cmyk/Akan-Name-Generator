const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AKAN_NAMES = {
  Sunday: {
    male: "Kwasi",
    female: "Akosua",
    meaning:
      "Children born on Sunday are believed to be destined for leadership and spiritual strength.",
  },
  Monday: {
    male: "Kwadwo",
    female: "Adwoa",
    meaning:
      "Monday-born souls are known for their peacefulness, gentleness, and calm disposition.",
  },
  Tuesday: {
    male: "Kwabena",
    female: "Abenaa",
    meaning:
      "Those born on Tuesday carry the energy of the ocean — restless, deep, and powerful.",
  },
  Wednesday: {
    male: "Kwaku",
    female: "Akua",
    meaning:
      "Wednesday children are thought to be unpredictable, spirited, and fiercely independent.",
  },
  Thursday: {
    male: "Yaw",
    female: "Yaa",
    meaning:
      "Born under Thursday's sky, these individuals are associated with the sky deity — adventurous and ambitious.",
  },
  Friday: {
    male: "Kofi",
    female: "Afua",
    meaning:
      "Friday is ruled by the Akan love of venturing forth — these souls are explorers and wanderers at heart.",
  },
  Saturday: {
    male: "Kwame",
    female: "Ama",
    meaning:
      "Saturday-born individuals are seen as dependable, grounded, and naturally authoritative.",
  },
};
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const generateBtn = document.getElementById("generate-btn");
const resetBtn = document.getElementById("reset-btn");
const errorMsg = document.getElementById("error-msg");
const resultCard = document.getElementById("result-card");
const resultDayEl = document.getElementById("result-day");
const resultNameEl = document.getElementById("result-name");
const resultMeaningEl = document.getElementById("result-meaning");
const genderButtons = document.querySelectorAll(".gender-btn");
const tableRows = document.querySelectorAll(".akan-table tbody tr");

let selectedGender = null;
function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
function validateInputs(day, month, year, gender) {
  if (!day || !month || !year) {
    return {
      valid: false,
      message: "Please fill in all date fields (day, month, and year).",
    };
  }

  if (month < 1 || month > 12) {
    return { valid: false, message: "Month must be between 1 and 12." };
  }

  const maxDay = daysInMonth(month, year);
  if (day < 1 || day > maxDay) {
    return {
      valid: false,
      message: `Day must be between 1 and ${maxDay} for the selected month.`,
    };
  }

  if (year < 1900 || year > 2026) {
    return {
      valid: false,
      message: "Please enter a year between 1900 and 2026.",
    };
  }

  if (!gender) {
    return {
      valid: false,
      message: "Please select a gender to receive your Akan name.",
    };
  }

  return { valid: true, message: "" };
}
function calculateDayOfWeek(day, month, year) {
  const CC = Math.floor(year / 100);
  const YY = year % 100;

  const d =
    (Math.floor((4 * CC - 2) / 4) +
      Math.floor((5 * YY) / 4) +
      Math.floor((26 * (month + 1)) / 10) +
      day) %
    7;

  return ((d % 7) + 7) % 7;
}

function getAkanName(dayName, gender) {
  const entry = AKAN_NAMES[dayName];
  return {
    name: gender === "male" ? entry.male : entry.female,
    meaning: entry.meaning,
  };
}
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.add("visible");
}

function clearError() {
  errorMsg.textContent = "";
  errorMsg.classList.remove("visible");
  [dayInput, monthInput, yearInput].forEach((el) =>
    el.classList.remove("error"),
  );
}

function displayResult(dayName, akanName, meaning) {
  resultDayEl.textContent = `Born on a ${dayName}`;
  resultNameEl.textContent = akanName;
  resultMeaningEl.textContent = meaning;

  resultCard.classList.add("visible");
}

genderButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    genderButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedGender = btn.dataset.gender;
    clearError();
  });
});

generateBtn.addEventListener("click", () => {
  clearError();

  const day = parseInt(dayInput.value, 10);
  const month = parseInt(monthInput.value, 10);
  const year = parseInt(yearInput.value, 10);

  const { valid, message } = validateInputs(day, month, year, selectedGender);
  if (!valid) {
    showError(message);
    return;
  }

  const dayIndex = calculateDayOfWeek(day, month, year);
  const dayName = DAYS_OF_WEEK[dayIndex];
  const { name, meaning } = getAkanName(dayName, selectedGender);

  displayResult(dayName, name, meaning);
  highlightTableRow(dayName);
});
