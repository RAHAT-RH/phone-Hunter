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
    // Load Data From API

    const loadPhone = () => {
      const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;
      fetch(url)
      .then(res => res.json())
      .then(data => resultPhone(data))
      .catch(error => displayError(error))
    }
    // display error

    const displayError = (error) => {
      inputField.value = '';
      document.getElementById('resultShow').textContent = '';
      let errorNoFound = 'no found results';
      const countError = document.getElementById('count-number');
      countError.innerText = errorNoFound;
    }
    loadPhone();

    // show Results

    const resultPhone = phones => {
      console.log(phones);
      const resultContainer = document.getElementById('resultShow')
      const phonesFromData = phones.data;
      if(phonesFromData.length > 1){
        document.getElementById('count-number').innerHTML = `${phones.data.length} found form "<strong>${inputField.value}</strong>"`;
      }else if(phonesFromData.length == 1){
        document.getElementById('count-number').innerHTML = `${phones.data.length} found form "<strong>${inputField.value}</strong>"`;
      }
      resultContainer.textContent = '';
      inputField.value = '';
      phones.data.forEach(phone => {
        console.log(phone);
        const applyDiv = document.createElement('div');
        applyDiv.classList.add('col');
            applyDiv.innerHTML =  `
            <div class="card shadow" >
              <img src="${phone.image}" class="w-50 h-50  mx-auto img-fluid card-img-top" alt="...">
              <div class="card-body">
                <h4 class="card-title">${phone.brand}</h4>
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6 class="card-title">${phone.slug}</h5>
                <button onclick='phoneDetails(phone)' class="btn btn-primary">Go somewhere</button>
              </div>
            </div>
        `;
        resultContainer.appendChild(applyDiv); 
      });
    }
  }
}

