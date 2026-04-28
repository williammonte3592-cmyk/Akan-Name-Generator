
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
  Sunday:    { male: "Kwasi",   female: "Akosua", meaning: "Sunday-born souls are destined for leadership and spiritual strength." },
  Monday:    { male: "Kwadwo",  female: "Adwoa",  meaning: "Monday-born souls are known for their peacefulness and calm disposition." },
  Tuesday:   { male: "Kwabena", female: "Abenaa", meaning: "Tuesday-born carry the energy of the ocean — restless, deep and powerful." },
  Wednesday: { male: "Kwaku",   female: "Akua",   meaning: "Wednesday children are spirited, fiercely independent and unpredictable." },
  Thursday:  { male: "Yaw",     female: "Yaa",    meaning: "Thursday-born are associated with the sky deity — adventurous and ambitious." },
  Friday:    { male: "Kofi",    female: "Afua",   meaning: "Friday souls are explorers and wanderers — adventurous at heart." },
  Saturday:  { male: "Kwame",   female: "Ama",    meaning: "Saturday-born individuals are dependable, grounded and naturally authoritative." },
};const dayInput        = document.getElementById("day");
const monthInput      = document.getElementById("month");
const yearInput       = document.getElementById("year");
const generateBtn     = document.getElementById("generate-btn");
const resetBtn        = document.getElementById("reset-btn");
const errorMsg        = document.getElementById("error-msg");
const resultCard      = document.getElementById("result-card");
const resultDayEl     = document.getElementById("result-day");
const resultNameEl    = document.getElementById("result-name");
const resultMeaningEl = document.getElementById("result-meaning");
const genderButtons   = document.querySelectorAll(".gender-btn");
const tableRows       = document.querySelectorAll(".akan-table tbody tr");