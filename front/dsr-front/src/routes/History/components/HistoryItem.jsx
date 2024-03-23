import React from 'react'
import styles from './HistoryItem.module.css'

const HistoryItem = ({ item }) => {
  const {
    owner,
    sha256Hash,
    description,
    authorName,
    authorEmail,
    blockTimestamp
  } = item

  return (
    <div className={styles.history_item_container}>
      <div className={styles.rectangle}>
        <div className={styles.info}>
          <p>Owner: {owner}</p>
          <p>SHA256 Hash: {sha256Hash}</p>
          <p>Description: {description}</p>
          <p>Author Name: {authorName}</p>
          <p>Author Email: {authorEmail}</p>
          <p>Block Timestamp: {blockTimestamp}</p>
        </div>
      </div>
    </div>
  )
}

export default HistoryItem
