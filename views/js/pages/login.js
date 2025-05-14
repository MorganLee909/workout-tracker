export default {
    rendered: false,

    render: function(){
        document.getElementById("loginEmail").focus();

        this.checkUser();

        if(!this.rendered){
            this.buttons();
            this.createSubmit();
            this.rendered = true;
        }
    },

    buttons: function(){
        document.getElementById("loginToRegister").addEventListener("click", ()=>{
            changePage("register");
        });
    },

    createSubmit: function(){
        document.getElementById("loginForm").addEventListener("submit", (event)=>{
            event.preventDefault();
            fetch("/user/login", {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: document.getElementById("loginEmail").value,
                    pass: document.getElementById("loginPass").value
                })
            })
                .then(r=>r.json())
                .then((response)=>{
                    if(response.error){
                        notify("error", response.error.message);
                    }else{
                        changePage("home", response);
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    notify("error", "Something went wrong, try refreshing the page");
                });
        });
    },

    checkUser: function(){
        fetch("/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(!response.error){
                    changePage("home", response);
                }
            })
            .catch((err)=>{});
    }
}
