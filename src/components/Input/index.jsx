
import './styles.scss'


function Input({ label, ...props }) {
  return (
    <div className='inputContainer'>
      <label>{label}</label>
      <input {...props} />
    </div>
  )
}

export { Input }