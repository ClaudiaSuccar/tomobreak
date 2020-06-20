//main elements
let mainContainer = document.getElementById("main-ctn");
let titleContainer = document.getElementById("title-ctn");
let workAlert = document.getElementById("workAlert");
let breakAlert = document.getElementById("breakAlert");
let successAlert = document.getElementById("successAlert");
let failAlert = document.getElementById("failAlert");

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
<a href="#" onclick="promptSetup()"><button class="menu-btn">Begin</button></a>
<a href="#" onclick="settingsSetup()"><button class="menu-btn">Settings</button></a>
<a href="#" onclick="aboutSetup()"><button class="menu-btn">About</button></a>
`;



//prompt
function promptSetup() {
    menuContainer.remove();
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
        if (breakCount >= recommendedBreaks * .75) {
            successAlert.play();
            promptContainer.innerHTML = `
            <p id="emoji">&#129395;</p>
            <p id="prompt" class="prompt-txt">You did it!</p>
            <p class="prompt-txt">The recommended number of breaks was either reached or come close to successfully!</p>
            <p class="prompt-txt">Continue to practice good time-management, for better mental hygiene and increased focus.</p>
            `;

        } else {
            failAlert.play();
            promptContainer.innerHTML = `
            <p id="emoji">&#129301;</p>
            <p id="prompt" class="prompt-txt">Try again next time!</p>
            <p id="prompt" class="prompt-txt">You were unable to come close to the recommended number of breaks. Try again for better health and productivity.</p>
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
function setIcon() { //if you want to access iconSettings.value, do not assign it to variable 
    if (iconSettings.value === 'tomato') {
        icon.src = '../content/tomato.svg';
        icon.classList.add('fade-in');
        icon.classList.add('fade-in');
    } else if (iconSettings.value === 'pear') {
        icon.src = '../content/pear.svg';
        icon.classList.add('fade-in');
        icon.classList.add('fade-in');
    } else {
        icon.src = '../content/banana.svg';
        icon.classList.add('fade-in');
        icon.classList.add('fade-in');
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
    <button id="startTimer" onclick="startWorkTimer()" class="btn" style="box-shadow: none;">Start work</button>
    <button id="takeBreak" onclick="addItem()" class="btn-green">Take Break</button>
    <button onclick="clearCollection()" class="btn" style="box-shadow: none;">Clear</button>
    <button id="endButton" class="btn-red">End</button>
    `;
    document.getElementById("endButton").addEventListener("click", changeProgress);
    let collectionContainer = document.createElement("div");
    mainContainer.appendChild(collectionContainer);
    collectionContainer.id = "collection-ctn";
}
function clearCollection() {
    if(confirm("Are you sure?") === true) {
        breakCount = 0;
        document.getElementById("numOfBreaks").innerText = `Number of breaks: ${breakCount} / ${recommendedBreaks}`
        document.getElementById("collection-ctn").innerHTML = '';

    }
}
function addItem() {
    document.getElementById("status").style = "color: rgb(168, 255, 81);";
    document.getElementById("status").innerText = "ON BREAK...";
    let item = document.createElement("img");
    item.src = "./content/tomato.svg";
    item.alt = "itemName";
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