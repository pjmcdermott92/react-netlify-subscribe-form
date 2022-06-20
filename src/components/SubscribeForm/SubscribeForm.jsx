import { useReducer, useState } from 'react';
import { useForm, useTimeout } from '../../hooks';
import validationReducer from '../../reducers/validationReducer';
import { formatTelephone, canSubmit, makeApiRequest } from '../../utils';
import { AlertMessage, FormGroup } from '../index';

const FORM_FIELDS = [
    { name: 'first_name', type: 'text', label: 'First Name' },
    { name: 'last_name', type: 'text', label: 'Last Name' },
    { name: 'email', type: 'email', label: 'Email Address' },
    { name: 'phone', type: 'text', label: 'Telephone' },
];

const initValues = { first_name: '', last_name: '', email: '', phone: '' };

const SubscribeForm = () => {

    const subscribe = async () => {
        setLoading(true);
        const res = await makeApiRequest('subscribe', values);
        if (!res.success) setMessage({ type: 'danger', title: 'Error', message: res.message });
        else setMessage({ type: 'success', title: 'Success', message: 'Contact successfully subscribed' });
        reset();
        clearForm();
        setLoading(false);
    }

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [reset] = useTimeout(() => setMessage(null), 10000);
    const [errors, validate] = useReducer(validationReducer, {});
    const [values, handleChange, handleSubmit, clearForm] = useForm(subscribe, initValues, validate);

    return (
        <form onSubmit={handleSubmit}>
            {message && <AlertMessage {...message} />}
            <p>Enter your information below to subscribe.</p>
            {FORM_FIELDS?.length && FORM_FIELDS?.map(({ name, type, label }) => 
                <FormGroup
                    key={name}
                    name={name}
                    type={type}
                    label={label}
                    value={formatTelephone(values[name])}
                    onChange={handleChange}
                    error={errors[name]}
                    disabled={loading}
                />
            )}
            <div style={{marginTop: '.75rem'}}>
                <button
                    className='btn btn-success'
                    type='submit'
                    disabled={!canSubmit(values, errors) || loading}
                >
                    {loading ? 'Loading...' : 'Subscribe'}
                </button>
            </div>
        </form>
    )
}

export default SubscribeForm;
