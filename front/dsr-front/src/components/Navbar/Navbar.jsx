import React, { useState } from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import icon from '../../assets/earth-emoji-bw.png'

function Navbar({ SoftwareRegistryService }) {
  // Função pra simular o caso o usuario já esteja logado
  const [logged, isLogged] = useState(false)

  const toggleLoggedState = async () => {
    if (logged) return

    await SoftwareRegistryService.connectBlockchain()
    isLogged(SoftwareRegistryService.isLogged())
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
            <h1>History</h1>
          </li>
        </Link>

        {logged ? (
          <Link to="/form">
            <li>
              <h1>Registration</h1>
            </li>
          </Link>
        ) : null}

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
