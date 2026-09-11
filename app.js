async function welcomeToMyHell(){
    let chapelHill = await fetch('https://api.openweathermap.org/data/2.5/weather?id=4460162&appid=7f8c8803c5c2dce57dc19ce83057c135&units=imperial');
    let weatherDataCH = await chapelHill.json();
    let conditionsCH = weatherDataCH.weather[0].main;


    if (conditionsCH==='Clear' || weatherDataCH.clouds.all < 50){
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

    let doW = timeData.day_of_week;

    if (doW==0){
        dayWeek="Sunday";
    } else if (doW==1) {
        dayWeek="Monday";
    } else if (doW==2){
        dayWeek="Tuesday";
    } else if (doW==3){
        dayWeek="Wednesday";
    } else if (doW==4){
        dayWeek="Thursday";
    } else if (doW==5){
        dayWeek="Friday";
    } else {
        dayWeek="Saturday";
    }

    let monthx = currentTime[5];
    let monthy = currentTime[6];
    console.log(monthy);

    if (monthy==3) {
        month="March";
    } else if (monthy==4) {
        month="April";
    } else if (monthy==5){
        month="May";
    } else if (monthy==6) {
        month="June";
    } else if (monthy==7){
        month="July";
    } else if (monthy==8) {
        month="August";
    } else if (monthy==9){
        month="September";
    } else if (monthx==1 && monthy==0) {
        month="October";
    } else if (monthx==1 && monthy==1){
        month="November";
    } else {
        month="December";
    }


    document.getElementById('cal').textContent=dayWeek+ ", " + month + " " + currentTime.substring(8,10);
}

welcomeToMyHell();

document.getElementById('focus').addEventListener('click', function(){
    function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            timer = duration; 
            alert("Focus time is up! Take a break");
        }
    }, 1000);
    }

    var time = 1500, 
        display = document.querySelector('h1');
    startTimer(time, display);
})

document.getElementById('shortB').addEventListener('click', function(){
    function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            timer = duration; 
            alert("Break time is up! Time to focus");
        }
    }, 1000);
    }

    var time = 300, 
        display = document.querySelector('h1');
    startTimer(time, display);
})

document.getElementById('longB').addEventListener('click', function(){
    function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            timer = duration; 
            alert("Break time is up! Time to focus");
        }
    }, 1000);
    }

    var time = 900, 
        display = document.querySelector('h1');
    startTimer(time, display);
})



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

let calcInput=document.getElementById('calc');
let currentInput='';
let currentOperation='';
let previousInput='';

function appendNumber (number){
    currentInput += number;
    calcInput.value= `${previousInput}${currentOperation}${currentInput}`;
}

function appendOperation(operation){
    if (currentInput === ''){
        return
    } else {
        calculate();
    }
    currentOperation = operation;
    previousInput=currentInput;
    currentInput='';
    calcInput.value = `${previousInput}${currentOperation}`;
}

function appendDecimal() {
    if (currentInput.includes('.')) {
        return;
    }
    if (currentInput === '') {
        currentInput = '0';
    }
    currentInput += '.';
    calcInput.value = `${previousInput}${currentOperation}${currentInput}`;
}

function calculate(){
    if (previousInput === '' || currentInput === '') return;
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch(currentOperation){
        
        case '+':
            result=prev+current;
            break;
        case '-':
            result=prev-current;
            break;
        case '*':
            result=prev*current;
            break;
        case '**':
            result=prev**current;
            break;
        case '/':
            if (current === 0){
                calcInput.value="Undefined";
                currentInput = '';
                previousInput = '';
                currentOperation = '';
                return;
            }
            result = prev/current;
            break;
            default: 
                return;
            }
    currentInput = result.toString();
    currentOperation = '';
    previousInput = '';
calcInput.value=currentInput
}

document.getElementById('clear').addEventListener('click', function(){
    currentInput = '';
    previousInput = '';
    currentOperation = '';
    calcInput.value='';
})

let equals=document.getElementById('equals');

document.getElementById('export').addEventListener('click', function(){
    const notesText=document.getElementById('notes-val').value;
    const blob = new Blob([notesText], { type: 'text/plain;charset=utf-8' });
    const fileUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'exported-data.txt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(fileUrl);
})

var motivs =["todayimake.jpg", "academicmisandry.jpg", "clippy.jpg","crazy.jpg","adawg.jpg","ellewoods.jpg","over.jpg","soooopy.jpg","snoop.jpg"];
var currentIndex = 0;

function updateDisplay(){
    document.getElementById('imgy').src=motivs[currentIndex];
};
document.getElementById("nextbtn").addEventListener('click', function(){
    currentIndex=currentIndex+1;
    if (currentIndex >= motivs.length){
        currentIndex=0;
    }
    updateDisplay();
});
document.getElementById("prevbtn").addEventListener('click', function(){
    currentIndex=currentIndex-1;
    if (currentIndex < 0){
        currentIndex=motivs.length-1;
    }
    updateDisplay();
});
