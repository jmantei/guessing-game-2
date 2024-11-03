import Image from "next/image";

import Footer from "@/components/Footer";
import Logo from "@/images/logo.png";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Image src={Logo} alt="Guessing Game Logo" className={styles.logo} />
    </div>
  );
}
