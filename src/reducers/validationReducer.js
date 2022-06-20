const EMAIL_PATERN = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
const PHONE_PATTERN = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);

const validationReducer = (state, payload) => {
    const { name, value } = payload;

    switch(name) {
        case 'email':
            if (!EMAIL_PATERN.test(value)) return {
                ...state, email: 'Invalid Email Address'
            }
            else {
                delete(state.email);
                return state
            }
        case 'phone':
            
            if (/^\d{10}$/.test(value)) {
                delete(state.phone);
                return state;
            }
            if (!PHONE_PATTERN.test(value)) return {
                ...state, phone: 'Invalid Phone Number'
            }
            else {
                delete(state.phone);
                return state;
            }
        default: return state
    }
}

export default validationReducer;
