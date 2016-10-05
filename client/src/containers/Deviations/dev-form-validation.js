export function devFormIsValid(deviation) {
	let formIsValid = true;
    let errors = {}; //Clears any previous errors

    if (deviation.dvMatNo) {
        if (deviation.dvMatNo.length < 5) {
        errors.dvMatNo = "Marterial number must be greater than 5 characters!";
        formIsValid = false;
        }
    } else {
        errors.dvMatNo = "Marterial number cannot be empty!";
        formIsValid = false;
    }

    if (deviation.dvMatName) {
        if (deviation.dvMatName.length < 10) {
        errors.dvMatName = "Marterial description must be greater than 10 characters!";
        formIsValid = false;
        }
    } else {
        errors.dvMatName = "Marterial description cannot be empty!";
        formIsValid = false;
    }

    if (deviation.dvDescribe) {
        if (deviation.dvDescribe.length < 50) {
        errors.dvDescribe = "Deviation description must be greater than 50 characters!";
        formIsValid = false;
        }
    } else {
        errors.dvDescribe = "Deviation description cannot be empty!";
        formIsValid = false;
    }     

    if (deviation.dvCust) {
        if (deviation.dvCust.length < 3) {
        errors.dvCust = "Customer name must be atleast 3 characters!";
        formIsValid = false;
        }
    } else {
        errors.dvCust = "Customer name cannot be empty!";
        formIsValid = false;
    }

    if (deviation.dvSupplier) {
        if (deviation.dvSupplier.length < 3) {
        errors.dvSupplier = "Supplier name must be atleast 3 characters!";
        formIsValid = false;
        }
    } else {
        errors.dvSupplier = "Supplier name cannot be empty!";
        formIsValid = false;
    }   

    if (deviation.dvBatchNo) {
        if (deviation.dvBatchNo.length < 5) {
        errors.dvBatchNo = "Batch number must be greater than 5 characters!";
        formIsValid = false;
        }
    } else {
        errors.dvBatchNo = "Batch number cannot be empty!";
        formIsValid = false;
    }

    // if (typeof this.state.task.TKTarg == 'undefined'){
    //     this.state.errors.TKTarg = "Please enter a target date!!";
    //      formIsValid = false;
    //  }

    // if (this.state.task.TKChamp) {
    //     if (this.state.task.TKChamp.length < 7) {
    //     this.state.errors.TKChamp = "Task owner must be greater than 7 characters!";
    //     formIsValid = false;
    //     }
    // } else {
    //     this.state.errors.TKChamp = "Task owner cannot be empty!";
    //     formIsValid = false;
    // }

    return { formIsValid, errors };
}