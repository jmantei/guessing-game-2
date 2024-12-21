import { CalculateStartingPlayer } from "@/utils/GameLogic";
import styles from "./RoundInfo.module.css";

function RoundInfo({
  round,
  cards,
  playerNames,
  numberOfPlayers,
  playerGuessingFirstIndex,
  guessesFirst = false,
  startsRound = false,
  playerGuesses = {},
}) {
  return (
    <div className={styles.roundInfoBox}>
      <h2>{`Round ${round}`}</h2>
      <p>{`${cards} Card${cards === 1 ? "" : "s"}`}</p>
      {guessesFirst && (
        <p>{`${playerNames[playerGuessingFirstIndex]} guesses first`}</p>
      )}
      {startsRound && (
        <p>{`${
          playerNames[
            CalculateStartingPlayer(
              playerGuesses,
              playerGuessingFirstIndex,
              round,
              numberOfPlayers
            )
          ]
        } starts round`}</p>
      )}
    </div>
  );
}

export default RoundInfo;
