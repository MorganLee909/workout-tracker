export default {
    render: function(workout){
        document.getElementById("workoutMenuTitle").textContent = workout.name;
        this.buttons(workout);
    },

    buttons: function(workout){
        document.getElementById("menuStartWorkout").addEventListener("click", ()=>{
            changePage("session", workout);
        });

        document.getElementById("menuReturnHome").addEventListener("click", ()=>{
            changePage("home");
        });
    }
}
