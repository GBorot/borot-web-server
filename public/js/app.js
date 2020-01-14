// console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "From JS";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  //   console.log(location);

  messageOne.textContent = "Fetching data...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        // console.log(data.location);
        // console.log(data.forecast);

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
