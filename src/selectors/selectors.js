export function usersFormattedForDropdown(users) {
  return users.map(user => {
    return {
      value: user,
      text: user
    };
  });
}