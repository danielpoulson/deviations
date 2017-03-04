export function usersFormattedForDropdown(users, user) {

// Performs a check to see if the Assigned to user is an active user
// if not i.e. non active user for historcial action the is temporary added
// to the list to allow the name to be displayed
// D.Poulson 04/03/2017
  if(users.indexOf(user) === -1 && typeof user !== 'undefined'){
    users = users.concat(user);
  }

  return users.map(user => {
    return {
      value: user,
      text: user
    };
  });
}
