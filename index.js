//main elements
let mainContainer = document.getElementById("main-ctn");
let titleContainer = document.getElementById("title-ctn");
let workAlert = document.getElementById("workAlert");
let breakAlert = document.getElementById("breakAlert");
let successAlert = document.getElementById("successAlert");
let failAlert = document.getElementById("failAlert");
let confirmAlert = document.getElementById("confirmAlert");
let popNoise = document.getElementById("popNoise");
let icon = document.getElementById("icon");


//variables
let pageCount = 0;
let setHours;
let setMinutes;
let recommendedBreaks = 0;
let breakCount = 0;
let workInterval = 24;
let breakInterval = 4;
let setWorkCountdown;
let setBreakCountdown;


//index
let menuContainer = document.createElement("div");
mainContainer.appendChild(menuContainer);
menuContainer.id = "menu-ctn";
menuContainer.innerHTML = `
<button class="menu-btn" onclick="promptSetup()">Begin</button>
<!--<button class="menu-btn" onclick="settingsSetup()">Settings</button>-->
<button class="menu-btn" onclick="aboutSetup()">About</button>
`;

function drawIndex() {
    let buttonContainer = document.getElementById("btn-ctn");
    buttonContainer.remove();
    let promptContainer = document.getElementById("prompt-ctn");
    promptContainer.remove();
    mainContainer.innerHTML = `
    <div id="title-ctn">
        <img id="icon" src="./content/tomato.svg" alt="tomato">
        <h1 id="title">Tomo Break</h1>
        <h4 class="title-sub">Welcome to Tomo Break, an app that rewards you for taking breaks!</h4>
        </div>
    <div id="menu-ctn">
        <button class="menu-btn" onclick="promptSetup()">Begin</button>
        <!--<button class="menu-btn" onclick="settingsSetup()">Settings</button>-->
        <button class="menu-btn" onclick="aboutSetup()">About</button>
    </div>
    `;
}


//prompt
function promptSetup() {
    let menuContainer = document.getElementById("menu-ctn");
    menuContainer.remove();
    let titleContainer = document.getElementById("title-ctn");
    titleContainer.lastElementChild.innerText = "Enter the information below."
    let promptContainer = document.createElement("div");
    mainContainer.appendChild(promptContainer);
    promptContainer.id = "prompt-ctn";
    promptContainer.innerHTML = `
    <p id="prompt" class="prompt-txt">
    How long do you plan to work?
    </p> 
    `;
    let formContainer = document.createElement("div");
    promptContainer.appendChild(formContainer);
    formContainer.id = "form-ctn";
    formContainer.innerHTML = `
    <div class="input-inline">
        <label for="hours" class="prompt-txt">Hours: </label>
        <input id="hours" type="number" required name="hours" value="0">
        <label for="minutes" class="prompt-txt">Minutes: </label>
        <input id="minutes" type="number" required name="minutes" value="0"">
    </div>
    `;
    let buttonContainer = document.createElement("div");
    mainContainer.appendChild(buttonContainer);
    buttonContainer.id = "btn-ctn";
    buttonContainer.innerHTML = `
        <button class="btn" type="submit" onclick="pageReload()">Back to menu</button></a>
        <button id="pageLink" onclick="changeProgress()" class="btn" type="submit">Next</button>
    `;
}
function pageReload() {
    location.reload();
}
function changeProgress() {
    pageCount++;
    if (pageCount === 1) {
        let titleContainer = document.getElementById("title-ctn");
        titleContainer.lastElementChild.remove();
        calculateBreaks(hours.value, minutes.value);
        document.getElementById("prompt").innerHTML = `Your recommended amount of breaks is <span style="color:tomato; font-weight:bold; font-size: x-large;">${recommendedBreaks}</span>. Try to reach this goal!\n\n Press 'start' when ready.`;
        document.getElementById("form-ctn").remove();
        document.getElementById('pageLink').innerText = "Start";
    } else if (pageCount === 2) {
        console.log(`Recommended breaks is: ${recommendedBreaks}`);
        tomoSetup();
    } else {
        titleContainer.innerHTML = `
        <img id="icon" src="./content/tomato.svg" alt="tomato">
        <h1 id="title">Tomo Break</h1>
        `;
        mainContainer.lastElementChild.remove();
        mainContainer.lastElementChild.remove();
        let promptContainer = document.createElement("div");
        mainContainer.appendChild(promptContainer);
        promptContainer.id = "prompt-ctn";
        if (breakCount >= Math.round(recommendedBreaks * .75)) {
            successAlert.play();
            promptContainer.innerHTML = `
            <p id="emoji">&#129395;</p>
            <p id="prompt" class="prompt-txt" style="font-weight:bold">You did it!</p>
            <p class="prompt-txt" style="text-align:center;">The recommended number of breaks was either reached or come close to successfully! Continue to practice good time-management, for better mental hygiene and increased focus.</p>
            `;

        } else {
            failAlert.play();
            promptContainer.innerHTML = `
            <p id="emoji">&#129301;</p>
            <p id="prompt" class="prompt-txt" style="font-weight:bold">Try again next time!</p>
            <p id="prompt" class="prompt-txt" style="text-align:center;">You were unable to come close to the recommended number of breaks. Going long periods of work without taking breaks can have negative effects on your health and productivy.</p>
            `;
        }
        let buttonContainer = document.createElement("div");
        mainContainer.appendChild(buttonContainer);
        buttonContainer.id = "btn-ctn";
        let backToMenu = document.createElement("button");
        buttonContainer.appendChild(backToMenu);
        backToMenu.classList.add("btn");
        backToMenu.innerText = "Back to Menu";
        backToMenu.addEventListener("click", pageReload);
    }
}
function calculateBreaks(hours, minutes) {
    setHours = hours;
    setMinutes = minutes;
    recommendedBreaks = Math.round(((parseInt(setHours) * 60) + parseInt(setMinutes)) / 25);
    console.log(`Hours: ${setHours}, Minutes: ${setMinutes}`);
    console.log(recommendedBreaks);
    return recommendedBreaks;
}
console.log("Recommended breaks is still: " + recommendedBreaks);
function resetProgress() {
    pageCount = 0;
    return pageCount;
}



//settings
function settingsSetup() {
    let titleContainer = document.getElementById("title-ctn");
    let menuContainer = document.getElementById("menu-ctn");
    titleContainer.innerHTML = `
    <img id="icon" src="./content/tomato.svg" alt="tomato">
    <h1 id="title">Tomo Break</h1>
    <h4 class="title-sub">Settings</h4>
    <h4 class="title-sub" id="clock">Clock</h4>
    `;
    menuContainer.innerHTML = `
    <div class="input-inline">
        <label for="iconSettings">Icon: </label>
        <select name="iconSettings" id="iconSettings" onchange="setIcon()">
            <option value="tomato">Tomato</option>
            <option value="pear">Pear</option>
            <option value="banana">Banana</option>
        </select>
    </div>
    `;
    let inputContainer = document.createElement("div");
    menuContainer.appendChild(inputContainer);
    inputContainer.innerHTML = `
    <label for="timeSettings">Display Background: </label>
    <select name="timeSettings" id="timeSettings" onchange="setTime()">
        <option value="on">On</option>
        <option value="off">Off</option>
    </select>
    `;
    let buttonContainer = document.createElement("div");
    mainContainer.appendChild(buttonContainer);
    buttonContainer.id = "btn-ctn";
    let backToMenu = document.createElement("button");
    buttonContainer.appendChild(backToMenu);
    backToMenu.classList.add("btn");
    backToMenu.innerText = "Back to menu";
    buttonContainer.addEventListener("click", drawIndex);
}
function setIcon() { 
    icon = document.getElementById("icon");
    if (iconSettings.value === 'tomato') {
        icon.src = './content/tomato.svg';
        icon.classList.add('fade-in');
        icon.classList.add('fade-in');
        console.log('tomato');
        return icon.src;
    } else if (iconSettings.value === 'pear') {
        icon.src = './content/pear.svg';
        icon.classList.add('fade-in');
        icon.classList.add('fade-in');
        console.log('pear');
        return icon.src;
    } else {
        icon.src = './content/banana.svg';
        icon.classList.add('fade-in');
        icon.classList.add('fade-in');
        console.log('banana');
        return icon.src;
    }
}
function setTime() {
    if (timeSettings.value === 'off') {
        clock.innerText = '';
    } else {
        clock.innerText = 'Clock';
    }
}



//tomo
function tomoSetup() {
    let titleContainer = document.getElementById("title-ctn");
    titleContainer.innerHTML = `
    <img id="icon" src="./content/tomato.svg" alt="tomato">
    <h1 id="title">Tomo Break</h1>
    <h2 id="numOfBreaks" class="title-sub"></h2>
    <h2 class="title-sub">Minutes left: <span id="time" style="color: tomato; font-size: large;">0</span></h2>
    <h2 id="status" class="title-sub" style="color: tomato">Press 'Start Work' to begin!</h2>
    `;
    document.getElementById("numOfBreaks").innerHTML = `Number of breaks: ${breakCount} / ${recommendedBreaks}`;
    mainContainer.lastElementChild.remove();
    mainContainer.lastElementChild.remove();
    let buttonContainer = document.createElement("div");
    mainContainer.appendChild(buttonContainer);
    buttonContainer.id = "btn-ctn";
    buttonContainer.innerHTML = `
    <button id="startTimer" onclick="startWorkTimer()" class="btn" style="box-shadow: none;">Start Work</button>
    <button id="takeBreak" onclick="addItem()" class="btn-green">Take Break</button>
    <!--<button onclick="clearCollection()" class="btn" style="box-shadow: none;">Clear</button>-->
    <button id="endButton" class="btn-red">End</button>
    `;
    document.getElementById("endButton").addEventListener("click", changeProgress);
    let collectionContainer = document.createElement("div");
    mainContainer.appendChild(collectionContainer);
    collectionContainer.id = "collection-ctn";
}
function clearCollection() {
    let status = document.getElementById("status");
    let currentStatus = status.innerText;
    console.log(currentStatus);
    failAlert.play();
    if(confirm("Are you sure?") === true) {
        confirmAlert.play();
        if(currentStatus === "ON BREAK...") {
            breakCount--;
            document.getElementById("numOfBreaks").innerHTML = `Number of breaks: ${breakCount} / ${recommendedBreaks}`;
        }
        document.getElementById("time").innerText = 0;
        clearInterval(setBreakCountdown);
        clearInterval(setWorkCountdown);
        //breakCount = 0;
        //document.getElementById("numOfBreaks").innerText = `Number of breaks: ${breakCount} / ${recommendedBreaks}`
        //document.getElementById("collection-ctn").innerHTML = '';
        return breakCount;
    }
}
function addItem() {
    popNoise.play();
    document.getElementById("status").style = "color: rgb(168, 255, 81);";
    document.getElementById("status").innerText = "ON BREAK...";
    let item = document.createElement("img");
    item.src = "./content/tomato.svg";
    item.alt = "itemName";
    item.id = "collection-item";
    item.classList.add("pop");
    document.getElementById("collection-ctn").appendChild(item);
    breakCount++;
    document.getElementById("numOfBreaks").innerText = `Number of breaks: ${breakCount} / ${recommendedBreaks}`;
    if(breakInterval === 4) {
        document.getElementById("time").innerText = 5;
    } else {
        document.getElementById("time").innerText = 15;
    }
    startBreakTimer();
}
function workCountdown() {
    while(workInterval > 0) {
      document.getElementById("time").innerText = workInterval;
      workInterval--;
      return workInterval;
    }
    document.getElementById("time").innerText = 0;
    breakAlert.play();
    clearInterval(setWorkCountdown);
    workInterval = 24;
    console.log(`Time reset to ${workInterval}`);
    return workInterval;
}
function startWorkTimer() {
    document.getElementById("status").style = "color: rgb(255, 132, 110);";
    document.getElementById("status").innerText = "WORKING...";
    document.getElementById("time").innerText = 25;
    setWorkCountdown = setInterval(workCountdown, 60000);
}
function startBreakTimer() {
    setBreakCountdown = setInterval(breakCountdown, 60000);
}
function breakCountdown() {
    while(breakInterval > 0) {
        document.getElementById("time").innerText = breakInterval;
        breakInterval--;
        return breakInterval;
    }
    document.getElementById("time").innerText = 0;
    workAlert.play();
    clearInterval(setBreakCountdown);
    if (breakCount > 3) {
        breakInterval = 14;
        console.log(`Time reset to ${breakInterval}`);
        return breakInterval;
    } else {
        breakInterval = 4;
        console.log(`Time reset to ${breakInterval}`);
        return breakInterval;
    }
}



//about
function aboutSetup() {
    let titleContainer = document.getElementById("title-ctn");
    titleContainer.lastElementChild.remove();
    let menuContainer = document.getElementById("menu-ctn");
    menuContainer.remove();
    let promptContainer = document.createElement("div");
    mainContainer.append(promptContainer);
    promptContainer.id = "prompt-ctn";
    promptContainer.innerHTML = `
    <div class="input-inline">
        <img src="./content/clock.svg" class="mini-icon" alt="tomato">
    </div>
    <p class="about-txt">
    <ul>
        <li style="font-weight: bold;" class="about-txt">How to use it?</li>
        <p class="about-txt">Use the 'Start work' and 'Take break' button to activate timers that will alert you when it's time to move on to the next task. Try to reach the recommended number of breaks and keep track of how many tomatoes it takes to get the job done.</p>
        <br>
        <li style="font-weight: bold;" class="about-txt">What is it about?</li>
        <p class="about-txt">Tomo Break is inspired by Francesco Cirillo's Pomodoro Technique. Find out more <a href="https://francescocirillo.com" target="_blank">here</a>.</p>
    </ul>
    `;
    let buttonContainer = document.createElement("div");
    mainContainer.appendChild(buttonContainer);
    buttonContainer.id = "btn-ctn";
    let backToMenu = document.createElement("button");
    buttonContainer.appendChild(backToMenu);
    backToMenu.classList.add("btn");
    backToMenu.innerText = "Back to menu";
    backToMenu.addEventListener("click", drawIndex);
}