export default {
    render: function(workout){
        document.getElementById("workoutMenuTitle").textContent = workout.name;
        this.buttons(workout);
    },

    buttons: function(workout){
        const container = document.getElementById("workoutMenuButtons");
        while(container.children.length > 0){
            container.removeChild(container.firstChild);
        }

        const start = document.createElement("button");
        start.classList.add("button");
        start.textContent = "Start Workout";
        start.addEventListener("click", ()=>{
            const existingWorkout = localStorage.getItem(workout.id);
            if(existingWorkout === null){
                changePage("session", workout);
            }else{
                const container = document.getElementById("resumeWorkoutContainer");
                container.style.display = "flex";
                this.addResumeButtons(container, workout);
            }
        });
        container.appendChild(start);

        const edit = document.createElement("button");
        edit.classList.add("button");
        edit.textContent = "Edit Workout";
        edit.addEventListener("click", ()=>{changePage("editWorkout", workout)});
        container.appendChild(edit);

        const back = document.createElement("button");
        back.classList.add("button");
        back.textContent = "Back";
        back.addEventListener("click", ()=>{changePage("home")});
        container.appendChild(back);
    },

    addResumeButtons: function(container, workout){
        const buttons = container.querySelectorAll("button");
        for(let i = 0; i < buttons.length; i++){
            buttons[i].parentElement.removeChild(buttons[i]);
        }

        const finish = document.createElement("button");
        finish.classList.add("button");
        finish.textContent = "Save Previous and Start New";
        finish.addEventListener("click", ()=>{this.finish(workout)});
        container.appendChild(finish);

        const discard = document.createElement("button");
        discard.classList.add("button");
        discard.textContent = "Discard Previous and Start New";
        discard.addEventListener("click", ()=>{this.discard(workout)});
        container.appendChild(discard);

        const resume = document.createElement("button");
        resume.classList.add("button");
        resume.textContent = "Resume Previous Workout";
        resume.addEventListener("click", ()=>{this.resume(workout)});
        container.appendChild(resume);

        const cancel = document.createElement("button");
        cancel.classList.add("button");
        cancel.textContent = "Cancel";
        cancel.addEventListener("click", this.cancel);
        container.appendChild(cancel);
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
                document.getElementById("resumeWorkoutContainer").style.display = "none";
                changePage("session", workout);
            })
            .catch((err)=>{
                notify("error", "ERROR: unable to start workout");
            });
    },

    discard: function(workout){
        localStorage.removeItem(workout.id);
        document.getElementById("resumeWorkoutContainer").style.display = "none";
        changePage("session", workout);
    },

    resume: function(workout){
        document.getElementById("resumeWorkoutContainer").style.display = "none";
        changePage("session", workout);
    },

    cancel: function(){
        document.getElementById("resumeWorkoutContainer").style.display = "none";
    }
}
