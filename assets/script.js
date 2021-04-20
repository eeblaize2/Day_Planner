
let _now = moment();

// Post current day/time at top of page
let e = document.getElementById("currentDay");
e.innerHTML = _now.format('MMMM Do YYYY, h:mm:ss a');

var schedule = new Array(9).fill("");

// fill the container html
//let _start = moment(9,"HH");
let _start = 8; // sets the start-time
let _hours_to_show = 9;
let _row_time;
let _class;
let html = "";

// each row has the time, an entry area, and a save button
//for (hour of hours){
for (let i=0;i<_hours_to_show;i++) {
    
    _row_time = moment(_start + i,"HH");
    html += "<div class='grid row'>\n";
    html += `<div class= 'hour'>${_row_time.format("h A")}</div>`;

    // Sets the color for the info bar based on the current time
    if (_now < _row_time) {
        _class = "future";
    } else if (_now < moment(_start + i +1, "HH")) {
        _class = "present";
    } else {
        _class = "past";
    }
    let div_content = localStorage.getItem("div"+i);
    if (div_content === null) div_content = "";
    html += `<div id="div_${i}" class="timeblock_content ${_class}">${div_content}</div>`;
    html += `<div onclick="save_text(${i})" class='saveBtn'>SAVE BUTTON</div>`;
    html += "</div>\n"; // closes the grid container
}

e = document.getElementsByClassName("container")[0];
e.innerHTML = html;

// Use javascript to set all of the divs with class timeblock_content to editable....
let divList = document.getElementsByClassName("timeblock_content");
for (e of divList) {
    e.contentEditable = true;
}

function save_text(n) {
    let div_content = divList[n].textContent;
    let key_name = "div" + n;
    localStorage.setItem(key_name, div_content);
    alert("message saved");
}

