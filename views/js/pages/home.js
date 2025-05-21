export default {
    rendered: false,
    workoutList: document.getElementById("workoutList"),

    render: function(update){
        if(!this.rendered){
            this.getWorkouts();
            this.buttons();
            this.rendered = true;
        }

        if(update) this.handleUpdate(update);
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

    handleUpdate: function(update){
        switch(update.type){
            case "new": this.addWorkout(update.workout); break;
            case "remove": this.removeWorkout(update.workout); break;
            case "replace": this.replaceWorkout(update.workout); break;
        }
    },

    addWorkout: function(workout){
        const button = document.createElement("button");
        button.workoutId = workout.id;
        button.classList.add("button");
        button.textContent = workout.name;
        button.addEventListener("click", ()=>{
            changePage("workoutMenu", workout);
        });
        this.workoutList.appendChild(button);
    },

    removeWorkout: function(workoutId){
        const workouts = this.workoutList.children;
        for(let i = 0; i < workouts.length; i++){
            if(workouts[i].workoutId === workoutId){
                this.workoutList.removeChild(workouts[i]);
                break;
            }
        }
    },

    replaceWorkout: function(workout){
        const workouts = this.workoutList.children;
        for(let i = 0; i < workouts.length; i++){
            if(workouts[i].workoutId === workout.id){
                this.workoutList.removeChild(workouts[i]);
                this.addWorkout(workout);
                break;
            }
        }
    }
}
