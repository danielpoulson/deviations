//SYNC 11/03/2017 DP
export function taskFormIsValid(task) {
	let formIsValid = true;
    let errors = []; //Clears any previous errors
    let errorsObj = {}; //Clears any previous errors

    if (task.TKName) {
        if (task.TKName.length < 10) {
					errors.push("Task Name - Must be greater than 10 characters.");
					errorsObj.TKName = true;
					formIsValid = false;
        }
    } else {
        errorsObj.TKName = true;
				errors.push("Task Name - This field is required and should be greater than 10 characters.");
        formIsValid = false;
    }

		if (!task.TKStart) {
			errors.push('Start Date - A Start Date must be set');
			errorsObj.TKStart = true;
			formIsValid = false;
		} else if (task.TKStart === null) {
			errors.push('Start Date - A Start Date must be set');
			errorsObj.TKStart = true;
			formIsValid = false;
		}

		if (!task.TKTarg) {
			errors.push('Target Date - A Target Date must be set');
			errorsObj.TKTarg = true;
			formIsValid = false;
		} else if (task.TKTarg === null) {
			errors.push('Target Date - A Target Date must be set');
			errorsObj.TKTarg = true;
			formIsValid = false;
		}

		if (!task.TKStat) {
			errors.push('Status - Please select a task status');
			errorsObj.TKStat = true;
			formIsValid = false;
		}

		if (!task.TKChamp) {
			errors.push('Owner - Please select a task owner');
			errorsObj.TKChamp = true;
			formIsValid = false;
		}

	return { formIsValid, errors, errorsObj };
}
