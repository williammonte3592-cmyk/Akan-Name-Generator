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

  if (year < 1900 || year > 2100) {
    return {
      valid: false,
      message: "Please enter a year between 1900 and 2100.",
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
  if (month <= 2) {
    month += 12;
    year -= 1;
  }

  const CC = Math.floor(year / 100); 
  const YY = year % 100;

  const d =
    (Math.floor((4 * CC - 2) / 4) + 
      Math.floor((5 * YY) / 4) + 
      Math.floor((26 * (month + 1)) / 10) + 
      day) % 7; 

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

function highlightTableRow(dayName) {
  tableRows.forEach((row) => {
    const cell = row.querySelector("td");
    if (cell && cell.textContent.trim() === dayName) {
      row.classList.add("highlight");
      row.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      row.classList.remove("highlight");
    }
  });
}

function displayResult(dayName, akanName, meaning) {
  resultDayEl.textContent = `Born on a ${dayName}`;
  resultNameEl.textContent = akanName;
  resultMeaningEl.textContent = meaning;

  resultCard.classList.add("visible");

  setTimeout(() => {
    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

function resetUI() {
  resultCard.classList.remove("visible");
  tableRows.forEach((row) => row.classList.remove("highlight"));
  clearError();
  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
  selectedGender = null;
  genderButtons.forEach((btn) => btn.classList.remove("active"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

genderButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    genderButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedGender = btn.dataset.gender;
    clearError();
  });
});

[dayInput, monthInput, yearInput].forEach((input) => {
  input.addEventListener("input", clearError);
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

resetBtn.addEventListener("click", resetUI);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") generateBtn.click();
});
