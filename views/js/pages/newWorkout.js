export default {
    rendered: false,
    exerciseInputs: [],
    inputsDiv: document.getElementById("newWorkoutInputs"),
    
    render: function(){
        document.getElementById("newWorkoutName").focus();

        if(!this.rendered){
            this.buttons();
            this.addExerciseInput();
            this.rendered = true;
        }
    },

    buttons: function(){
        document.getElementById("newWorkoutBack").addEventListener("click", ()=>{
            changePage("home");
        });

        document.getElementById("newWorkoutFinish").addEventListener("click", this.createWorkout.bind(this));
    },

    addExerciseInput: function(){
        const label = document.createElement("label");
        this.inputsDiv.appendChild(label);

        const p = document.createElement("p");
        p.textContent = `Exercise # ${this.exerciseInputs.length+1}`;
        label.appendChild(p);

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Exercise Name";
        input.addEventListener("keyup", this.checkInputs.bind(this));
        label.appendChild(input);

        this.exerciseInputs.push(input);
    },

    checkInputs: function(){
        let emptyInputs = false;
        for(let i = 0; i < this.exerciseInputs.length; i++){
            if(this.exerciseInputs[i].value === "") emptyInputs = true;
        }

        if(!emptyInputs){
            this.addExerciseInput();
        }
    },

    createWorkout: function(){
        const name = document.getElementById("newWorkoutName").value;
        const exercises = []
        for(let i = 0; i < this.exerciseInputs.length; i++){
            if(this.exerciseInputs[i].value === "") continue;
            exercises.push({
                name: this.exerciseInputs[i].value,
                type: "weights"
            });
        }

        if(exercises.length === 0){
            notify("error", "Workout must contain at least one exercise");
            return;
        }

        fetch("/workout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById("newWorkoutName").value,
                exercises: exercises
            })
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    notify("success", "New workout created");
                    changePage("home", response);
                }
            })
            .catch((err)=>{
                notify("error", "ERROR: unable to create workout");
            })
    }
}
