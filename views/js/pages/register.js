export default {
    rendered: false,

    render: function(){
        if(!this.rendered){
            this.createSubmit();
            this.rendered = true;
        }
    },

    createSubmit: function(){
        document.getElementById("registerForm").addEventListener("submit", (event)=>{
            event.preventDefault();
            console.log("submitting");
        });
    }
}
