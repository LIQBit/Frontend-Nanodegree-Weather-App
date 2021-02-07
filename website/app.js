/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&units=metric&appid=99c60259cdec10f270676338ff10cb13';

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
            console.log('data', data);
            
            postData('/addData', {name: data.name,
                                  feelings: feelings,
                                  date: newDate,
                                  temperature: data.main.temp,
                                  icon: data.weather[0].icon,
                                  localtime: data.timezone}
                                   )
            .then((data) => {
                updateUI()
            })
        })
};

// GET function for weather data from API

const retrieveWeatherData = async (baseURL, zipCode, apiKey) => {
    
    const res = await fetch(baseURL+zipCode+apiKey);
    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log("error", error);
    }

};


// POST data function

const postData = async (url = '', data = {})=>{
    
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
        console.log("alldata", allData);
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Current Temperature: ${allData.temperature}`;
        document.getElementById('content').innerHTML = `I'm feeling: ${allData.feelings}`;
        document.getElementById('name').innerHTML = `Location: ${allData.name}`;
        document.getElementById('icon').innerHTML = `<img src="openweathermap/${allData.icon}.svg" alt="weather icon"/>`;
    } catch(error) {
        console.log("error", error);
    }
};

