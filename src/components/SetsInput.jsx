import styles from "./SetsInput.module.css";

function SetsInput({ playerName, guessOnly = false, guessAmount = 10 }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor="">{`${playerName}'s guess:`}</label>
      <input type="tel" />
      {guessOnly ? null : <p>{guessAmount}</p>}
    </div>
  );
}

export default SetsInput;
