import { Link } from 'react-router-dom'

import './styles.scss'

const CONFIG_TYPE = {
  primary: 'linkPrimaryButton',
  danger: 'linkDangerButton',
  default: 'defaultLink',
  none: ''
}

export function LinkWrapper({ children, href, type = 'default', ...props }) {
  return (
    <Link to={href} className={CONFIG_TYPE[type]} {...props}>
      {children}
    </Link>
  )
}

export function RawLink({ children, type = 'none', ...props }) {
  return (
    <a className={CONFIG_TYPE[type]} {...props}>{children}</a>
  )
}