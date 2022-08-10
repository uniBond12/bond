import { IKImage } from "imagekitio-react";
import React from "react";
import styles from "scss/components/MetaMaskDetails.module.scss";

function MetaMaskDetails() {
  return (
    <div className={styles.card}>
      <IKImage
        path="images/metamask.png"
        className={styles.banner}
        loading="lazy"
        lqip={{ active: true }}
        alt=""
      />
      <div className={styles.body}>
        <p className={`black weight-6 ${styles.title}`}>
          What Is Metamask and How To Use It: A Beginner’s Guide
        </p>
        <p className={`${styles.subtitle} weight-6 gray`}>
          MetaMask is among the most well-known and in style crypto wallets —{" "}
          <a href="#" className="blue">
            Read More
          </a>
        </p>
      </div>

      <a
        href="https://capitalcryptoacademy.com/"
        className={`${styles.link} blue weight-6`}
      >
        https://capitalcryptoacademy.com/
      </a>
    </div>
  );
}

export default MetaMaskDetails;
