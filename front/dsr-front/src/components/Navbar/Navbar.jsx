import React, { useState } from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import icon from '../../assets/earth-emoji-bw.png'

function Navbar() {
  // Função pra simular o caso o usuario já esteja logado
  const [logged, isLogged] = useState(false)

  const toggleLoggedState = () => {
    isLogged(!logged)
  }

  return (
    <nav className={styles.navbar_container}>
      <ul className={styles.navbar_list}>
        <Link to="/">
          <li>
            <img src={icon} alt="Earth Icon" />
            <h1>DSR</h1>
          </li>
        </Link>

        <Link to="/history">
          <li>
            <h1>history</h1>
          </li>
        </Link>

        <li>
          {logged ? (
            <button className={styles.menu_button} onClick={toggleLoggedState}>
              logged
            </button>
          ) : (
            <button className={styles.menu_button} onClick={toggleLoggedState}>
              login
            </button>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
