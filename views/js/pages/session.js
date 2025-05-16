export default{
    workout: null,
    pastSessions: null,
    exerciseIndex: 0,
    currentSession: null,

    render: async function(workout){
        this.workout = workout;
        this.pastSessions = await this.getPastSessions(workout.id);
        this.buttons();
        this.createNewSession(workout);
        this.changeExercise(0);
    },

    getPastSessions: async function(id){
        const sessions = await fetch(`/session/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(sessions.error){
            notify("error", "ERROR: Unable to retrieve past workouts");
            return [];
        }

        return await sessions.json();
    },

    buttons: function(){
        document.getElementById("nextSessionBtn").addEventListener("click", ()=>{this.changeExercise(1)});
        document.getElementById("finishSessionBtn").addEventListener("click", ()=>{this.finish()});
    },

    createNewSession: function(workout){
        this.currentSession = {
            workout: workout.id,
            start: new Date(),
            notes: "",
            exercises: []
        };

        localStorage.setItem(workout.id, JSON.stringify(this.currentSession));
    },

    changeExercise: function(num){
        if(num !== 0) localStorage.setItem(this.workout.id, JSON.stringify(this.currentSession));
        this.exerciseIndex += num;
        if(this.exerciseIndex === this.workout.exercises.length-1){
            document.getElementById("nextSessionBtn").style.display = "none";
        }
        let exercise = null;
        if(this.currentSession[this.exerciseIndex]){
            exercise = currentSession[this.exerciseIndex];
        }else{
            const workoutExercise = this.workout.exercises[this.exerciseIndex];
            exercise = {
                exerciseId: workoutExercise._id,
                name: workoutExercise.name,
                type: workoutExercise.type,
                notes: "",
                sets: this.getPastSets(workoutExercise._id)
            }
            this.currentSession.exercises.push(exercise);
        }

        document.getElementById("sessionExerciseName").textContent = exercise.name;
        const setsContainer = document.getElementById("sessionSets");
        while(setsContainer.children.length > 0){
            setsContainer.removeChild(setsContainer.firstChild);
        }

        switch(exercise.type){
            case "weights": this.displayWeightSets(exercise, setsContainer);
        }
    },

    displayWeightSets: function(exercise, container){
        const weightTemplate = document.getElementById("weightSet").content.children[0];

        for(let i = 0; i < exercise.sets.length; i++){
            const set = weightTemplate.cloneNode(true);
            set.querySelector("h3").textContent = `Set #${i+1}`;

            const weightInput = set.querySelector(".weightSetWeight");
            weightInput.value = exercise.sets[i].weight
            weightInput.addEventListener("input", ()=>{exercise.sets[i].weight = weightInput.value});

            const repInput = set.querySelector(".weightSetReps");
            repInput.value = exercise.sets[i].reps;
            repInput.addEventListener("input", ()=>{exercise.sets[i].reps = repInput.value});

            container.appendChild(set);
        }
    },

    getPastSets: function(id){
        for(let i = 0; i < this.pastSessions.length; i++){
            for(let j = 0; j < this.pastSessions[i].exercises.length; j++){
                if(this.pastSessions[i].exercises[j].exerciseId === id){
                    return this.pastSessions[i].exercises[j].sets;
                }
            }
        }

        return [{weight: 0, reps: 0}, {weight: 0, reps: 0}, {weight: 0, reps: 0}];
    },

    finish: function(){
        //save to database
        //delete from localStorage

        console.log(this.currentSession);
        this.currentSession.end = new Date();
        fetch(`/session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.currentSession)
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    notify("success", "Workout completed and saved");
                    localStorage.removeItem(this.currentSession.workout);
                    changePage("home");
                }
            })
            .catch((err)=>{
                notify("error", "ERROR: unable to save workout to database");
            });
    }
}
