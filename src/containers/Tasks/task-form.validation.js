export function taskFormIsValid(task) {
	let formIsValid = true;
    let errors = {}; //Clears any previous errors

    if (task.TKName) {
        if (task.TKName.length < 10) {
        errors.TKName = "Task description must be greater than 10 characters!";
        formIsValid = false;
        }
    } else {
        errors.TKName = "Task description cannot be empty!";
        formIsValid = false;
    }

    if (typeof task.TKTarg == 'undefined'){
        errors.TKTarg = "Please enter a target date!!";
         formIsValid = false;
     }

    if (task.TKChamp) {
        if (task.TKChamp.length < 7) {
        errors.TKChamp = "Task owner must be greater than 7 characters!";
        formIsValid = false;
        }
    } else {
        errors.TKChamp = "Task owner cannot be empty!";
        formIsValid = false;
    }

	return { formIsValid, errors };
}