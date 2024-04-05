document.addEventListener("DOMContentLoaded" , function(){

const initialTable = document.querySelector("table").innerHTML;

document.getElementById("engineeringheading").onclick = EngineeringHeading;
document.getElementById("scienceheading").onclick = ScienceHeading;
document.getElementById("idstdsheading").onclick = IdstdsHeading;

var clickedheading = "color:black; background-color: white";
var unclickedheading = "color:white; background-color: rgb(121, 45, 129)";

function EngineeringHeading() {
    document.getElementById('engineeringheading').setAttribute("style",clickedheading);
    document.getElementById('scienceheading').setAttribute("style",unclickedheading);
    document.getElementById('idstdsheading').setAttribute("style",unclickedheading);
    document.getElementById('engineering').setAttribute("style", "display: inline-block");
    document.getElementById('science').setAttribute("style", "display: none:");
    document.getElementById('idstds').setAttribute("style", "display:none");

}
function ScienceHeading() {
    document.getElementById('engineeringheading').setAttribute("style",unclickedheading);
    document.getElementById('scienceheading').setAttribute("style",clickedheading);
    document.getElementById('idstdsheading').setAttribute("style",unclickedheading);
    document.getElementById('engineering').setAttribute("style", "display: none");
    document.getElementById('science').setAttribute("style", "display: inline-block");
    document.getElementById('idstds').setAttribute("style", "display:none");
    
}
function IdstdsHeading() {
    document.getElementById('engineeringheading').setAttribute("style",unclickedheading);
    document.getElementById('scienceheading').setAttribute("style",unclickedheading);
    document.getElementById('idstdsheading').setAttribute("style",clickedheading);
    document.getElementById('engineering').setAttribute("style", "display: none");
    document.getElementById('science').setAttribute("style", "display: none:");
    document.getElementById('idstds').setAttribute("style", "display:inline-block");
}

var forms = document.querySelectorAll("form");
for (let index = 0; index < forms.length; index++) {
    forms[index].onmouseover = ChangeColor;
    forms[index].onmouseleave = ChangeColorBack;
}

function ChangeColor(){
    this.setAttribute("style","background-color: white");
}

function ChangeColorBack(){
    this.setAttribute("style","background-color: rgb(121, 45, 129)");
}


var buttonArray = document.querySelectorAll("button");
for (let index = 0; index < buttonArray.length; index++) {
    buttonArray[index].onclick = AccessButtonValue;
}
var ranksArray = Array(11);
var majorArray = Array();
var maxRank = 0;


function AccessButtonValue() {
    event.preventDefault();
    var rank = this.previousElementSibling.value.trim();
    this.parentNode.reset();
    var major = this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    let collegeID = this.parentNode.parentNode.id;
    let collegeName;
    if (Number(rank) == NaN || rank=="") {
        alert("Please enter rank of chosen major");
        return;
    }
    if (Number(rank) != Math.floor(Number(rank))){
        alert("Please enter rank of chosen major");
        return;
    }
    if(Number(rank)<1 || Number(rank)>10){
        alert("Please enter the rank of chosen between 1 and 10");
        return;
    }

    if (majorArray.indexOf(major) != -1){
        alert("You have already chosen this major");
        return;
    }
    else if (ranksArray.indexOf(rank) != -1){
        alert("You have already chosen this rank");
        return;
    }

    if (Number(rank) > maxRank){
        maxRank = rank;
    } 
    ranksArray[rank] = rank;
    majorArray.push(major);

    switch (collegeID) {
        case "engineering":
            collegeName = "College of Engineering"
            break;
        case "science":
            collegeName = "College of Science"
            break;
        case "idstds":
            collegeName = "College of Interdisciplinary Studies"
            break;
    }
    document.getElementById(rank).innerHTML = "<td>" + collegeName + "</td><td>" + major + "</td> <td>" + rank + "</td>";
    updateTable();
    switch (rank) {
        case "1":
            alertMsg = "You have chosen " + major + " as your " + rank +  "st" + " chosen major in " + collegeName + " successfully";
            break;
        case "2":
            alertMsg = "You have chosen " + major + " as your " + rank +  "nd" + " chosen major in " + collegeName + " successfully";
            break;
        case "3":
            alertMsg = "You have chosen " + major + " as your " + rank +  "rd" + " chosen major in " + collegeName + " successfully";
            break;
        default:
            alertMsg = "You have chosen " + major + " as your " + rank +  "th" + " chosen major in " + collegeName + " successfully";
            break;
    }
    alert(alertMsg);

}

var numberofmajors = 0;
var lastChangeTime;

function updateTable() {
    lastChangeTime = getCurrrentTime();
    document.getElementById("updatetime").innerHTML = "Last Change Time: " + lastChangeTime;

    numberofmajors = majorArray.length;
    document.getElementById("totmajors").innerHTML = "Total Number of Majors Applied: " + numberofmajors;
}

document.getElementById("submit").onclick = CheckTable;

function getCurrrentTime() {
    var newDate = new Date();
    date = newDate.getFullYear() + "/" + (newDate.getMonth() + 1)+ "/" + (newDate.getDate());
    hour = newDate.getHours();
    minute = newDate.getMinutes(); 
    second = newDate.getSeconds();
    if(hour < 10) {
        hour = "0" + hour
    }
    if(minute < 10) {
        minute = "0" + minute
    }
    if(second < 10) {
        second = "0" + second
    }
    time = hour + ":" + minute + ":" + second;
    return (date + " " + time)
}

function CheckTable() {
    event.preventDefault();
    document.getElementById("tableerror").innerHTML = "";
    gaps = GapCheck(ranksArray);
    if (numberofmajors == 0){
        tableMsg = "You have not chosen any major";
    }
    else if (gaps.length != 0){
        switch (gaps[0]) {
            case 1:
                tableMsg = "You have not chosen your 1st chosen major, ";
                break;
            case 2:
                tableMsg = "You have not chosen your 2nd chosen major, ";
                break;
            case 3:
            tableMsg = "You have not chosen your 3rd chosen major, ";
            break;
            default:
                tableMsg = "You have not chosen your " + gaps[0]+ "th chosen major, ";
                break;
        }
        for (let index = 1; index < gaps.length; index++) {
            switch (gaps[index]) {
                case 2:
                    tableMsg = tableMsg + "and 2nd chosen major, ";
                    break;
                case 3:
                    tableMsg = tableMsg + "and 3rd chosen major, ";
                    break;
                default:
                    tableMsg = tableMsg + "and " + gaps[index ]+ "th chosen major, ";
                    break;
            }
        }
        tableMsg = tableMsg + "you can not leave any gap between your majors";   
    }
    else{
        tableMsg = "You have successfully submitted your application at time " + getCurrrentTime();
    }
    document.getElementById("tableerror").innerHTML = tableMsg; 
}

function GapCheck(array) {
    gapArray = Array();
    for (let index = 1; index < maxRank; index++) {
        if (array[index] == undefined){
            gapArray.push(index);
        }
    }
    return gapArray;
}

document.getElementById("clear").onclick = ClearTable;

function ClearTable() {
    event.preventDefault();
    maxRank = 0;
    ranksArray = Array(11);
    majorArray = Array();
    numberofmajors = 0;
    document.querySelector("table").innerHTML = initialTable;
    document.getElementById("tableerror").innerHTML = "";
    document.getElementById("totmajors").innerHTML = "Total Number of Majors Applied: 0"
    document.getElementById("updatetime").innerHTML = "Last Change Time: " + getCurrrentTime();
}

})