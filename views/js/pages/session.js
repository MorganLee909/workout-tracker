export default{
    workout: null,
    pastSessions: null,
    exerciseIndex: 0,
    currentSession: null,

    render: async function(workout){
        this.workout = workout;
        this.pastSessions = await this.getPastSessions(workout.id);
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
        this.exerciseIndex += num;
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

        switch(exercise.type){
            case "weights": this.displayWeightSets(exercise);
        }
    },

    displayWeightSets: function(exercise){
        const container = document.getElementById("sessionSets");
        const weightTemplate = document.getElementById("weightSet").content.children[0];

        for(let i = 0; i < exercise.sets.length; i++){
            const set = weightTemplate.cloneNode(true);
            set.querySelector("h3").textContent = `Set #${i+1}`;
            set.querySelector(".weightSetWeight").value = exercise.sets[i].weight;
            set.querySelector(".weightSetReps").value = exercise.sets[i].reps;
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
    }
}
