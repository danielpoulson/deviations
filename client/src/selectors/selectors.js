// TODO: (4) Remove commented code
// export function usersFormattedForDropdown(users) {
//   return users.map(user => {
//     return {
//       value: user,
//       text: user
//     };
//   });
// }

export function usersFormattedForDropdown(users, user) {

  if(users.indexOf(user) === -1){
    users = users.concat(user);
  }

  return users.map(user => {
    return {
      value: user,
      text: user
    };
  });
}
