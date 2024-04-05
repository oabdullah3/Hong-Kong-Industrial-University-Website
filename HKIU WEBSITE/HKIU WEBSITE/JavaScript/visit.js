function CheckInput() {
    event.preventDefault();
    date = document.getElementById("date").value;
    num = document.getElementById("numvisitors").value.trim();
    time = document.getElementById("time").value;
    number = Number(num);

    if (date=="" || num==""){
        document.querySelector('.Error').innerHTML = "Data not completed, please re-enter";
        return;
    }
    else if(number < 1 || number!= Math.floor(number) || number==NaN) {
        document.querySelector('.Error').innerHTML = "Please enter a valid number of people!";
    }
    else{
        document.querySelector('.Error').innerHTML = "";
        if (reserve(date,time,num)){
            alert("Your Reservation is Successful!");
        }
        else{
            alert("Sorry, the reservation is full!")
        }
    }
}