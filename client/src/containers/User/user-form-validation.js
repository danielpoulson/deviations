export function userFormIsValid(user) {
  let formIsValid = true;
  let errors = {}; //Clears any previous errors

  if (!user.username) {
    errors.username = 'This field is required';
    formIsValid = false;
  } else if (user.username.length < 5) {
    errors.username = 'Must more than 6 characters';
    formIsValid = false;
  }

  if (!user.fullname) {
    errors.fullname = 'This field is required';
    formIsValid = false;
  } else if (user.fullname.length < 8) {
    errors.fullname = 'Must more than 8 characters';
    formIsValid = false;
  }

  if (!user.email) {
    errors.email = 'This field is required';
    formIsValid = false;
  } else if (user.email.length < 8) {
    errors.email = 'Must more than 8 characters';
    formIsValid = false;
  }

  return { formIsValid, errors };
}