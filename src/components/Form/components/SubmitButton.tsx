import { Loader } from '@/components/Loader'
import styles from './styles.module.scss'


interface SubmitButtonProps {
    buttonText: string
    isLoading?: boolean
}

export function SubmitButton({buttonText, isLoading}:SubmitButtonProps){
    // disabled={isLoading} -> es para no poder hacer muchos clicks mientras esta cargando
    return (
        <button className={styles.submitButton} type="submit" disabled={isLoading}>
            {isLoading? <Loader /> : buttonText}
        </button>
    )
}