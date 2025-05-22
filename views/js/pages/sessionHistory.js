export default {
    rendered: false,
    workout: null,

    render: function(workout){
        if(workout){
            this.workout = workout;
            this.populateSessions(workout);
            document.getElementById("sessionHistoryTitle").textContent = workout.name;
        }

        if(!this.rendered){
            this.buttons(workout);
            this.rendered = true;
        }
    },

    buttons: function(workout){
        document.getElementById("sessionHistoryClose").addEventListener("click", ()=>{
            changePage("workoutMenu", workout);
        });
    },

    populateSessions: function(workout){
        fetch(`/session/${workout.id}/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(r=>r.json())
            .then((response)=>{
                if(response.error){
                    notify("error", response.error.message);
                }else{
                    this.showSessions(response);
                }
            })
            .catch((err)=>{
                console.log(err);
                notify("error", "ERROR: unable to load your data");
            });
    },

    showSessions: function(sessions){
        const container = document.getElementById("sessionHistoryItems");

        while(container.children.length > 0){
            container.removeChild(container.firstChild);
        }

        for(let i = 0; i < sessions.length; i++){
            container.appendChild(this.createSessionButton(sessions[i]));
        }
        const button = document.createElement("button");
        button.classList.add("button");
        button.addEventListern
    },

    createSessionButton: function(session){
        const button = document.createElement("button");
        button.classList.add("button");
        button.textContent = this.dateFormat(new Date(session.start));
        button.addEventListener("click", ()=>{
            changePage("sessionData", {
                session: session,
                workout: this.workout
            });
        });
        return button;
    },

    dateFormat: function(date){
        return date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }
}
