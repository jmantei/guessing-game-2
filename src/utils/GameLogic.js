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
