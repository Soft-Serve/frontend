interface TypeItemID {
  id: number;
}

interface TypeDietaryID {
  dietary_id: number;
}

const intersection = <T extends TypeItemID, K extends TypeDietaryID>(
  array1: Array<T>,
  array2: Array<K>
): boolean => {
  for (let i = 0; i < array1.length; i += 1) {
    for (let j = 0; j < array2.length; j += 1) {
      if (array1[i].id === array2[j].dietary_id) {
        return true;
      }
    }
  }
  return false;
};

export { intersection };
