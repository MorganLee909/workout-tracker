export default {
    rendered: false,

    render: function(){
        if(!this.rendered){
            this.buttons();
            this.rendered = true;
        }
    },

    buttons: function(){
        document.getElementById("homeLogout").addEventListener("click", ()=>{
            fetch("/user/logout")
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
        })
    }
}
