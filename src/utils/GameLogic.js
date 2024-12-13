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
