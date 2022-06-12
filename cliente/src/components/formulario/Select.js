import { useField } from 'formik'

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">{label}</label>
                <select className={meta.touched && meta.error ? "form-select is-invalid" : "form-select"} {...field} {...props} />
                {meta.error ? 
                <div className="invalid-feedback">{meta.error}</div>
                :
                <div className="valid-feedback"></div>
            }
    </div>
  )
}

export default Select