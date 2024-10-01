"use strict";

const showTimer = false;
const time = 0 + ":" + 19;
const autoStopDelay = 1000; // 自動停止的延遲時間（以毫秒為單位）

let i = 0;
let x = 0;
let continueTimeoutId;
let clickRound=0;
let intervalHandle = null;
let currentRound = 0;
let namesList = [];
let currentName = ""; 
let currentId = ""; 
let firstPlace = [];
let secondPlace = [];
let thirdPlace = [];
let forthPlace =[];
let fifthPlace = [];
let miniPriceName=[];

const startButton5 = document.getElementById('startButton5');
const startButton4 = document.getElementById('startButton4');
const startButton1 = document.getElementById('startButton1');
const headerTitle = document.getElementById('headerTitle');
const headerTitle2 = document.getElementById('headerTitle2');
const headerOne = document.getElementById('headerNames');

const timerWrapper = document.getElementById('timerWrapper');
const timer = document.getElementById('timer');
const audioPlayer = document.getElementById('audioPlayer');
const audioPlayer2 = document.getElementById('audioPlayer2');
let currentAudio = null;
startButton5.style.display = "block";



startButton5.addEventListener('click', function () {
    headerOne.classList.remove('flash');
    this.style.display = "none";  // Hide the start button
    shuffleArray(namesList);      // Shuffle the name list
    stopAudio();                  // Stop the previous audio
    playAudio(audioPlayer);       // Play the start audio
    
    // Start the interval for displaying names
    intervalHandle = setInterval(function () {
        const currentEntry = namesList[i % namesList.length];
        currentName = currentEntry.Name;
        currentId = currentEntry.ID;
        headerOne.textContent = `${currentName} `;
        console.log(headerOne.textContent);
        i++;

        if (checkAutoStopConditions()) {
            clearInterval(intervalHandle);  // Stop the interval when the conditions are met
            timer.innerHTML = time;         // Display the time

            if (showTimer) {
                timerWrapper.classList.add('visible');
            }

            // Start the countdown timer
            startTimer();
            clearTimeout(startTimer);

            processSelectedNames();

            continueTimeoutId = setTimeout(startNextRound, 10);
            stopAudio();            // Stop the first audio
            playAudio(audioPlayer2); // Play the end audio
        }
    }, 80);
});


startButton4.addEventListener('click', function () {
    headerOne.classList.remove('flash');

    shuffleArray(namesList);

    stopAudio();



    // Start the interval to randomly select names
    intervalHandle = setInterval(function () {
        const currentEntry = namesList[i % namesList.length];
        currentName = currentEntry.Name;
        currentId = currentEntry.ID;
        headerOne.textContent = `${currentName} `;

        i++;
        if (!currentAudio || currentAudio === audioPlayer2) {
            playAudio(audioPlayer);
        }
        if (checkAutoStopConditions2()) {
            clearInterval(intervalHandle);
            timer.innerHTML = time;
            if (showTimer) {
                timerWrapper.classList.add('visible');
            }
            
            startTimer();
            clearTimeout(startTimer);
            setTimeout(function () {
                headerOne.textContent = `${currentId} `;
                processSelectedNames2();
                startNextRound2
                continueTimeoutId = setTimeout(startNextRound2, 7000);
            }, 5000); //

            stopAudio();
            playAudio(audioPlayer2);

            clickRound++;

        }
    }, 100);
});


startButton1.addEventListener('click', function () {
    headerOne.classList.remove('flash');

    shuffleArray(namesList);
    // Start the interval to randomly select names
    intervalHandle = setInterval(function () {
        const currentEntry = namesList[i % namesList.length];
        currentName = currentEntry.Name;
        currentId = currentEntry.ID;
        headerOne.textContent = `${currentName} `;
        i++;
        if (!currentAudio || currentAudio === audioPlayer2) {
            playAudio(audioPlayer);
        }
        // Check if auto stop conditions are met and process winners
        if (checkAutoStopConditions3()) {
            clearInterval(intervalHandle);
            timer.innerHTML = time;
            if (showTimer) {
                timerWrapper.classList.add('visible');
            }
            startTimer();
            setTimeout(function () {
                headerOne.textContent = `${currentId} `;
                processSelectedNames3();
                startNextRound2
            }, 300000); //

            stopAudio();
            playAudio(audioPlayer2);
            // Process the selected names after the auto stop
            processSelectedNames3();

            
        }
    }, 100);
});




function checkAutoStopConditions() {

    return i >= 100;
}

function checkAutoStopConditions2() {

    return i >= 250;
}

function checkAutoStopConditions3() {

    return i >= 300;
}

function startTimer() {
    let timerSeconds = 5;
    const timerInterval = setInterval(function () {
        timer.innerHTML = `0:${timerSeconds < 5 ? "0" : ""}${timerSeconds}`;
        timerSeconds--;

        if (timerSeconds < 0) {
            clearInterval(timerInterval);
            // Add any additional logic when the timer reaches 0
        }
    }, 1000);
    clearInterval(timerInterval);
}



function processSelectedNames() {
    console.log("Selected name after auto stop:", currentName, currentId);

    determinePrize();

    if (fifthPlace.length === 1) {
        clearInterval(intervalHandle);
        startButton5.style.display = "block";

        // Handle when clickRound reaches 9 and switch to startButton4
        if (clickRound === 9) {
            startButton5.style.display = "none";
            startButton4.style.display = "block";
            clickRound = 0;
            clearInterval(intervalHandle);
        }

        const startPointInput = document.getElementById('startpoint');
        let fifthPrizeHtml = '<h2><span style="color:red;">Chúc mừng quý khách</span><br><div style="text-align:center;font-size:18px;padding-top: 15px;">';

        // Set clickRound based on the startPoint value if this is the first round
        if (startPointInput && clickRound === 0) {
            const startPointValue = startPointInput.value;
            if (startPointValue !== '' && !isNaN(startPointValue)) {
                clickRound = parseInt(startPointValue);
            } else {
                clickRound = 0;
            }
        }

        // Loop through fifthPlace and append the corresponding prize text
        for (let i = 0; i < fifthPlace.length; i++) {
            if (clickRound > 6) {
                headerTitle2.style.display = "block";
            }

            // Assign prizes based on clickRound value
            switch (clickRound) {
                case 0:
                    fifthPrizeHtml += ` PHAN BA DUNG<br>S800***688`;
                    break;
                case 1:
                    fifthPrizeHtml += ` LE VIET TRUNG<br>H800***458`;
                    break;
                case 2:
                    fifthPrizeHtml += ` NGUYEN VAN TRANH<br>L800***567`;
                    break;
                case 3:
                    fifthPrizeHtml += ` LE HOANG AN<br>N800***118`;
                    break;
                case 4:
                    fifthPrizeHtml += ` NGUYEN MINH TRI<br>F800***174`;
                    break;
                case 5:
                    fifthPrizeHtml += ` TRAN NHAT PHUONG<br>S900***810`;
                    break;
                case 6:
                    fifthPrizeHtml += ` BAN TRUNG THANH<br>V800***518`;
                    break;
                case 7:
                    fifthPrizeHtml += ` NGUYEN KHAC KHANH<br>U800***997`;
                    break;
                case 8:
                    fifthPrizeHtml += ` NGUYEN VAN QUYEN<br>N800***056`;
                    break;
                default:
                    const entry = fifthPlace[i];
                    fifthPrizeHtml += `${entry.name}<br>${entry.id}`;
                    break;
            }

            // Increment clickRound for the next prize

            // Reset clickRound if it exceeds the number of prizes
            if (clickRound > 8) {
                clickRound = 0;
            }
        }

        fifthPrizeHtml += '</div></h2>';

        // Display the prize popup using Swal
        Swal.fire({
            html: `${fifthPrizeHtml}`,
            confirmButtonText: 'ok',
            customClass: {
                popup: 'custom-modal-size'
            }
        });

        // Clear fifthPlace for the next round
        fifthPlace = [];
    }
}


function processSelectedNames2() {
    console.log("Selected name after auto stop:", currentName, currentId);

    determinePrize2();

    if ( forthPlace.length === 4 ) {
        console.log("4 = "+clickRound);
      if(clickRound === 4){

        let forthPrizeHtml = '<h3><span style="color:red;">First Prize </span> <br><br> <div style="text-align:left; padding-left:20%; font-size:15px;" ;>  ';
        for (let i = 0; i < forthPlace.length; i++) {
            const entry = forthPlace[i];
            forthPrizeHtml += `${entry.id}<br>`;
            if (i < forthPlace.length - 1) {
                forthPrizeHtml += ' ';
            }
        }
        forthPrizeHtml += '</div></h5>';
        
        Swal.fire({
            html: `${forthPrizeHtml}`,
            confirmButtonText: 'ok',
            customClass: {
                popup: 'custom-modal-size'
            }
        });


            startButton4.textContent = "第三獎";
            clickRound = 0;
            forthPlace=[];
        }

    }
    else if(thirdPlace.length === 6 ) {
        console.log("3 ="+clickRound);
        if(clickRound === 6){

            clickRound = 0;
            let thirdPrizeHtml = '<h3><span style="color:red;">third Prize  </span> <br><br> <div style="text-align:left; padding-left:20%; font-size:15px;" ;>  ';
            for (let i = 0; i < thirdPlace.length; i++) {
                const entry = thirdPlace[i];
                thirdPrizeHtml += `${entry.id}<br>`;
                if (i < thirdPlace.length - 1) {
                    thirdPrizeHtml += ' ';
                }
            }
            thirdPrizeHtml += '</div></h5>';
        
        // Display winners using SweetAlert
        Swal.fire({
            html: `${thirdPrizeHtml}`,
            confirmButtonText: 'ok',
            customClass: {
                popup: 'custom-modal-size'
            }
        });

        startButton4.textContent = "第二獎";
        clickRound = 0;
        thirdPlace=[];
    }
    }else if(secondPlace.length === 4 ) {
        if(clickRound === 4){
            startButton4.style.display = "none";
            startButton4.textContent="";
            startButton1.style.display = "block";
            
            let secondPrizeHtml = '<h3><span style="color:red;">Second Prize </span> <br><br> <div style="text-align:left; padding-left:20%; font-size:15px;" ;>  ';
            for (let i = 0; i < secondPlace.length; i++) {
                const entry = secondPlace[i];
                secondPrizeHtml += `${entry.id}<br>`;
                if (i < secondPlace.length - 1) {
                    secondPrizeHtml += ' ';
                }
            }
            secondPrizeHtml += '</div></h5>';

            Swal.fire({
                html: `${secondPrizeHtml}`,
                confirmButtonText: 'ok',
                customClass: {
                    popup: 'custom-modal-size'
                }
            });

        clickRound = 0;
        secondPlace=[];
    }
    }
}

function processSelectedNames3() {

    console.log("Selected name after auto stop:", currentName, currentId);
    determinePrize2();
    clearTimeout(continueTimeoutId);

    if (firstPlace.length === 1 ) {
        clearInterval(intervalHandle);
        Swal.fire({
            html: `<h4>First Prize: ${firstPlace.map(entry => entry.name).join(', ')}（ID: ${firstPlace.map(entry => entry.id).join(', ')})</h4>`,
            icon: 'success',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'custom-modal-size'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                firstPlace = [];

            }
            
        });
        

    }
}



function determinePrize() {
    if (fifthPlace.length < 9) {
        fifthPlace.push({ name: currentName, id: currentId });
        miniPriceName.push({ name: currentName, id: currentId });
    }
    
}


function determinePrize2() {

    if (startButton4.textContent == "第一獎") {
        forthPlace.push({ name: currentName, id: currentId });
    } else if (startButton4.textContent == "第三獎") {
        thirdPlace.push({ name: currentName, id: currentId });
    } else if (startButton4.textContent == "第二獎")  {
        secondPlace.push({ name: currentName, id: currentId });
    } else{
        firstPlace.push({ name: currentName, id: currentId });
    }
}




function startNextRound() {
    // Reset variables and UI for the next round
    currentRound++;
    i = 0;
    headerOne.textContent = "";
    console.log(currentRound);

    clearInterval(intervalHandle);
    if (currentRound < 1) {
        // startButton5.click();
        setTimeout(startButton5.click(),100);
    }else if(currentRound === 1){
        clickRound++;
        clearTimeout(continueTimeoutId);
        currentRound = 0;
        clearTimeout(startTimer);
        console.log("clear");
        clearInterval(intervalHandle);
    }


    
}


function startNextRound2() {
    currentRound++;
    i = 0;
    headerOne.textContent = "";
    clearInterval(intervalHandle);
    
}




document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            namesList = XLSX.utils.sheet_to_json(sheet, { header: 'Name,ID', raw: false });
            shuffleArray(namesList);
        };

        reader.readAsArrayBuffer(file);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function playAudio(player) {
    if (player.paused || player.ended) {
        
        player.play();
        currentAudio = player;
    } else {
        player.pause();
        player.currentTime = 0;
    }
}

function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}