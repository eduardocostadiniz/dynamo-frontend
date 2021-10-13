
import './styles.scss'

const CONFIG_COLOR = {
  success: 'successText',
  warning: 'warningText',
  danger: 'dangerText',
  primary: 'primaryText',
  default: 'infoText'
}

const CONFIG_SIZE = {
  big: 'bigText',
  default: 'defaultText',
  small: 'smallText'
}

const CONFIG_ALIGN = {
  left: 'leftText',
  right: 'rightText',
  center: 'centerText',
  justify: 'justifyText'
}

const transformText = (value, strong, italic) => {
  if (strong && italic) {
    return <strong><i>{value}</i></strong>
  }
  else if (strong) {
    return <strong>{value}</strong>
  }
  else if (italic) {
    return <i>{value}</i>
  }
  return value
}

export default function Text({ children, className = 'text', strong, italic, size = 'default', layout = 'default', align = 'left' }) {
  return (
    <div className={`${className} ${CONFIG_SIZE[size]} ${CONFIG_COLOR[layout]} ${CONFIG_ALIGN[align]}`}>
      {transformText(children, strong, italic)}
    </div>
  )
}