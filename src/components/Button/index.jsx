
import styles from './Button.module.css'

const CONFIG_COLOR = {
    primary: styles.primaryButton,
    danger: styles.dangerButton,
    default: ''
}

const CONFIG_SIZE = {
    default: styles.defaultButton,
    small: styles.smallButton
}

export default function Button({onClick, children, size='default', layout='default'}) {
    return (
        <button className={`${styles.button} ${CONFIG_SIZE[size]} ${CONFIG_COLOR[layout]}`} onClick={onClick}>
            {children}
        </button>
    )
}