// Spinner Added Function
const spinner = (remove, add) => {
  const spinnerBlink = document.getElementById('spinner-blink');
  spinnerBlink.classList.remove(remove);
  spinnerBlink.classList.add(add);
}

// Load Button

const loadButton = () => {
  const inputField = document.getElementById('input-field');
  const inputText = inputField.value;
  inputField.value = '';
  // Error Handaling
  const errorMessage = document.getElementById('error-message');
  if (inputText == '') {
    errorMessage.innerText = "Please Write Something For search";
  } else {
    errorMessage.innerText = '';
    spinner("d-none", "d-block");
    // Load Data From API

    const loadPhone = () => {
      const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
      fetch(url)
        .then(res => res.json())
        .then(data => resultPhone(data.data.slice(0, 20)))
    }
    loadPhone();
    const resultPhone = phones => {
      const resultContainer = document.getElementById('resultShow');
      spinner("d-block", "d-none");
      const phonesFromData = phones.data;
      if (phones.length > 1) {
        document.getElementById('count-number').innerHTML = `${phones.length} found form "<strong>${inputText}</strong>"`;
      } else if (phones.length == 1) {
        document.getElementById('count-number').innerHTML = `${phones.length} found form "<strong>${inputText}</strong>"`;
      } else if (phones == '') {

        inputField.value = '';
        document.getElementById('resultShow').textContent = '';
        let errorNoFound = 'no found results';
        const countError = document.getElementById('count-number');
        countError.innerText = errorNoFound;
      }
      resultContainer.textContent = '';
      inputField.value = '';
      phones.forEach(phone => {
        // console.log(phone);
        const applyDiv = document.createElement('div');
        applyDiv.classList.add('col', 'col-12');
        applyDiv.innerHTML = `
            <div class="card shadow" >
              <img src="${phone.image}" class="w-50 h-50 my-3  mx-auto img-fluid card-img-top" alt="...">
              <div class="card-body">
                <h4 class="card-title text-success text-center">${phone.brand}</h4>
                <h5 class="card-title text-success text-center">${phone.phone_name}</h5>
                <div class='text-center'>
                <button onclick= "loadPhoneIdName('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-success text-center mx-auto">Go somewhere</button>
                </div>
                
              </div>
            </div>
        `;
        resultContainer.appendChild(applyDiv);
      });
    }
  }
}

// phone details

const loadPhoneIdName = idName => {
  const url = `https://openapi.programming-hero.com/api/phone/${idName}`;
  fetch(url)
    .then(res => res.json())
    .then(datas => displayPhoneDetailsResults(datas.data))
}

// display details

const displayPhoneDetailsResults = (results) => {
  console.log(results);
  const sensorArrays = results.mainFeatures.sensors;
  const displayPhoneDetailsResultShow = document.getElementById('phone-details');
  const showDiv = document.createElement('div');
  showDiv.classList.add('row', 'g-0');
  showDiv.innerHTML = `
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div class="col-md-3 d-flex align-items-center justify-content-center">
              <img src="${results.image}" class="img-fluid mt-2 rounded-start" alt="...">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title fs-4">Name: ${results.name}</h5>
                <h6 class="card-title fs-5">Brand: ${results.brand}</h6>
                <p class=" fs-6 fw-bold"><strong class=''>Release Date</strong>: ${results?.releaseDate? results.releaseDate: "<span class='text-danger'>No date found</span>"}  </p>
                <div class="card-text">
                  <h6><strong>Main Features:</strong></h6>
                  <span class="fw-light d-block"><strong class='fw-bold'>Chip Set:</strong> ${results.mainFeatures.chipSet}</span>
                  <span class="fw-light d-block"><strong class='fw-bold'>Strorage:</strong> ${results.mainFeatures.storage}</span>
                  <span class="fw-light d-block"><strong class='fw-bold'>Display:</strong> ${results.mainFeatures.displaySize}</span>
                  <span class="fw-light d-block"><strong class='fw-bold'>Memory:</strong> ${results.mainFeatures.memory}</span>
                  <span class="fw-light d-block"><strong class='fw-bold'>Sensors:</strong> ${sensorArrays}</span>
                  <h6><strong class='fw-bold'>Others:</strong></h6>
                  <span class='fw-light d-block'><strong class='fw-bold'>WLAN:</strong> ${results?.others?.WLAN? results.others.WLAN: "WALN not found"}</span>
                  <span class='fw-light d-block'><strong class='fw-bold'>Bluetooth:</strong> ${results?.others?.Bluetooth? results.others.Bluetooth: "Bluetooth not found"}</span>
                  <span class='fw-light d-block'><strong class='fw-bold'>NFC:</strong> ${results?.others?.NFC? results.others.NFC: ">NFC not found"}</span>
                  <span class='fw-light d-block'><strong class='fw-bold'>GPS:</strong> ${results?.others?.GPS? results.others.GPS: "GPS not found"}</span>
                  <span class='fw-light d-block'><strong class='fw-bold'>Radio:</strong> ${results?.others?.Radio? results.others.Radio: "Radio not found"}</span>
                </div>
              </div>
            </div>
          `;

  displayPhoneDetailsResultShow.textContent = '';
  displayPhoneDetailsResultShow.appendChild(showDiv);
}