import styles from "./SetsInput.module.css";

function SetsInput({
  playerNumber,
  playerName,
  showError,
  guessOnly = false,
  guessAmount = 10,
}) {
  return (
    <div
      className={`${styles.inputContainer} ${
        showError ? styles.inputError : ""
      }`}
    >
      <label htmlFor={`player-${playerNumber}-input`}>{`${playerName}'s ${
        guessOnly ? "guess" : "sets won"
      }:`}</label>
      <input type="tel" id={`player-${playerNumber}-input`} />
      {guessOnly ? null : <p>{guessAmount}</p>}
    </div>
  );
}

export default SetsInput;
