/**
 * Joins an array of strings into a single string, with commas separating all elements
 * and "and" before the last element.
 *
 * @param {Array} arr - The array of strings to be joined.
 * @returns String - A string with the elements joined by commas, and "and" before the last element.
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
 * Generate an array of player numbers shifted based on the starting player.
 * @param {Number} numberOfPlayers - The number of players.
 * @param {Number} startingIndex - The index of the player starting the round.
 * @returns Array - An array of player numbers beginning with the starting player.
 */
export function GenerateShiftedPlayerArray(numberOfPlayers, startingIndex) {
  // generate initial array [1, 2, 3, etc...]
  const initialArray = Array.from(Array(numberOfPlayers).keys());
  // shift array based on starting player
  return ShiftPlayerArray(initialArray, startingIndex);
}

/**
 * Shift an array based on the starting player. [1,2,3,4,5] => [3,4,5,1,2]
 * @param {Array} array - An array of elements to be shifted.
 * @param {Number} startingIndex - The index of the player starting the round.
 * @returns Array - An shifted array based on the starting player's index.
 */
export function ShiftPlayerArray(array, startingIndex) {
  return array.slice(startingIndex).concat(array.slice(0, startingIndex));
}

/**
 * Unshift an array based on the starting player. [3,4,5,1,2] => [1,2,3,4,5]
 * @param {Array | NodeList} array - An array or nodeList of elements to be unshifted.
 * @param {Number} startingIndex - The index of the player starting the round.
 * @returns Array - An array that is unshifted back to the original order.
 */
export function UnshiftPlayerArray(array, startingIndex) {
  // convert to array (for nodeList)
  const arr = Array.from(array);

  // unshift array back to original order
  return arr.slice(-startingIndex).concat(arr.slice(0, -startingIndex));
}
