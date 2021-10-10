
import './styles.scss'

const CONFIG_COLOR = {
  primary: 'primaryButton',
  danger: 'dangerButton',
  default: ''
}

const CONFIG_SIZE = {
  default: 'defaultButton',
  small: 'smallButton'
}

function Button({ children, size = 'default', layout = 'default', ...props }) {
  return (
    <button className={`${CONFIG_SIZE[size]} ${CONFIG_COLOR[layout]}`} {...props}>
      {children}
    </button>
  )
}

export { Button }