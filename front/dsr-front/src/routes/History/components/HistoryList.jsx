import React, { useState, useEffect } from 'react'
import HistoryItem from './HistoryItem'
import styles from './HistoryList.module.css'

function HistoryList({ SoftwareRegistryService }) {
  const [filter, setFilter] = useState('')
  const [historyList, setHistoryList] = useState([])

  useEffect(() => {
    const getHistoryData = async () => {
      const data = await SoftwareRegistryService.getLastNRecords(1)
      setHistoryList(data)
      console.log(data)
    }

    getHistoryData()
  }, [])

  const filteredHistory = historyList.filter(todo => {
    // Verifica se alguma das chaves do objeto contém o valor do filtro
    return Object.values(todo).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(filter.toLowerCase())
    )
  })

  return (
    <div className={styles.history_list_container}>
      <div className={styles.filter}>
        <label className={styles.input_label} htmlFor="hash">
          Search for any property
        </label>
        <input
          type="text"
          id="filter"
          placeholder="ex. 0bc57642b3cc041a76705d171c2afe66821e98101c7fd4cd23331c17ecb186a9"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      {filteredHistory.length > 0
        ? filteredHistory.map((item, index) => (
            <HistoryItem key={index} item={item} />
          ))
        : historyList.map((item, index) => (
            <HistoryItem key={index} item={item} />
          ))}
    </div>
  )
}

export default HistoryList
