async function welcomeToMyHell(){
    let chapelHill = await fetch('https://api.openweathermap.org/data/2.5/weather?id=4460162&appid=7f8c8803c5c2dce57dc19ce83057c135&units=imperial');
    let weatherDataCH = await chapelHill.json();
    let conditionsCH = weatherDataCH.weather[0].main;


    if (conditionsCH==='Clear'){
        simpWeather="clear";
    } else if (conditionsCH==='Rain'|| conditionsCH === 'Thunderstorm'){
        simpWeather="rain";
    } else if (conditionsCH === 'Snow'){
        simpWeather="snow";
    } else {
        simpWeather="cloud";
    }       

    console.log(simpWeather);

    let apiTime = await fetch ('https://time.now/developer/api/timezone/America/New_York');
    let timeData = await apiTime.json();
    let currentTime = timeData.datetime;
    let hour = parseInt(currentTime.substring(11,13));

    if (hour>=6 && hour<=18){
        simpTime="day";
    } else if (hour>18 && hour<=20){
        simpTime="evening";
    } else {
        simpTime="night";
    }
    console.log(simpTime);

    const themeClass = simpWeather + simpTime;
    document.body.classList.add(themeClass);
    console.log(themeClass);
}

welcomeToMyHell();


const linkBtn = document.getElementById('link-btn');
linkBtn.addEventListener('click', function(){
    let playlist = document.getElementById('playlist-placeholder');
    let partLink = document.getElementById('playlink').value.substr(34);
    console.log(partLink);
    playlist.src = 'https://open.spotify.com/embed/playlist/' + partLink;
})

let todoBtn = document.getElementById('tdl-btn');
todoBtn.addEventListener('click', function(){
    let newTdlItem = document.createElement('li');
    newTdlItem.textContent = document.querySelector('#list-input').value;
    newTdlItem.classList.add('new-list-item')

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Mark Task As Complete';
    deleteBtn.addEventListener('click', function(){
        newTdlItem.remove();
    })

    document.querySelector('#tdl-list').appendChild(newTdlItem);
    newTdlItem.appendChild(deleteBtn);

    document.querySelector('#list-input').value = '';
})

