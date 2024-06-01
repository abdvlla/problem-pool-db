document.addEventListener("DOMContentLoaded", function () {
  const bodyOfWaterSelect = document.getElementById("bodyOfWater");
  const brandField = document.getElementById("brand");
  const makeField = document.getElementById("make");
  const pumpField = document.getElementById("pump");
  const filterField = document.getElementById("filter");
  const heaterField = document.getElementById("heater");
  const sizeField = document.getElementById("size");

  function toggleFieldsVisibility() {
    const selectedOption = bodyOfWaterSelect.value;

    brandField.style.display = "none";
    makeField.style.display = "none";
    pumpField.style.display = "none";
    filterField.style.display = "none";
    heaterField.style.display = "none";
    sizeField.style.display = "none";

    if (selectedOption === "HT" || selectedOption === "SS") {
      brandField.style.display = "block";
      makeField.style.display = "block";
    } else if (
      selectedOption === "IG" ||
      selectedOption === "AG" ||
      selectedOption === "OG" ||
      selectedOption === "Other"
    ) {
      pumpField.style.display = "block";
      filterField.style.display = "block";
      heaterField.style.display = "block";
      sizeField.style.display = "block";
    }
  }

  bodyOfWaterSelect.addEventListener("change", toggleFieldsVisibility);
  toggleFieldsVisibility();
});
