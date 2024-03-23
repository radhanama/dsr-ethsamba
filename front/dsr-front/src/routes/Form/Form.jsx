import React, { useState } from 'react'
import styles from './Form.module.css'

const Form = () => {
  const [formData, setFormData] = useState({
    hash: '',
    description: '',
    authorName: '',
    authorEmail: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Enviar do jeito que for pra blockchain
    console.log(formData)
  }

  // Verifica se todos os campos estão preenchidos
  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '')
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <div className={styles.inputRow}>
            <label className={styles.input_label} htmlFor="hash">
              Hash
            </label>
            <input
              type="text"
              name="hash"
              id="hash"
              value={formData.hash}
              onChange={handleChange}
              placeholder="ex. 0bc57642b3cc041a76705d171c2afe66821e98101c7fd4cd23331c17ecb186a9"
            />
          </div>
          <div className={styles.inputRow}>
            <label className={styles.input_label} htmlFor="description">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="ex. software to download mini-games"
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.inputRow}>
            <label className={styles.input_label} htmlFor="authorName">
              Author Name
            </label>
            <input
              type="text"
              name="authorName"
              id="authorName"
              value={formData.authorName}
              onChange={handleChange}
              placeholder="ex. Daniel"
            />
          </div>
          <div className={styles.inputRow}>
            <label className={styles.input_label} htmlFor="authorEmail">
              Author Email
            </label>
            <input
              type="email"
              name="authorEmail"
              id="authorEmail"
              value={formData.authorEmail}
              onChange={handleChange}
              placeholder="ex. daniel@gmail.com"
            />
          </div>
        </div>
        <button
          className={styles.form_button}
          type="submit"
          disabled={!isFormValid()}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form
