const isLengthValid = (email: string) => !!email;
const isEmailAtValid = (email: string) => email.includes("@");
const isEmailDotValid = (email: string) => email.includes(".");

const basicEmailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const isEmailRegexValid = (email: string, regex: RegExp) => regex.test(email);

const isBasicEmailRegexValid = (email: string) => basicEmailRegex.test(email);

const isBasicEmailValid = (email: string) => {
  return isLengthValid(email) && isEmailAtValid(email);
};

const isEmailValid = (email: string, regex = basicEmailRegex) => {
  return isBasicEmailValid(email) && isEmailDotValid(email) && isEmailRegexValid(email, regex);
};

export {
  isBasicEmailValid,
  isEmailValid,
  isLengthValid,
  isEmailAtValid,
  isEmailDotValid,
  isEmailRegexValid,
  isBasicEmailRegexValid,
};
