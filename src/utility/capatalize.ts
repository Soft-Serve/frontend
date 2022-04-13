const capatalize = ([firstLetter, ...restOfWord]: string) =>
  [firstLetter.toUpperCase(), ...restOfWord].join("");

export { capatalize };
