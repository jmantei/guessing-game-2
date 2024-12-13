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
