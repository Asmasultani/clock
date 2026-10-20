const selectmenu = document.querySelectorAll("select");
const timebox = document.querySelector(".time");
const setalarmbtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmtime = "";
let alarmstate = "noset";

const ringtone = new Audio("./files/ringtone.mp3");

// Create hours
for (let i = 23; i >= 0; i--) {
    let hour = i < 10 ? "0" + i : i;

    let option = `<option value="${hour}">${hour}</option>`;

    selectmenu[0].firstElementChild.insertAdjacentHTML(
        "afterend",
        option
    );
}

// Create minutes
for (let i = 59; i >= 0; i--) {
    let minute = i < 10 ? "0" + i : i;

    let option = `<option value="${minute}">${minute}</option>`;

    selectmenu[1].firstElementChild.insertAdjacentHTML(
        "afterend",
        option
    );
}


// Clock
setInterval(() => {
    const date = new Date();

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    timebox.innerHTML = `${h}:${m}:${s}`;


    // Check alarm
    if (alarmtime === `${h}:${m}` && alarmstate === "set") {
        ringtone.play();
        ringtone.loop = true;
    }

}, 1000);


// Alarm button
setalarmbtn.addEventListener("click", () => {

    if (alarmstate === "noset") {

        alarmtime = `${selectmenu[0].value}:${selectmenu[1].value}`;

        if (
            alarmtime.includes("Hour") ||
            alarmtime.includes("Minute")
        ) {
            alert("Please set the alarm time correctly!");
            return;
        }

        alarmstate = "set";

        setalarmbtn.innerHTML = "Clear Alarm";

        content.classList.add("disable");

    } else {

        // Clear alarm
        alarmtime = "";

        alarmstate = "noset";

        ringtone.pause();
        ringtone.currentTime = 0;
        ringtone.loop = false;

        setalarmbtn.innerHTML = "Set Alarm";

        content.classList.remove("disable");
    }

});
