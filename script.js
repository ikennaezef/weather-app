const icon  = document.querySelector('#icon');
const temp = document.querySelector('#temperature');
const locationEl = document.querySelector('#location');
const description = document.querySelector('#description');
const wind = document.querySelector('#wind');
const pressure = document.querySelector('#pressure');
const humidity = document.querySelector('#humidity');
const select = document.querySelector('#city-select');

select.addEventListener('change', ()=> {
	select.value==='Your Location' ? navigator.geolocation.getCurrentPosition(loadWeather, error) : loadWeatherAlt(select.value);
});

document.addEventListener('DOMContentLoaded', ()=> navigator.geolocation.getCurrentPosition(loadWeather, error));


// Weather data for user's location
function loadWeather(e) {
	let lat = e.coords.latitude;
	let long = e.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=39b5e89431eef50396f2c1f28373848b`;

	fetch(url)
		.then(res => res.json())
		.then(data => {
			icon.innerText = '';
			let img = document.createElement('img');
			img.id = 'image';
			img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
			icon.appendChild(img);
			locationEl.innerText = data.sys.country;
			temp.innerText = (Math.floor((data.main.temp - 273) * 100))/100;
			description.innerText = data.weather[0].description.toUpperCase();
			wind.innerText = data.wind.speed;
			pressure.innerText = data.main.pressure;
			humidity.innerText = data.main.humidity;			
		})
}

// Weather data for other locations
function loadWeatherAlt(city) {
	let urlAlt = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=39b5e89431eef50396f2c1f28373848b`;

	fetch(urlAlt)
		.then(res => res.json())
		.then(data => {			
			icon.innerText = '';
			let img = document.createElement('img');
			img.id = 'image';
			img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
			icon.appendChild(img);
			locationEl.innerText = data.sys.country;
			temp.innerText = (Math.floor((data.main.temp - 273) * 100))/100;
			description.innerText = data.weather[0].description.toUpperCase();
			wind.innerText = data.wind.speed;
			pressure.innerText = data.main.pressure;
			humidity.innerText = data.main.humidity;			
		})
}

function error() {
	alert('Please this app need to use your location');
	navigator.geolocation.getCurrentPosition(loadWeather, error);
}
