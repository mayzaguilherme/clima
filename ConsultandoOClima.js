const apiKey = "51e6b37c01c5408782b130200252907";

const searchForm = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const nomedacidade = document.getElementById('city-name');
const horaLocal = document.getElementById('local-time');
const temperatura = document.getElementById('temperature');
const condicao = document.getElementById('condition');
const imagemdoclima = document.getElementById('feels-like');
const umidade = document.getElementById('humidity');
const velocidadedovento = document.getElementById('weather-icon');
const wResult = document.getElementById('weather-result');
const errorMens = document.getElementById('error-message');
const VeloVent = document.getElementById("wind-speed");
const pressao = document.getElementById("pressure");
const visibilidade = document.getElementById("visibility");
const indiceuv = document.getElementById("uv-index");

async function fetchConsultClima(cidade) {
   try {
       const lowerCaseName = cidade.toLowerCase().trim();

       if (!lowerCaseName) {
           throw new Error("Digite o nome de uma cidade.");
       }

       const result = await fetch(
           `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lowerCaseName}&aqi=no&lang=pt`
       );

       if (!result.ok) {
           throw new Error(`Cidade "${cidade}" não encontrada`);
       }

       const dados = await result.json();
       renderWeatherData(dados);

   } catch (error) {
       renderError(error.message);
   }
}

function renderWeatherData(data) {
   const estadoAtual = data.current;
   const local = data.location;

   nomedacidade.textContent = `${local.name}, ${local.country}`;
   horaLocal.textContent = `Hora local: ${local.localtime}`;
   temperatura.textContent = `${estadoAtual.temp_c}°C`;
   condicao.textContent = estadoAtual.condition.text;
   clima.textContent = `${estadoAtual.feelslike_c}°C`;
   umidade.textContent = `${estadoAtual.humidity}%`;
   Velocidadedovento.textContent = `${estadoAtual.wind_kph} km/h`;
   pressao.textContent = `${estadoAtual.pressure_mb} hPa`;
   visibilidade.textContent = `${estadoAtual.vis_km} km`;
   indiceuv.textContent = `${estadoAtual.uv}`;
   wIcon.src = estadoAtual.condition.icon;
   wIcon.alt = estadoAtual.condition.text;

   wResult.classList.remove('hidden');
   errorMens.classList.add('hidden');
}


function renderError(message) {
   wResult.classList.add('hidden');
   errorMens.classList.remove('hidden');
   errorMens.textContent = message;
}

searchForm.addEventListener('click', function (event) {
   event.preventDefault(); 
   const cidade = cityInput.value.trim();
   fetchConsultClima(cidade);
});


