

import './styles.scss'


function Option({ children, ...props }) {
  return (
    <option {...props}>{children}</option>
  )
}

function Select({ label, children, ...props }) {
  return (
    <div className='selectContainer'>
      <label>{label}</label>
      <select {...props}>
        {children}
      </select>
    </div>
  )
}

export { Select, Option }