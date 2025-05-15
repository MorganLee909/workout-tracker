export default {
    rendered: false,

    render: function(){
        if(!this.rendered){
            this.getWorkouts();
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
        });

        document.getElementById("homeNewWorkout").addEventListener("click", ()=>{
            changePage("newWorkout");
        });
    },

    getWorkouts: function(){
        fetch("/workout", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    this.renderWorkouts(response);
                }
            })
            .catch((err)=>{
                notify("error", "ERROR: Unable to retrieve workouts");
            });
    },

    renderWorkouts: function(workouts){
        const workoutList = document.getElementById("workoutList");
        while(workoutList.children.length > 0){
            workoutList.removeChild(workoutList.firstChild);
        }

        for(let i = 0; i < workouts.length; i++){
            const button = document.createElement("button");
            button.classList.add("button");
            button.textContent = workouts[i].name;
            button.addEventListener("click", ()=>{
                changePage("workout", workouts[i]);
            });
            workoutList.appendChild(button);
        }
    }
}
