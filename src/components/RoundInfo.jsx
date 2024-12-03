import styles from "./RoundInfo.module.css";

function RoundInfo({ round, cards }) {
  return (
    <div className={styles.roundInfoBox}>
      <h2>{`Round ${round}`}</h2>
      <p>{`${cards} Card${cards === 1 ? "" : "s"}`}</p>
      <p>Player 1 guesses first</p>
    </div>
  );
}

export default RoundInfo;
