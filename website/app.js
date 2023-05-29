const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const key = 'c918cb52bf20e6c96d3edf181ec837dc'
const units = '&units=metric'
const apiKey = '&appid=' + key + units

const date = new Date()
const day = date.getDate()
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const today = `${day} ${months[date.getMonth()]}, ${days[date.getDay()]}`;

function submitInfo(e) {
  event.preventDefault();
  
  const zipCodeInput = document.getElementById('zip-code');
  const feelingsInput = document.getElementById('feelings');
  const zipCode = zipCodeInput.value;
  const feelings = feelingsInput.value;

  weatherInfo(baseUrl, zipCode, apiKey)
  .then((data) => {
    console.log(data)
    postData('/add', {
      date: today,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      content: feelings
    }).then((newData) => {
      document.querySelector('.date').innerText = newData.date
      document.querySelector('.temp').innerText = Math.round(newData.temp) + `\u00B0C`
      document.querySelector('.temp-description').innerText = newData.description
      document.querySelector('.content-info').innerText = newData.content
    })
  })
}

const weatherInfo = async (baseUrl, zipCode, apiKey) => {
  const res = await fetch(baseUrl + zipCode + apiKey)
  try {
     const data = await res.json()
     return data
  } catch(error) {
      console.log("error",error)
      throw error;
  }
}

const postData = async (url='', data={}) => {
  const response = await fetch(url, {
      method:'post',
      credentials:'same-origin',
      headers:{
          'content-type':'application/json'
      },
      body: JSON.stringify(data)
  }) 
  try {
    const newData = await response.json()
    console.log(newData)
    return newData
  } catch(error) {
    console.log("error",error)
  }
}
