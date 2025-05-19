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
    }
}
