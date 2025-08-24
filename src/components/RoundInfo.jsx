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
  fullscreen = false,
}) {
  return (
    <div className={styles.roundInfoBox}>
      {fullscreen || <h2>{`Round ${round}`}</h2>}
      <p className={fullscreen ? styles.cardsDisplay : ""}>
        {cards}
        <span>{` card${cards === 1 ? "" : "s"}`}</span>
      </p>
      {guessesFirst && (
        <p className={fullscreen ? styles.playerDisplay : ""}>
          {playerNames[playerGuessingFirstIndex]}
          <span> guesses first</span>
        </p>
      )}
      {startsRound && (
        <p className={fullscreen ? styles.playerDisplay : ""}>
          {
            playerNames[
              CalculateStartingPlayer(
                playerGuesses,
                playerGuessingFirstIndex,
                round,
                numberOfPlayers
              )
            ]
          }
          <span> starts round</span>
        </p>
      )}
    </div>
  );
}

export default RoundInfo;
