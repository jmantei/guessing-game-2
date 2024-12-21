// regex that allows alphanumeric characters with spaces as well as empty strings
const ALPHA_NUM_REGEX = /^[a-z0-9 ]*$/i;
const ZERO_TEN_REGEX = /^(10|[0-9])$/;

/**
 * Check that all form data is valid.
 * @param {String} gameType - The type of game.
 * @param {String} numPlayers - The number of players.
 * @param {String} gameTitle - The title of the game.
 * @param {String} player1Name - The name of player 1.
 * @param {String} player2Name - The name of player 2.
 * @param {String} player3Name - The name of player 3.
 * @param {String} player4Name - The name of player 4.
 * @param {String} player5Name - The name of player 5.
 * @param {String} player6Name - The name of player 6.
 * @param {String} player7Name - The name of player 7.
 * @param {String} player8Name - The name of player 8.
 * @returns Array - An array of errors, empty array if there are no errors
 */
export function validNewGameForm(
  gameType,
  numPlayers,
  gameTitle,
  player1Name = null,
  player2Name = null,
  player3Name = null,
  player4Name = null,
  player5Name = null,
  player6Name = null,
  player7Name = null,
  player8Name = null
) {
  // initialize error array
  const errors = [];
  // Validate game title:
  // cannot be empty
  if (gameTitle == "") errors.push("title-none");
  // must be alphanumeric
  const regex = ALPHA_NUM_REGEX;
  if (!regex.test(gameTitle)) errors.push("title-alphanum");
  // cannot be too long
  if (gameTitle.length > 25) errors.push("title-length");

  // validate number of Players:
  // cannot be empty
  if (numPlayers == "") errors.push("players-none");

  // validate game type:
  // cannot be empty
  if (gameType == "") errors.push("type-none");

  // validate player names
  errors.push(validatePlayerName(player1Name, 1, numPlayers));
  errors.push(validatePlayerName(player2Name, 2, numPlayers));
  errors.push(validatePlayerName(player3Name, 3, numPlayers));
  errors.push(validatePlayerName(player4Name, 4, numPlayers));
  errors.push(validatePlayerName(player5Name, 5, numPlayers));
  errors.push(validatePlayerName(player6Name, 6, numPlayers));
  errors.push(validatePlayerName(player7Name, 7, numPlayers));
  errors.push(validatePlayerName(player8Name, 8, numPlayers));

  // check for player name duplicates
  const allPlayerNames = [
    player1Name,
    player2Name,
    player3Name,
    player4Name,
    player5Name,
    player6Name,
    player7Name,
    player8Name,
  ];
  const playerNameArr = [];
  for (let i = 1; i <= numPlayers; i++) {
    playerNameArr.push(allPlayerNames[i - 1]);
  }
  const playerNameSet = [...new Set(playerNameArr)];
  if (playerNameArr.length !== playerNameSet.length) {
    errors.push("unique-names");
  }

  return errors.flat();
}

/**
 * Validate individual player names.
 * @param {String} name - The name of the player.
 * @param {Number} number - Which player it is (numbers 1 to 8).
 * @param {String} numPlayers - How many players total.
 * @returns Array - An array of errors, empty array if there are no errors.
 */
function validatePlayerName(name, number, numPlayers) {
  const errors = [];
  if (number <= numPlayers) {
    // cannot be empty
    if (name == "") errors.push(`player${number}Name-none`);
    // must be alphanumeric
    const regex = ALPHA_NUM_REGEX;
    if (!regex.test(name)) errors.push(`player${number}Name-alphanum`);
    // cannot be too long
    if (name.length > 25) errors.push(`player${number}Name-length`);
  }
  return errors;
}

/**
 * Validate the setInput fields.
 * @param {Bool} validateTotalSum - True if the sum of all the gueses needs to match the totalSum parameter (only for validating the sets-won inputs).
 * @param {Number} totalSum - The total sum (only needed if validateTotalSum is true).
 * @param  {...String} inputs - The user inputs to be validated.
 * @returns Array - An array of strings where each index corresponds to an input field on the page.
 */
export function validateSetInput(
  validateTotalSum = false,
  totalSum = 0,
  ...inputs
) {
  const errorArray = [];
  inputs.forEach((input) => {
    // cannot be empty
    if (input === "") errorArray.push("empty");
    // must be valid number
    else if (!ZERO_TEN_REGEX.test(input)) errorArray.push("non-number");
    else errorArray.push("");
  });
  // check if total sum is incorrect (sets-won only)
  console.log("eoor");
  console.log(!errorArray.includes("empty"));
  console.log(!errorArray.includes("non-number"));
  console.log(totalSum);
  console.log(inputs.reduce((a, b) => Number(a) + Number(b), 0));
  if (
    validateTotalSum &&
    !errorArray.includes("empty") &&
    !errorArray.includes("non-number") &&
    inputs.reduce((a, b) => Number(a) + Number(b), 0) !== totalSum
  )
    return inputs.map(() => "not-adding-up");

  return errorArray;
}
