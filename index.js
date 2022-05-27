console.log("This is postman clone project");

//utility function for getting dom element div
function getElement(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

//variable for counting number of parameters
let parameterCount = 0;

//parameter box or json box hide or show functionality
let jsonTemplate = document.getElementById("jsonTemplate");
let parameterTemplate = document.getElementById("parameterTemplate");
parameterTemplate.style.display = "none";

let parameterRadio = document.getElementById("parameterRadio");
parameterRadio.addEventListener("click", () => {
  jsonTemplate.style.display = "none";
  parameterTemplate.style.display = "flex";
});

let jsonrRadi0 = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  jsonTemplate.style.display = "flex";
  parameterTemplate.style.display = "none";
});

//when user click + button to add more parameters
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
  let params = document.getElementById("params");
  let string = `<div id="parameterTemplate" class="mb-3 row">
    <label for="parameterBox${
      parameterCount + 2
    }" class="col-sm-2 col-form-label"
      >Parameter ${parameterCount + 2}</label
    >
    <div class="col-sm-10">
      <div id="paremeterBox${parameterCount + 2}" class="row g-1">
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="Parameter ${parameterCount + 2} Key here..."
            id="key${parameterCount + 2}"
            aria-label="Key"
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="Parameter ${parameterCount + 2} Value here..."
            id="value${parameterCount + 2}"
            aria-label="Value"
          />
        </div>
        <button type="button" class="btn btn-info col-sm-1 deleteBtn">
          -
        </button>
      </div>
    </div>
</div>`;

  //for getting div element
  let parameterElement = getElement(string);
  params.appendChild(parameterElement);

  //when user click - button to delete the parameter
  let deleteBtn = document.getElementsByClassName("deleteBtn");

  for (let item of deleteBtn) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.remove();
    });
  }
  parameterCount++;
});

//when user click the submit button for response of request

let submitRequest = document.getElementById("submitRequest");
submitRequest.addEventListener("click", () => {
  //for display response request in pending state so please wait for user patience
  // document.getElementById("responseBox").value = "Please wait for Fetching response... ";
  document.getElementById("responseCode").innerHTML =
    "Please wait for Fetching response... ";
  Prism.highlightAll();

  //fetch all the values user has entered
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name = 'requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name = 'contentType']:checked"
  ).value;

  //if user click params then collect all parameters
  if (contentType == "parameter") {
    data = {};
    for (let i = 0; i < parameterCount + 1; i++) {
      if (document.getElementById("key" + (i + 1)) != undefined) {
        let key = document.getElementById("key" + (i + 1)).value;
        let value = document.getElementById("value" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("jsonBox").value;
  }

  //for debugging purpose
  console.log(url, requestType, contentType, "data is", data);

  // if the request type is get then fetch api for get request

  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById("responseBox").value = text;
        document.getElementById("responseCode").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById("response").value = text;
        document.getElementById("responseCode").innerHTML = text;
        Prism.highlightAll();
      });
  }
});
