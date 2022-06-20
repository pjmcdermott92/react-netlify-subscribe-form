import { useReducer, useState } from 'react';
import { useForm, useTimeout } from '../../hooks';
import validationReducer from '../../reducers/validationReducer';
import { canSubmit, makeApiRequest } from '../../utils';
import { AlertMessage, FormGroup } from '../index';

const UnsubscribeForm = () => {

    const handleUnsubscribe = async () => {
        setLoading(true);
        const res = await makeApiRequest('unsubscribe', values);
        if (!res.success) setMessage({ type: 'danger', title: 'Error', message: res.message });
        else setMessage({ type: 'success', title: 'Success', message: 'Contact Successfully Unsubscribed.'});
        reset();
        clearForm();
        setLoading(false);
    }

    const [loading, setLoading] = useState(false);
    const [errors, validate] = useReducer(validationReducer, {});
    const [values, handleChange, handleSubmit, clearForm] = useForm(handleUnsubscribe, { email: '' }, validate);
    const [message, setMessage] = useState(null);
    const [reset] = useTimeout(() => setMessage(null), 10000);

    return (
        <form onSubmit={handleSubmit}>
            {message && <AlertMessage {...message} />}
            <p>Enter your email address below to unsubscribe from our list.</p>
            <FormGroup
                name='email'
                type='search'
                label='Email Address'
                value={values.email}
                onChange={handleChange}
                disabled={loading}
            />
            <div style={{margin: '.75rem 0'}}>
                <button
                    className='btn btn-block btn-success'
                    type='submit'
                    disabled={!canSubmit(values, errors) || loading}
                >
                    {loading ? 'Loading...' : 'Unsubscribe'}
                </button>
            </div>
        </form>
    )
}

export default UnsubscribeForm;
