import './FormGroup.scss';

const FormGroup = ({ name, type, value, onChange, label, className, error, ...props}) => {

    return (
        <div className='formGroup'>
            <label htmlFor={name}>
                <input
                    className={`${className ? className : ''}${error ? ' error' : ''}`}
                    name={name}
                    id={name}
                    type={type}
                    placeholder={label}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
                {error && <span>{error}</span>}
            </label>
        </div>
    )
}

export default FormGroup;
