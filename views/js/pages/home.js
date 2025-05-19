export default {
    rendered: false,
    workoutList: document.getElementById("workoutList"),

    render: function(newWorkout){
        if(!this.rendered){
            this.getWorkouts();
            this.buttons();
            this.rendered = true;
        }

        if(newWorkout) this.addWorkout(newWorkout);
    },

    buttons: function(){
        document.getElementById("homeLogout").addEventListener("click", ()=>{
            fetch("/user/logout")
                .then(r=>r.json())
                .then((response)=>{
                    if(response.error){
                        notify("error", response.error.message);
                    }else{
                        localStorage.removeItem("loggedIn");
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
        while(this.workoutList.children.length > 0){
            this.workoutList.removeChild(this.workoutList.firstChild);
        }

        for(let i = 0; i < workouts.length; i++){
            this.addWorkout(workouts[i]);
        }
    },

    addWorkout: function(workout){
        const button = document.createElement("button");
        button.classList.add("button");
        button.textContent = workout.name;
        button.addEventListener("click", ()=>{
            changePage("workoutMenu", workout);
        });
        this.workoutList.appendChild(button);
    }
}
