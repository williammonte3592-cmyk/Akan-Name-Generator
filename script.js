document.getElementById("akanForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values
  let day = parseInt(document.getElementById("day").value);
  let month = parseInt(document.getElementById("month").value) + 1;
  let year = parseInt(document.getElementById("year").value);
  let gender = document.getElementById("gender").value;
  let name = document.getElementById("name").value;
  let result = document.getElementById("result");

  // Check if fields are empty
  if (!day || !month || !year || !gender || !name) {
    result.textContent = "Please fill in all fields.";
    return;
  }

  // Validate day range
  if (day < 1 || day > 31) {
    result.textContent = "Invalid day. Please enter a day between 1 and 31.";
    return;
  }

  // Zeller's formula: Jan & Feb belong to previous year
  if (month <= 2) {
    month += 12;
    year -= 1;
  }

  let CC = Math.floor(year / 100);
  let YY = year % 100;

  // Zeller's congruence
  let d =
    (day +
      Math.floor((26 * (month + 1)) / 10) +
      YY +
      Math.floor(YY / 4) +
      Math.floor(CC / 4) -
      2 * CC) %
    7;

  // Fix negative values
  if (d < 0) d += 7;

  // Remap: Zeller gives 0=Sat, we need 0=Sun
  let dayMap = [1, 2, 3, 4, 5, 6, 0];
  d = dayMap[d];

  // Akan names (0=Sunday ... 6=Saturday)
  let maleNames = [
    "Kwasi",
    "Kwadwo",
    "Kwabena",
    "Kwaku",
    "Yaw",
    "Kofi",
    "Kwame",
  ];
  let femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

  // Show result
  let akanName = gender === "male" ? maleNames[d] : femaleNames[d];
  result.textContent = name + ", your Akan name is: " + akanName;
});
