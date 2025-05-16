export default {
    render: function(workout){
        document.getElementById("workoutMenuTitle").textContent = workout.name;
        this.buttons(workout);
    },

    buttons: function(workout){
        document.getElementById("menuStartWorkout").addEventListener("click", ()=>{
            const existingWorkout = localStorage.getItem(workout.id);
            if(existingWorkout === null){
                changePage("session", workout);
            }else{
                const container = document.getElementById("resumeWorkoutContainer");
                container.style.display = "flex";
                this.addResumeButtons(container, workout);
            }
        });

        document.getElementById("menuReturnHome").addEventListener("click", ()=>{
            changePage("home");
        });
    },

    addResumeButtons: function(container, workout){
        const finish = document.createElement("button");
        finish.classList.add("button");
        finish.textContent = "Save Previous and Start New";
        finish.addEventListener("click", ()=>{this.finish(workout)});
        container.appendChild(finish);
    },

    finish: function(workout){
        const session = JSON.parse(localStorage.getItem(workout.id));
        session.end = new Date();

        fetch("/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(session)
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    notify("success", "Workout saved");
                }
                localStorage.removeItem(workout.id);
                changePage("session", workout);
            })
            .catch((err)=>{
                notify("error", "ERROR: unable to start workout");
            });
    }
}
