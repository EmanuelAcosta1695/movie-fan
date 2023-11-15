"use client"

import { createContext, useState } from "react"
import styles from "./styles.module.scss"
import { Footer, Input, SubmitButton } from "./components"

// Todos los tipos recibidos son string
type FormValues = Record<string, string>


interface FormContexType {
    formValues: FormValues
    setFormValues: React.Dispatch<React.SetStateAction<FormValues>>
}

interface FormProps {
    title: string
    description?: string
    onSubmit: (values: FormValues) => void
    children: React.ReactNode
}

export const FormContext = createContext<FormContexType | undefined>(undefined)


export function Form({ title, children, onSubmit, description } : FormProps) {
    const [formValues, setFormValues] = useState<FormValues>({})

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        onSubmit(formValues)
    }

    return (
        <FormContext.Provider value={{ formValues, setFormValues }}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.descriptionContainer}>
                    <h2>{title}</h2>
                    {description && <p>{description}</p>}
                </div>
                {children}
            </form>
        </FormContext.Provider>
    )
}

Form.Input = Input
Form.SubmitButton = SubmitButton
Form.Footer = Footer
