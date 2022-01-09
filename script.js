document.querySelector('.busca').addEventListener('submit', async (e) => {
  e.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if(input !== '') {
    clearInfo();
    showWarning('Carregando...');

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=56c705ca66b6596651d219baef186443&units=metric&lang=pt_br`;
    
    // fazer a requisição mais facil e intuitiva
    let results = await fetch(url);
    // pegar os resultados e transforma em objetos
    let json = await results.json();

    if(json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg
      });
    } else {
      clearInfo();
      showWarning('Não encontramos está localização.');
    }
    
  } else {
    clearInfo();

  }

});

// Função preencher no html
function showInfo(json) {
  showWarning('');

  document.querySelector('.resultado').style.display = 'block';
  // preencher as informações
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

  document.querySelector('.ventoPonto').style.transfomr = `rotate(${json.windAngle}deg)`;
}

function clearInfo() {
  showWarning('');
  document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}

