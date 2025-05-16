export default {
    rendered: false,
    workout: null,
    pastSessions: null,
    exerciseIndex: 0,
    currentSession: null,

    render: async function(workout){
        this.workout = workout;
        this.pastSessions = await this.getPastSessions(workout.id);
        this.currentSession = this.createNewSession(workout);

        this.buttons();
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
        const nextSessionBtn = document.getElementById("nextSessionBtn");
        nextSessionBtn.style.display = "block";

        if(!this.rendered){
            nextSessionBtn.addEventListener("click", ()=>{this.changeExercise(1)});
            document.getElementById("finishSessionBtn").addEventListener("click", ()=>{this.finish()});
            document.getElementById("sessionAddSet").addEventListener("click", ()=>{this.addSet()});
            this.rendered = true;
        }
    },

    addSet: function(){
        const exercise = this.currentSession.exercises[this.exerciseIndex];
        const template = document.getElementById("weightSet").content.children[0];
        const container = document.getElementById("sessionSets");

        switch(exercise.type){
            case "weights":
                const newSet = {weight: 0, reps: 0};
                const setNumber = container.children.length + 1;
                exercise.sets.push(newSet);
                container.appendChild(this.createWeightSetElement(template, newSet, setNumber));
                break;
        }
    },

    createNewSession: function(workout){
        session = {
            workout: workout.id,
            start: new Date(),
            notes: "",
            exercises: []
        };

        localStorage.setItem(workout.id, JSON.stringify(session));
        return session;
    },

    changeExercise: function(num){
        if(num !== 0) localStorage.setItem(this.workout.id, JSON.stringify(this.currentSession));
        this.exerciseIndex += num;
        if(this.exerciseIndex === this.workout.exercises.length-1){
            document.getElementById("nextSessionBtn").style.display = "none";
        }
        let exercise = null;
        if(this.currentSession.exercises[this.exerciseIndex]){
            exercise = this.currentSession.exercises[this.exerciseIndex];
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
            case "weights": this.displayWeightSets(exercise.sets, setsContainer);
        }
    },

    displayWeightSets: function(sets, container){
        const template = document.getElementById("weightSet").content.children[0];

        for(let i = 0; i < sets.length; i++){
            container.appendChild(this.createWeightSetElement(template, sets[i], i+1));
        }
    },

    createWeightSetElement: function(template, set, num){
        const setElem = template.cloneNode(true);
        setElem.querySelector("h3").textContent = `Set #${num}`;

        const deleteBtn = setElem.querySelector(".weightSetDelete");
        deleteBtn.addEventListener("click", (event)=>{
            this.deleteSet(num, event.target.parentElement);
        });

        const weightInput = setElem.querySelector(".weightSetWeight");
        if(set.weight > 0) weightInput.value = set.weight;
        weightInput.addEventListener("input", ()=>{set.weight = weightInput.value});

        const repInput = setElem.querySelector(".weightSetReps");
        if(set.reps > 0) repInput.value = set.reps;
        repInput.addEventListener("input", ()=>{set.reps = repInput.value});

        return setElem;
    },

    deleteSet: function(num, setElem){
        this.currentSession.exercises[this.exerciseIndex].sets.splice(num-1, 1);
        const container = setElem.parentElement;
        container.removeChild(setElem);

        for(let i = 0; i < container.children.length; i++){
            container.children[i].querySelector("h3").textContent = `Set #${i+1}`;
        }
    },

    getPastSets: function(id){
        const note = document.getElementById("previousSession");

        for(let i = 0; i < this.pastSessions.length; i++){
            for(let j = 0; j < this.pastSessions[i].exercises.length; j++){
                if(this.pastSessions[i].exercises[j].exerciseId === id){
                    note.textContent = "*Data autofilled from previous workout";
                    return this.pastSessions[i].exercises[j].sets;
                }
            }
        }

        note.textContent = "*No previous workout data";
        return [{weight: 0, reps: 0}, {weight: 0, reps: 0}, {weight: 0, reps: 0}];
    },

    finish: function(){
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
                    this.workout = null;
                    this.exerciseIndex = 0;
                    this.pastSessions = null;
                    this.currentSession = null;
                    changePage("home");
                }
            })
            .catch((err)=>{
                notify("error", "ERROR: unable to save workout to database");
            });
    }
}
