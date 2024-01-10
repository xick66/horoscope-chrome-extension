// document.addEventListener('DOMContentLoaded', function() {
//   // Fetch the special information about today
//   fetchSpecialInfo();

//   // Retrieve the user's zodiac sign
//   const zodiacSignElement = document.getElementById('zodiacSign');
//   zodiacSignElement.addEventListener('change', function() {
//     const selectedSign = zodiacSignElement.value;
//     displayZodiacSign(selectedSign);
//     fetchHoroscope(selectedSign);
//   });
// });
document.addEventListener('DOMContentLoaded', function() {
  const zodiacSignElement = document.getElementById('zodiacSign');
  zodiacSignElement.addEventListener('change', function() {
    const selectedZodiacSignElement = document.getElementById('selectedZodiacSign');
    selectedZodiacSignElement.textContent = zodiacSignElement.value;
    fetchHoroscope(zodiacSignElement.value);
  });

  // Fetch the special information about today
  fetchSpecialInfo();
});
function fetchSpecialInfo() {
  fetch('https://horoscope-astrology.p.rapidapi.com/dailyphrase', {
    headers: {
      'X-RapidAPI-Key': 'fcc69044d8mshacce5c99fdaf337p1dcab2jsnd8a3422f2cb1',
      'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com'
    }
  })
  .then(response => response.json())
  .then(data => {
    const specialInfo = document.getElementById('specialInfo');
    specialInfo.textContent = data.daily;
  })
  .catch(error => {
    console.log('Error:', error);
  });
}

function displayZodiacSign(zodiacSign) {
  const zodiacSignElement = document.getElementById('selectedZodiacSign');
  zodiacSignElement.textContent = zodiacSign;
}

// function fetchHoroscope(zodiacSign) {
//   // Implement your logic to fetch the horoscope for the given zodiac sign
//   // You can use a suitable horoscope API based on your requirements
//   // For now, let's assume the horoscope is 'Loading...'
//   const horoscopeElement = document.getElementById('horoscope');
//   horoscopeElement.textContent = 'Loading...';
// }
// async function fetchHoroscope(zodiacSign) {
//   const horoscopeElement = document.getElementById('horoscope');
//   horoscopeElement.textContent = 'Loading...';

//   const options = {
//       method: 'GET',
//       url: 'https://horoscope-astrology.p.rapidapi.com/sign',
//       params: { s: zodiacSign },
//       headers: {
//           'X-RapidAPI-Key': 'fcc69044d8mshacce5c99fdaf337p1dcab2jsnd8a3422f2cb1',
//           'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com'
//       }
//   };

//   try {
//       const response = await axios.request(options);
//       const { health, love, career, element } = response.data;

//       const horoscopeText = `Health: ${health}\nLove: ${love}\nCareer: ${career}\nElement: ${element}`;
//       horoscopeElement.textContent = horoscopeText;
//   } catch (error) {
//       console.error(error);
//       horoscopeElement.textContent = 'Failed to fetch horoscope.';
//   }
// }
// Declare variables for lucky number and time
let luckyNumber;
let luckyTime;

async function fetchHoroscope(zodiacSign) {
  const horoscopeElement = document.getElementById('horoscope');
  horoscopeElement.textContent = 'Loading...';

  // Check if lucky number and time have been generated for the current 24-hour period
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  if (localStorage.getItem('luckyNumberDay') != currentDay) {
    // Generate new lucky number and time
    luckyNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
    luckyTime = generateRandomTime(); // Generate a random time in HH:MM format

    // Store the current day in local storage
    localStorage.setItem('luckyNumberDay', currentDay);
    // Store the lucky number and time in local storage
    localStorage.setItem('luckyNumber', luckyNumber);
    localStorage.setItem('luckyTime', luckyTime);
  } else {
    // Retrieve the lucky number and time from local storage
    luckyNumber = localStorage.getItem('luckyNumber');
    luckyTime = localStorage.getItem('luckyTime');
  }

  const options = {
    method: 'GET',
    url: 'https://horoscope-astrology.p.rapidapi.com/sign',
    params: { s: zodiacSign },
    headers: {
      'X-RapidAPI-Key': 'fcc69044d8mshacce5c99fdaf337p1dcab2jsnd8a3422f2cb1',
      'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const { ruling_planet, strengths, symbol, weaknesses } = response.data;

    const formattedStrengths = strengths.split(',').map((strength) => strength.trim()).join('\n');
    const formattedWeaknesses = weaknesses.split(',').map((weakness) => weakness.trim()).join('\n');

    const horoscopeText = `Ruling Planet: ${ruling_planet.trim()}\n\nStrengths:\n${formattedStrengths}\n\nSymbol: ${symbol.trim()}\n\nWeaknesses:\n${formattedWeaknesses}\n\nLucky Number: ${luckyNumber}\n\nLucky Time: ${luckyTime}`;
    horoscopeElement.textContent = horoscopeText;
  } catch (error) {
    console.error(error);
    horoscopeElement.textContent = 'Failed to fetch horoscope.';
  }
}

function generateRandomTime() {
  const hour = Math.floor(Math.random() * 24); // Generate a random hour between 0 and 23
  const minute = Math.floor(Math.random() * 60); // Generate a random minute between 0 and 59

  const formattedHour = String(hour).padStart(2, '0'); // Format hour with leading zero if necessary
  const formattedMinute = String(minute).padStart(2, '0'); // Format minute with leading zero if necessary

  return `${formattedHour}:${formattedMinute}`;
}
