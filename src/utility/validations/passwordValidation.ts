const isPasswordSixChar = (password: string) => password.length > 6;
const isPasswordConfirmd = (password: string, confirmedPassword: string) =>
  password === confirmedPassword;

export { isPasswordSixChar, isPasswordConfirmd };
