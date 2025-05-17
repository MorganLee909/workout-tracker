import registerPage from "./js/pages/register.js";
import loginPage from "./js/pages/login.js";
import homePage from "./js/pages/home.js";
import workoutMenuPage from "./js/pages/workoutMenu.js";
import newWorkoutPage from "./js/pages/newWorkout.js";
import sessionPage from "./js/pages/session.js";
import editWorkoutPage from "./js/pages/editWorkout.js";

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
        case "editWorkout": editWorkoutPage.render(data); break;
    }
}

if("serviceWorker" in navigator){
    window.addEventListener("load", ()=>{
        navigator.serviceWorker.register("/serviceWorker.js")
            .then(reg => null)
            .catch(err => null);
    });
}

let deferredPrompt;
const installBtn = document.getElementById("installPwa");
let isPwaInstalled = ()=>{
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

if(isPwaInstalled()){
    installBtn.style.display = "none";
}

window.addEventListener("beforeinstallprompt", (e)=>{
    e.preventDefault();
    deferredPrompt = e;
});

installBtn.addEventListener("click", async ()=>{
    if(deferredPrompt){
        deferredPrompt.prompt();
        const {outcome} = await deferredPrompt.userChoice;
        deferredPrompt = null;
        console.log(outcome); //accepted
        if(outcome === "accepted") installBtn.style.display = "none";
    }
});
