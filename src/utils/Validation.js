const ALPHA_NUM_REGEX = /^[a-z0-9 ]*$/i;

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
  // reserved titles
  if (gameTitle == "app" || gameTitle == "test") errors.push("title-reserved");
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
