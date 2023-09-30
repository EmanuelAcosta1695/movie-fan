'use client'

import { useContext } from 'react'
import { FormContext } from '..'
import styles from './styles.module.scss'

interface InputProps {
  type?: 'text' | 'password'
  name: string
  label: string
  placeholder?: string
}

export function Input ({ label, name, placeholder, type }: InputProps) {
    // Utiliza el useContext al contexto del formulario asi
    //  no hay que pasarlo de hijo a hijo
    // ! ->
    const { formValues, setFormValues } = useContext(FormContext)!

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setFormValues(prevValues => ({
        ...prevValues,
        [name]: value
        }))
    }

    // formValues[name] -> si name es correo ej -> formValues['correo']
    return (
        <div className={styles.inputContainer}>
        <label className={styles.label} htmlFor={name}>
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={formValues[name] || ''}
            onChange={handleChange}
            placeholder={placeholder}
        />
        </div>
    )
}