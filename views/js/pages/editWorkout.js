export default {
    rendered: false,

    render: function(workout){
        document.querySelector("#editWorkoutPage h1").textContent = workout.name;
        this.displayExercises(workout.exercises);

        if(!this.rendered){
            this.buttons();
            this.rendered = true;
        }
    },

    buttons: function(){
        document.getElementById("editWorkoutBack").addEventListener("click", ()=>{changePage("home")});
    },

    displayExercises: function(exercises){
        const container = document.getElementById("editWorkoutExercises");
        const template = document.getElementById("editWorkoutExercise").content.children[0];

        for(let i = 0; i < exercises.length; i++){
            const exercise = template.cloneNode(true);
            exercise.querySelector("p").textContent = exercises[i].name;
            container.appendChild(exercise);
        }
    }
}
