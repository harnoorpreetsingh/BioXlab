export const getUserInitials = (user_name: string) => {
  if (!user_name) return "";

  if (user_name) {
    return user_name
      .split(" ")
      .map((name: string) => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  }
};
