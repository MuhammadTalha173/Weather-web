const apiKey = '7bd46267fd0fc6dba82708f8f9f28d84';

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  if (!city) {
    document.getElementById('error').textContent = "Please enter a city";
    return;
  }
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
}

async function fetchWeather(url) {
  document.getElementById('error').textContent = "";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    updateUI(data);
  } catch (err) {
    document.getElementById('error').textContent = err.message;
  }
}

async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    }, () => {
      document.getElementById('error').textContent = "Location access denied";
    });
  } else {
    document.getElementById('error').textContent = "Geolocation not supported";
  }
}

function updateUI(data) {
  const cityName = `${data.name}, ${data.sys.country}`;
  const tempValue = Math.round(data.main.temp);
  const temp = `${tempValue}°C`;
  const desc = data.weather[0].description;
  const humidity = `Humidity: ${data.main.humidity}%`;

  document.getElementById('cityName').textContent = cityName;
  document.getElementById('temp').textContent = temp;
  document.getElementById('description').textContent = desc;
  document.getElementById('humidity').textContent = humidity;

  const weatherMain = data.weather[0].main.toLowerCase();
  let icon = '🌤️';

  if (weatherMain.includes('clear')) {
    icon = '☀️';
  } else if (weatherMain.includes('cloud')) {
    icon = '☁️';
  } else if (weatherMain.includes('rain')) {
    icon = '🌧️';
  } else if (weatherMain.includes('snow')) {
    icon = '❄️';
  } else if (weatherMain.includes('thunderstorm')) {
    icon = '⛈️';
  }

  document.getElementById('weatherIcon').textContent = icon;

  const card = document.getElementById('weatherCard');
  
  // ✅ New Professional Backgrounds (Dark Theme Style)
  let bgImage = 'url(https://images.unsplash.com/photo-1603312448610-53c98c0f6771?auto=format&fit=crop&w=800&q=80)'; // default

  if (weatherMain.includes('cloud')) {
    bgImage = 'url(https://images.unsplash.com/photo-1610878180933-ff34bb79e2f2?auto=format&fit=crop&w=800&q=80)'; // clouds
  } else if (weatherMain.includes('rain')) {
    bgImage = 'url(https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80)'; // rain
  } else if (weatherMain.includes('clear')) {
    bgImage = 'url(https://images.unsplash.com/photo-1605559424843-3bdf6ba5cfd9?auto=format&fit=crop&w=800&q=80)'; // clear sky
  } else if (weatherMain.includes('snow')) {
    bgImage = 'url(https://images.unsplash.com/photo-1608889179144-79a5e42870fe?auto=format&fit=crop&w=800&q=80)'; // snow
  } else if (weatherMain.includes('thunderstorm')) {
    bgImage = 'url(https://images.unsplash.com/photo-1618005198919-d3d4b5c30f29?auto=format&fit=crop&w=800&q=80)'; // thunder
  }

  card.style.backgroundImage = bgImage;
}
