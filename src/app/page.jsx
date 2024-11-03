import Image from "next/image";

import Logo from "@/images/logo.png";
import Button from "@/components/Button";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Image src={Logo} alt="Guessing Game Logo" className={styles.logo} />
      <Button navlink href="/new-game" text="New Game" />
      <Button navlink href="/load-game" text="Load Game" />
      <Button type="secondary" navlink href="/rules" text="Rules" />
    </div>
  );
}
