import { useState } from 'react';

const useForm = (callback, initialState = {}, validate) => {
    const [state, setState] = useState(initialState);

    const handleChange = e => {
        const { name, value } = e.target;
        e.persist();
        setState({ ...state, [name]: value });
        validate && validate({ name, value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await callback();
    }

    const clearForm = () => setState(initialState);

    return [state, handleChange, handleSubmit, clearForm ];
}

export default useForm;
