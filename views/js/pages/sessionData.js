export default {
    rendered: false,

    render: function({session, workout}){
        if(!this.rendered){
            this.buttons();
            this.rendered = true;
        }
        const start = new Date(session.start);
        const end = new Date(session.start);
        
        document.querySelector("#sessionDataPage h1").textContent = workout.name;
        document.getElementById("sessionDataStart").textContent = `Start: ${this.formatDateTime(start)}`;
        document.getElementById("sessionDataEnd").textContent = `End: ${this.formatDateTime(start)}`;
        document.getElementById("sessionDataLength").textContent = `${this.timeDifference(start, end)}`;
        this.displayExercises(session.exercises);
    },

    buttons: function(workout){
        document.getElementById("closeSessionData").addEventListener("click", ()=>{
            changePage("sessionHistory");
        });
    },

    displayExercises: function(exercises){
        const container = document.getElementById("sessionDataExercises");

        for(let i = 0; i < exercises.length; i++){
            let exerciseElem;
            switch(exercises[i].type){
                case "weights":
                    exerciseElem = this.createWeightsElem(exercises[i]);
                    break;
            }

            container.appendChild(exerciseElem);
        }
    },

    createWeightsElem: function(exercise){
        const exerciseElem = document.createElement("div");

        const exerciseName = document.createElement("h3");
        exerciseName.textContent = exercise.name;
        exerciseElem.appendChild(exerciseName);
        
        for(let i = 0; i < exercise.sets.length; i++){
            const set = document.createElement("p");
            set.textContent = `${exercise.sets[i].weight} x ${exercise.sets[i].reps} reps`;
            exerciseElem.appendChild(set);
        }

        return exerciseElem;
    },

    formatDateTime: function(date){
        const d = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        const t = date.toLocaleTimeString("en-US", {hour12: false});
        return `${d} ${t}`;
    },

    timeDifference: function(start, end){
        const diff = end - start;
        const minutes = Math.floor(diff/ 60000);

        return `${Math.floor(minutes / 60)} hours, ${minutes % 60} minutes`;
    }
}
