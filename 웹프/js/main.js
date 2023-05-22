//버튼 열기 닫기
function dp_menu(){
    let click = document.getElementById("more_coffee");
    if(click.style.display === "none"){
        click.style.display = "block";
    }else{
        click.style.display = "none";
    }
}


// guest n < 랜덤숫자 부여
function generateRandomNumber() {
    // Check if the "guestNumber" key exists in session storage
    if (sessionStorage.getItem("guestNumber")) {
        var guestNumber = sessionStorage.getItem("guestNumber");
    } 
    else {
        var guestNumber = "guest " + Math.floor(Math.random() * 1000) + 1;
        sessionStorage.setItem("guestNumber", guestNumber);
    }
    var randomNumber = Math.floor(Math.random() * 100) + 1;
    var randomNumberElement = document.getElementById("randomNumber");
    randomNumberElement.innerHTML = guestNumber;
}
document.addEventListener("DOMContentLoaded", generateRandomNumber);