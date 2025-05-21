export default {
    rendered: false,
    workout: null,

    render: function(workout){
        this.workout = workout;
        document.querySelector("#editWorkoutPage h1").textContent = workout.name;
        this.displayExercises(workout.exercises);

        if(!this.rendered){
            this.buttons();
            this.rendered = true;
        }
    },

    buttons: function(){
        document.getElementById("editWorkoutBack").addEventListener("click", ()=>{changePage("home")});
        document.getElementById("editWorkoutAddExercise").addEventListener("click", ()=>{
            const container = document.getElementById("newExerciseContainer");
            container.style.display = "flex";
            container.querySelector("input").focus();
        });
        document.getElementById("newExerciseSubmit").addEventListener("click", this.addExercise.bind(this));
        document.getElementById("editWorkoutSubmit").addEventListener("click", this.submitWorkout.bind(this));
    },

    displayExercises: function(exercises){
        const container = document.getElementById("editWorkoutExercises");
        const template = document.getElementById("editWorkoutExercise").content.children[0];

        while(container.children.length > 0){
            container.removeChild(container.firstChild);
        }

        for(let i = 0; i < exercises.length; i++){
            const exercise = template.cloneNode(true);
            exercise.setAttribute("data-id", exercises[i]._id);
            exercise.querySelector("p").textContent = exercises[i].name;
            exercise.querySelector(".editWorkoutDelete").addEventListener("click", ()=>{
                container.removeChild(exercise);
            });
            exercise.querySelector(".workoutMoveUp").addEventListener("click", (e)=>{
                this.moveExercise(e.target.parentElement.parentElement, true);
            });
            exercise.querySelector(".workoutMoveDown").addEventListener("click", (e)=>{
                this.moveExercise(e.target.parentElement.parentElement, false);
            });
            container.appendChild(exercise);
        }
    },

    moveExercise: function(elem, moveUp){
        const otherElem = moveUp ? elem.previousElementSibling : elem.nextElementSibling;

        if(moveUp){
            elem.parentElement.insertBefore(elem, otherElem);
        }else{
            elem.parentElement.insertBefore(otherElem, elem);
        }
    },

    addExercise: function(){
        const container = document.getElementById("editWorkoutExercises");
        const template = document.getElementById("editWorkoutExercise").content.children[0];
        const input = document.getElementById("newExerciseInput");

        if(input.value === ""){
            notify("error", "Exercise must have a name");
            return;
        }

        const exercise = template.cloneNode(true);
        exercise.querySelector("p").textContent = input.value;
        exercise.querySelector(".editWorkoutDelete").addEventListener("click", ()=>{
            container.removeChild(exercise);
        });
        exercise.querySelector(".workoutMoveUp").addEventListener("click", (e)=>{
            this.moveExercise(e.target.parentElement.parentElement, true);
        });
        exercise.querySelector(".workoutMoveDown").addEventListener("click", (e)=>{
            this.moveExercise(e.target.parentElement.parentElement, true);
        });
        container.appendChild(exercise);

        input.value = "";
        document.getElementById("newExerciseContainer").style.display = "none";
    },

    submitWorkout: function(){
        const container = document.getElementById("editWorkoutExercises");

        const existingExercises = [];
        for(let i = 0; i < container.children.length; i++){
            const item = container.children[i];
            const exerciseId = item.getAttribute("data-id");
            if(exerciseId){
                existingExercises.push({id: exerciseId});
            }else{
                existingExercises.push({
                    new: item.querySelector("p").textContent,
                    type: "weights"
                });
            }
        }

        fetch(`/workout/${this.workout.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({existingExercises: existingExercises})
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    notify("success", "Workout updated");
                    changePage("home", {
                        type: "replace",
                        workout: response
                    });
                }
            })
            .catch((err)=>{
                notify("error", "ERROR: unable to save workout");
            });
    }
}
