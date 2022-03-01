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
  if(inputText == ''){
    errorMessage.innerText = "Please Write Something For search";
  } else {
    errorMessage.innerText = '';
    spinner("d-block", "d-none");
    // Load Data From API

    const loadPhone = () => {
      const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
      fetch(url)
      .then(res => res.json())
      .then(data => resultPhone(data.data.slice(0,20)))
      // .catch(error => displayError(error));
    }
    // display error

    // const displayError = (error) => {
    //   inputField.value = '';
    //   document.getElementById('resultShow').textContent = '';
    //   let errorNoFound = 'no found results';
    //   const countError = document.getElementById('count-number');
    //   countError.innerText = errorNoFound;
    // }
    loadPhone();

    // show Results

    const resultPhone = phones => {
      const resultContainer = document.getElementById('resultShow');
      spinner("d-block", "d-none");
      const phonesFromData = phones.data;
      if(phones.length > 1){
        document.getElementById('count-number').innerHTML = `${phones.length} found form "<strong>${inputText}</strong>"`;
      }else if(phones.length == 1){
        document.getElementById('count-number').innerHTML = `${phones.length} found form "<strong>${inputText}</strong>"`;
      }else if(phones = ''){
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
            applyDiv.innerHTML =  `
            <div class="card shadow" >
              <img src="${phone.image}" class="w-50 h-50 my-3  mx-auto img-fluid card-img-top" alt="...">
              <div class="card-body">
                <h4 class="card-title">${phone.brand}</h4>
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6>${phone.slug}</h6>
                <button onclick= "loadPhoneIdName('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary">Go somewhere</button>
                
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

const displayPhoneDetailsResults = (results) => {
  console.log(results);
  const arrays  = results.mainFeatures.sensors;

  const displayPhoneDetailsResultShow = document.getElementById('phone-details');
  const showDiv = document.createElement('div');
  showDiv.classList.add('row', 'g-0');
  showDiv.innerHTML = `
            <div class="col-md-4 d-flex">
              <img src="${results.image}"  width="300px" class="img-fluid mt-2 rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                
                <h5 class="card-title">Name: ${results.name}</h5>
                <h6 class="card-title">Brand: ${results.brand}</h6>
                <p class="fw-bold"><strong >Release Date</strong>: ${results?.releaseDate? results.releaseDate: "No date found"}  </p>
                

                <div class="card-text">
                  <h6><strong>Main Features:</strong></h6>
                  <strong>chip Set:</strong> ${results.mainFeatures.chipSet}<br>
                  <strong>Strorage:</strong> ${results.mainFeatures.storage}<br>
                  <strong>Display:</strong> ${results.mainFeatures.displaySize}<br>
                  <strong>Memory:</strong> ${results.mainFeatures.memory}<br>
                  <strong>Sensors:</strong> ${arrays}<br>
                  <h6><strong>Others:</strong></h6>
                  <strong>WLAN:</strong> ${results?.others?.WLAN? results.others.WLAN: "WALN not found"}<br>
                  <strong>Bluetooth:</strong> ${results?.others?.Bluetooth? results.others.Bluetooth: "Bluetooth not found"}<br>
                  <strong>NFC:</strong> ${results?.others?.NFC? results.others.NFC: "NFC not found"}<br>
                  <strong>GPS:</strong> ${results?.others?.GPS? results.others.GPS: "GPS not found"}<br>
                  <strong>Radio:</strong> ${results?.others?.Radio? results.others.Radio: "Radio not found"}<br>
                </div>
              </div>
            </div>
          `;
  displayPhoneDetailsResultShow.textContent = '';
  displayPhoneDetailsResultShow.appendChild(showDiv);
}



