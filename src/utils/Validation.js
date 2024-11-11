// regex that allows alphanumeric characters with spaces as well as empty strings
const ALPHA_NUM_REGEX = /^[a-z0-9 ]*$/i;

/**
 * Check that all form data is valid
 * @param {string} gameType - type of game
 * @param {string} numPlayers - number of players
 * @param {string} gameTitle - title of game
 * @param {string} player1Name - name of player 1
 * @param {string} player2Name - name of player 2
 * @param {string} player3Name - name of player 3
 * @param {string} player4Name - name of player 4
 * @param {string} player5Name - name of player 5
 * @param {string} player6Name - name of player 6
 * @param {string} player7Name - name of player 7
 * @param {string} player8Name - name of player 8
 * @returns array of errors, empty array if there are no errors
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

  return errors.flat();
}

/**
 * Validate individual player names
 * @param {string} name - name of player
 * @param {number} number - which player is it (numbers 1 to 8)
 * @param {string} numPlayers - how many players total
 * @returns array of errors, empty array if there are no errors
 */
function validatePlayerName(name, number, numPlayers) {
  const errors = [];
  if (number <= numPlayers) {
    // cannot be empty
    if (name == "") errors.push(`player${number}Name-none`);
    // must be alphanumeric
    const regex = ALPHA_NUM_REGEX;
    if (!regex.test(name)) errors.push(`player${number}Name-alphanum`);
  }
  return errors;
}
