import React, { useState, useEffect } from 'react'
import HistoryItem from './HistoryItem'
import styles from './HistoryList.module.css'

function HistoryList({ SoftwareRegistryService }) {
  const [owner, setOwner] = useState('')
  const [hash, setHash] = useState('')
  const [handleClick, setHandleClick] = useState(false)
  const [historyList, setHistoryList] = useState([])

  const getHistoryData = async (owner, hash) => {
    let data = []

    if (owner.length > 0) {
      console.log('owner')
      data = await SoftwareRegistryService.getRecordsByOwner(owner)
    } else if (hash.length > 0) {
      console.log('hash')
      data = await SoftwareRegistryService.getRecordByHash(hash)
    } else {
      console.log('else')
      data = await SoftwareRegistryService.getLastNRecords(2)
    }

    setHistoryList(data)
    console.log(data)
  }

  useEffect(() => {
    getHistoryData(owner, hash)
  }, [handleClick])

  const handleClickSubmit = () => {
    setHandleClick(!handleClick)
  }

  return (
    <div className={styles.history_list_container}>
      <div className={styles.filter}>
        <label className={styles.input_label} htmlFor="hash">
          Search owner
        </label>
        {hash.length === 0 ? (
          <input
            type="text"
            id="owner"
            placeholder="ex. 0bc57642b3cc041a76705d171c2afe66821e98101c7fd4cd23331c17ecb186a9"
            value={owner}
            onChange={e => setOwner(e.target.value)}
          />
        ) : null}
      </div>

      <div className={styles.filter}>
        <label className={styles.input_label} htmlFor="hash">
          Search hash
        </label>
        {owner.length === 0 ? (
          <input
            type="text"
            id="hash"
            placeholder="ex. 0bc57642b3cc041a76705d171c2afe66821e98101c7fd4cd23331c17ecb186a9"
            value={hash}
            onChange={e => setHash(e.target.value)}
          />
        ) : null}
      </div>
      {historyList.map((item, index) => (
        <HistoryItem key={index} item={item} />
      ))}
      <div>
        <button onClick={handleClickSubmit}>clica aqui</button>
      </div>
    </div>
  )
}

export default HistoryList
