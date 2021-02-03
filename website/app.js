/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=99c60259cdec10f270676338ff10cb13';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// function to execute when 'generate' is clicked
document.getElementById('generate').addEventListener('click', weatherInfo);

// Callback function
function weatherInfo() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    retrieveWeatherData(baseURL, zipCode, apiKey)
    
        .then((data) => {
            postData('/addData', {temperature: data.main.temp, feeling: feelings, date: newDate} );
        })
        .then(() => {
            updateUI();
        });
};

// GET function for weather data from API

const retrieveWeatherData = async (baseURL, zipCode, apiKey) => {
    console.log("retrieveWeather function running")
    const res = await fetch(baseURL+zipCode+apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }catch(error) {
        console.log("error", error);
    }

};


// POST data function

const postData = async (url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),      
  });

    try {
      const newData = await response.json();
      console.log(data);
      return newData;
    } catch(error) {
    console.log("error", error);
    }
};

// update UI

const updateUI = async () => {
    const request = await fetch('/all');

    try{
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.feeling;
    } catch(error) {
        console.log("error", error);
    }
};

