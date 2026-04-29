document.getElementById("akanForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let day = parseInt(document.getElementById("day").value);
  let month = parseInt(document.getElementById("month").value) + 1;
  let year = parseInt(document.getElementById("year").value);
  let gender = document.getElementById("gender").value;
  let name = document.getElementById("name").value;
  let result = document.getElementById("result");

  if (!day || !month || !year || !gender || !name) {
    result.textContent = "Please fill in all fields.";
    return;
  }

  if (day < 1 || day > 31) {
    result.textContent = "Invalid day. Please enter a day between 1 and 31.";
    return;
  }

  if (month <= 2) {
    month += 12;
    year -= 1;
  }

  let CC = Math.floor(year / 100);
  let YY = year % 100;

  let d =
    (day +
      Math.floor((26 * (month + 1)) / 10) +
      YY +
      Math.floor(YY / 4) +
      Math.floor(CC / 4) -
      2 * CC) %
    7;

  if (d < 0) d += 7;

  let dayMap = [1, 2, 3, 4, 5, 6, 0];
  d = dayMap[d];

  let maleNames = ["Kwasi", "Kwadwo","Kwabena","Kwaku", "Yaw", "Kofi","Kwame",];
  let femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

  let akanName = gender === "male" ? maleNames[d] : femaleNames[d];
  result.textContent = name + ", your Akan name is: " + akanName;
});
