import registerPage from "./js/pages/register.js";

const notifier = document.getElementById("notifier");

registerPage.render();

window.notify = (type, message)=>{
    notifier.className = "";
    notifier.classList.add(type);
    notifier.textContent = message;
    notifier.style.display = "flex";

    setTimeout(()=>{
        notifier.style.display = "none";
    }, 7500);
}

window.changePage = (page)=>{
    console.log("changing page");
}
