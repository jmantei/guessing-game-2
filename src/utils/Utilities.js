/**
 * Joins an array of strings into a single string, with commas separating all elements
 * and "and" before the last element.
 *
 * @param {Array} arr - The array of strings to be joined.
 * @returns string - A string with the elements joined by commas, and "and" before the last element.
 *
 * @example
 * const result = joinWithAnd(["apple", "banana", "cherry", "date"]);
 * console.log(result);  // Output: "apple, banana, cherry and date"
 */
export function JoinWithAnd(arr) {
  // one word
  if (arr.length === 1) {
    return arr[0];
  }
  // two words with "and"
  else if (arr.length === 2) {
    return arr.join(" and ");
  }
  // three or more words with commas and "and"
  else {
    const lastItem = arr.pop();
    return arr.join(", ") + " and " + lastItem;
  }
}

/**
 * Generate an array of player numbers based on the starting player.
 * @param {Number} numberOfPlayers - The number of players
 * @param {Number} startingIndex - The index of the player starting the round
 * @returns An array of player numbers beginning with the starting player.
 */
export function PlayerNumArray(numberOfPlayers, startingIndex) {
  // generate initial array [1, 2, 3, etc...]
  const initialArray = Array.from(Array(numberOfPlayers).keys());
  // order array based on starting player
  const orderedArray = initialArray
    .slice(startingIndex)
    .concat(initialArray.slice(0, startingIndex));
  return orderedArray;
}

export function SortArrayBasedOnStartingIndex(array, startingIndex) {
  return array.slice(startingIndex).concat(array.slice(0, startingIndex));
}

/**
 * Sort an array of player numbers that are rearanged based on the starting index. [3,4,5,1,2] => [1,2,3,4,5]
 * @param {Array | NodeList} array - An array or Node list of elements to be sorted
 * @param {Number} startingIndex - The index of the player starting the round
 * @returns An array that is sorted back to the original order based on the starting index.
 */
export function SortPlayerNumArray(array, startingIndex) {
  // convert to array (for nodeList)
  const arr = Array.from(array);

  // Split the array into two parts:
  const firstPart = arr.slice(-startingIndex);
  const secondPart = arr.slice(0, -startingIndex);

  // Combine the two parts in reverse order to create a sorted array [1, 2, 3, etc...]
  return firstPart.concat(secondPart);
}
