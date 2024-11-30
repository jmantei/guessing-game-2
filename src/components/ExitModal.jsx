import Button from "./Button";

import styles from "./ExitModal.module.css";

function ExitModal({
  onModalClose = () => {
    console.log("close");
  },
}) {
  return (
    <div className={styles.overlay} onClick={onModalClose}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p>
          Are you sure you want to quit this game and return to the main menu?
        </p>
        <p>Your progress will be automatically saved.</p>
        <Button text="Return to Main Menu" navlink href="/" />
      </div>
    </div>
  );
}

export default ExitModal;
