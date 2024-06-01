document
  .getElementById("pool-form")
  .addEventListener("submit", function (event) {
    const nameInputValue = document.getElementById("lastName").value.trim();

    if (nameInputValue === "") {
      event.preventDefault();

      Swal.fire({
        title: "Warning",
        text: "Last name field is empty!",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  });
