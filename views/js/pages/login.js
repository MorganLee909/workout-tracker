export default {
    rendered: false,

    render: function(){
        if(!this.rendered){
            this.buttons();
            this.rendered = true;
        }
    },

    buttons: function(){
        document.getElementById("loginToRegister").addEventListener("click", ()=>{
            changePage("register");
        });
    }
}
