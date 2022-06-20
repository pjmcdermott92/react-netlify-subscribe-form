import { useReducer, useState } from 'react';
import { useForm } from '../../hooks';
import validationReducer from '../../reducers/validationReducer';
import { canSubmit, makeApiRequest } from '../../utils';
import { AlertMessage, FormGroup } from '../index';
import SubscriberDetails from './SubscriberDetails';

const SearchForm = () => {

    const handleSearch = async () => {
        setLoading(true);
        setSubscriber(null);
        setMessage(null);
        const res = await makeApiRequest('search-subscriber', values);
        if (!res.success) setMessage(res.message);
        else setSubscriber(res.data);
        setLoading(false);
    }
    
    const onChange = e => {
        handleChange(e);
        setSubscriber(null);
        setMessage(null);
    }

    const [loading, setLoading] = useState(false);
    const [errors, validate] = useReducer(validationReducer, {});
    const [values, handleChange, handleSubmit] = useForm(handleSearch, { email: '' }, validate);
    const [subscriber, setSubscriber] = useState(null);
    const [message, setMessage] = useState(null);

    return (
        <>
        <form onSubmit={handleSubmit}>
            {message && <AlertMessage type='danger' message={message} />}
            <p>Enter an email address below to find a Subscriber</p>
            <FormGroup
                name='email'
                type='search'
                label='Email Address'
                value={values.email}
                onChange={onChange}
                disabled={loading}
            />
            <div style={{margin: '.75rem 0'}}>
                <button
                    className='btn btn-block btn-success'
                    type='submit'
                    disabled={!canSubmit(values, errors) || loading}
                >
                    {loading ? 'Loading...' : 'Find'}
                </button>
            </div>
        </form>
        {subscriber && <SubscriberDetails {...subscriber} />}
        </>
    )
}

export default SearchForm;
