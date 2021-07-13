import { Link } from 'react-router-dom'

import styles from './Anchors.module.css'

const CONFIG_TYPE = {
  primary: styles.linkPrimaryButton,
  danger: styles.linkDangerButton,
  default: styles.defaultLink
}

export function LinkWrapper({ children, href, type = 'default', ...props }) {
  return (
    <Link to={href} className={CONFIG_TYPE[type]} {...props}>
      {children}
    </Link>
  )
}

export function RawLink({ children, type = 'default', ...props }) {
  return (
    <a className={CONFIG_TYPE[type]} {...props}>{children}</a>
  )
}