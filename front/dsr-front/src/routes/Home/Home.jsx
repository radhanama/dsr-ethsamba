import React from 'react'
import styles from './Home.module.css'
import earth from '../../assets/gold-earth.png'

function Home() {
  return (
    <div className={styles.home_container}>
      <div className={styles.title}>
        <h1>Decentralized Software Registry</h1>
      </div>
      <div className={styles.description}>
        <p>
          A decentralized software registry enables trustless interactions,
          empowers developers, and fosters innovation by lowering barries to
          entry and promoting collaboration.
        </p>
      </div>
      <img src={earth} alt="" />
    </div>
  )
}

export default Home
