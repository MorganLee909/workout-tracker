import registerPage from "./js/pages/register.js";
import loginPage from "./js/pages/login.js";
import homePage from "./js/pages/home.js";
import workoutMenuPage from "./js/pages/workoutMenu.js";
import newWorkoutPage from "./js/pages/newWorkout.js";
import sessionPage from "./js/pages/session.js";

const notifier = document.getElementById("notifier");
const pageElements = document.querySelectorAll(".page");

loginPage.render();

window.notify = (type, message)=>{
    notifier.className = "";
    notifier.classList.add(type);
    notifier.textContent = message;
    notifier.style.display = "flex";

    setTimeout(()=>{
        notifier.style.display = "none";
    }, 7500);
}

window.changePage = (page, data)=>{
    for(let i = 0; i < pageElements.length; i++){
        pageElements[i].style.display = "none";
    }
    document.getElementById(`${page}Page`).style.display = "flex";

    switch(page){
        case "login": loginPage.render(); break;
        case "register": registerPage.render(); break;
        case "home": homePage.render(data); break;
        case "newWorkout": newWorkoutPage.render();
        case "session": sessionPage.render(data); break;
        case "workoutMenu": workoutMenuPage.render(data); break;
    }
}
