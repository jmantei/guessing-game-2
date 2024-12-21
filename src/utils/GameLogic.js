import { PlayerNumArray, SortArrayBasedOnStartingIndex } from "./Utilities";

/**
 * Calculate the score for a round.
 * @param {number} guess - the guess for round.
 * @param {number} setsWon - the sets won for round.
 * @returns number - points for that round.
 */
export function CalculateScore(guess, setsWon) {
  // get differences between sets won and guesses
  const diff = -Math.abs(guess - setsWon);
  console.log("guess, set", guess, setsWon);

  // return difference or guessed amount if difference is zero
  const score = diff === 0 ? guess : diff;
  console.log("score", score);

  return score;
}

/**
 * Calculate the highest score that a player has.
 * @param {object} playerPoints - a object of array with each players' points.
 * @returns number - the current highest score that any player has.
 */
export function CalculateMaxScore(playerPoints) {
  // initialize array
  const points = [];

  // add final score to points array
  for (const player in playerPoints) {
    if (playerPoints[player].length > 0)
      points.push(playerPoints[player][playerPoints[player].length - 1]);
  }
  // return highest score
  return Math.max(...points);
}

/**
 * Determine who the winner of the game is.
 * @param {object} playerPoints - a object of array with each players' points.
 * @param {Array} playerNames - an array of players' names.
 * @returns Array - an array of the players' names that have won the game.
 */
export function CalculateWinner(playerPoints, playerNames) {
  // initialize array
  const winnerIndexes = [];

  // get highest score
  const maxScore = CalculateMaxScore(playerPoints);
  console.log(maxScore);

  // add winnerIndexes to winnerIndexes array
  for (const player in playerPoints) {
    if (playerPoints[player].length > 0)
      if (playerPoints[player][playerPoints[player].length - 1] === maxScore)
        winnerIndexes.push(Number(player.charAt(player.length - 1)) - 1);
  }
  console.log(winnerIndexes.map((index) => playerNames[index]));

  return winnerIndexes.map((index) => playerNames[index]);
}

/**
 * Calculate the index of the starting player based on the players' guesses.
 * @param {Object} guessesObj - An object storing all of the players' guesses.
 * @param {Number} startingIndex - The index of the player starting the round.
 * @param {Number} round - The current round.
 * @param {Number} numberOfPlayers - The number of players.
 * @returns - The index of the player starting the round.
 */
export function CalculateStartingPlayer(
  guessesObj,
  startingIndex,
  round,
  numberOfPlayers
) {
  // convert guesses data object to an array of guesses
  const guessesArray = [];
  for (const player in guessesObj) {
    // add guess to array if it exists
    if (guessesObj[player].length > 0)
      guessesArray.push(guessesObj[player][round - 1]);
  }

  console.log("guessesArray: ", guessesArray);

  // reorder the array based on who guesses first
  const sortedArray = SortArrayBasedOnStartingIndex(
    guessesArray,
    startingIndex
  );

  console.log("sortedArray: ", sortedArray);

  // determine index of first occurence of the highest guess
  const maxIndex = sortedArray.reduce((maxIdx, currentValue, currentIdx) => {
    return currentValue > sortedArray[maxIdx] ? currentIdx : maxIdx;
  }, 0);

  // index in the sorted array but i want to know what player is at that index
  console.log("numplayers", numberOfPlayers);
  console.log(
    "roundstartindex: ",
    PlayerNumArray(numberOfPlayers, startingIndex)[maxIndex]
  );
  console.log("Indexes: ", PlayerNumArray(numberOfPlayers, startingIndex));
  // return the index based on the sorted
  return PlayerNumArray(numberOfPlayers, startingIndex)[maxIndex];
}
