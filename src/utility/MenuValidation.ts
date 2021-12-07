import { ItemSize } from "@shared";

const isNameValid = (name: string) => !!name.length;
const isPriceInvalid = (sizes: ItemSize[]) => !!sizes.filter(sizeData => !sizeData.price).length;
const isUnitValid = (sizes: ItemSize[]) => !!sizes.filter(size => size.unit.length);
const basicNameRegex = new RegExp(/^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/);
const numbersRegex = new RegExp(/^\d+$/);
const basicPriceRegex = new RegExp(/(\d+\.\d{1,2})/g);
const isNameOnlyNumbers = (name: string) => numbersRegex.test(name);
const isBasicPriceValid = (sizes: ItemSize[]) =>
  !!sizes.filter(size => basicPriceRegex.test(size.price)).length;
const isBasicNameValid = (name: string) => !!basicNameRegex.test(name);
const isNameInputValid = (name: string) => isNameValid(name) && !isNameOnlyNumbers(name);
const hasBeginningWhiteSpace = (field: string) => new RegExp(/^\s/g).test(field);

export {
  isNameValid,
  isPriceInvalid,
  isUnitValid,
  isBasicNameValid,
  isNameOnlyNumbers,
  isNameInputValid,
  isBasicPriceValid,
  hasBeginningWhiteSpace,
};
