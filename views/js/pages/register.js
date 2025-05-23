export default {
    rendered: false,

    render: function(){
        if(!this.rendered){
            this.buttons();
            this.createSubmit();
            this.rendered = true;
        }
    },

    buttons: function(){
        document.getElementById("registerToLogin").addEventListener("click", ()=>{
            changePage("login");
        });
    },

    createSubmit: function(){
        document.getElementById("registerForm").addEventListener("submit", (event)=>{
            event.preventDefault();
            fetch("/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: document.getElementById("registerName").value,
                    email: document.getElementById("registerEmail").value,
                    pass: document.getElementById("registerPass").value,
                    confirmPass: document.getElementById("registerConfirmPass").value
                })
            })
                .then(r=>r.json())
                .then((response)=>{
                    if(response.error){
                        notify("error", response.error.message);
                    }else{
                        changePage("login");
                    }
                })
                .catch((err)=>{
                    notify("error", "Something went wrong, try refreshing the page");
                });
        });
    }
}
