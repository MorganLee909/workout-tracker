export default {
    workout: null,
    exerciseIndex: 0,
    pastSessions: null,
    previousExercise: null,

    render: async function(workout){
        this.workout = workout;
        this.pastSessions = await this.getPastSessions(workout.id);
        this.switchExercise(0);
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

    switchExercise: function(num){
        this.exerciseIndex += num;
        this.previousExercise = this.findPreviousExercise();
        this.renderPreviousSessionData();
        this.renderExercise();
    },

    findPreviousExercise: function(){
        for(let i = 0; i < this.pastSessions.length; i++){
            for(let j = 0; j < this.pastSessions[i].exercises.length; j++){
                const exercise = this.pastSessions[i].exercises[j];
                if(exercise.exerciseId === this.workout.exercises[this.exerciseIndex]){
                    return exercise;
                }
            }
        }
        return null;
    },

    renderExercise: function(){
        const container = document.getElementById("sessionSets");
        const weightTemplate = document.getElementById("weightSet").content.children[0];
        let setCount = 0;

        const title = document.createElement("h1");
        title.textContent = this.workout.exercises[this.exerciseIndex].name;
        container.appendChild(title);

        if(this.previousExercise){
            setCount = this.previousExercise.sets.length;
        }else{
            setCount = 3;
        }
        for(let i = 0; i < setCount; i++){
            const weightSet = weightTemplate.cloneNode(true);
            weightSet.querySelector("h3").textContent = `Set #${i+1}`;
            if(this.previousExercise){
                weightSet.querySelector(".weightSetWeight").value = this.previousExercise.sets[i].weight;
            }
            weightSet.querySelector(".weightSetWeight").addEventListener("change", this.update.bind(this));
            container.appendChild(weightSet);
        }
    },

    renderPreviousSessionData: function(){
        const container = document.getElementById("previousSession");

        if(!this.previousExercise){
            const p = document.createElement("p");
            p.id = "noSessionText";
            p.textContent = "No previous workout data to display";
            container.appendChild(p);
        }else{
            console.log("not implemented");
        }
    },

    update: function(){
        console.log("something");
    }
}
