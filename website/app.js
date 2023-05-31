const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const units = '&units=metric'
let secretKey = ''
let apiKey = ''

const date = new Date()
const hour = date.getHours()
const day = date.getDate()
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const today = `${day} ${months[date.getMonth()]}, ${days[date.getDay()]}`

const termIcon = document.querySelector('.term-icon')
const tempInfoContainer = document.querySelector('.temp-info-container')
const menuMobileButton = document.getElementById('menu-mobile-btn')
const formContainer = document.querySelector('.form-container')
const tempNumberWraper = document.querySelector('.temp-number-wraper')
const coverImages = ['01d.svg', '14s.svg', '01n.svg']

// Set the first cover image depending on the time of day, whether morning, afternoon or evening
setImageCover(hour)

// Get API Key from server.js
fetch('/getkey')
  .then(response => response.text())
  .then(key => {
    secretKey = key
    apiKey = `&appid=${secretKey}${units}`
  });

// Activate when the form is submitted
function submitInfo(e) {
  event.preventDefault()
  
  const zipCodeInput = document.getElementById('zip-code')
  const feelingsInput = document.getElementById('feelings')
  const zipCode = zipCodeInput.value
  const feelings = feelingsInput.value
  zipCodeInput.value = ''
  feelingsInput.value = ''

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
      tempNumberWraper.style.display = 'flex'
      changeImageBackground(newData.icon, Math.round(newData.temp))
      document.querySelector('.date').innerText = newData.date
      document.querySelector('.temp').innerText = Math.round(newData.temp) + `\u00B0C`
      document.querySelector('.temp-description').innerText = newData.description
      document.querySelector('.content-info').innerText = 'Today you are feeling: ' + newData.content
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
      method:'POST',
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

// Change the background image depending on the icon attribute code returned by the API
function changeImageBackground(imgName, temp) {
  tempInfoContainer.style.background = `url(../assets/images/${imgName}.svg)`
  tempInfoContainer.style.backgroundRepeat = 'no-repeat'
  tempInfoContainer.style.backgroundSize = 'cover'
  tempInfoContainer.style.backgroundPosition = 'center'

  temp > 25 ? termIcon.src = 'assets/images/thermometer-red.svg' : termIcon.src = 'assets/images/thermometer-blue.svg'
}

// Controls the behavior of the button that hides and shows the form box in mobile resolution
menuMobileButton.addEventListener('click', () => {
  let linkImage = menuMobileButton.src
  
  if(linkImage.includes('bars-solid')) {
    menuMobileButton.src = 'assets/icons/x-solid.svg'
    formContainer.style.display = 'block'
  } else if(linkImage.includes('x-solid')) {
    menuMobileButton.src = 'assets/icons/bars-solid.svg'
    formContainer.style.display = 'none'
  }
})

window.addEventListener('resize', () => {
  if(screen.width > 1050) {
    formContainer.style.display = 'block'
  } else {
    formContainer.style.display = 'none'
    menuMobileButton.src = 'assets/icons/bars-solid.svg'
  }
})

// Set the first cover image depending on the time of day, whether morning, afternoon or evening
function setImageCover(timeHour) {
  let coverIndex

  if(timeHour >= 0 && timeHour <= 5) {
    coverIndex = 2
  } else if(timeHour > 5 && timeHour <= 16) {
    coverIndex = 0
  } else if(timeHour > 16 && timeHour <= 19) {
    coverIndex = 1
  } else if(timeHour > 19 && timeHour <= 23) {
    coverIndex = 2
  }

  tempInfoContainer.style.background = `url(../assets/images/${coverImages[coverIndex]})`
  tempInfoContainer.style.backgroundRepeat = 'no-repeat'
  tempInfoContainer.style.backgroundSize = 'cover'
  tempInfoContainer.style.backgroundPosition = 'center'
}
