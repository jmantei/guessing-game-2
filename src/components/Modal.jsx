import Button from "./Button";

import styles from "./Modal.module.css";

function Modal({
  paragraphs = [],
  buttonText = "Confirm Modal",
  redButton = false,
  onModalClose = () => {
    console.log("close");
  },
  confirmNavlink = false,
  confirmhref = "/",
  onModalConfirm = () => {
    console.log("confirm");
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
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {confirmNavlink ? (
          <Button
            text={buttonText}
            navlink
            href={confirmhref}
            className={redButton ? styles.redButton : ""}
          />
        ) : (
          <Button
            text={buttonText}
            onClick={onModalConfirm}
            className={redButton ? styles.redButton : ""}
          />
        )}
      </div>
    </div>
  );
}

export default Modal;
