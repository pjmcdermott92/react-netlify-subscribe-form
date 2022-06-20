const axios = require('axios');
const formattedReturn = require('./helpers/formattedReturn');
const { API_BASE_URL, API_KEY, FORM_ID } = require('./helpers/constants');
const findSubscriber = require('./helpers/findSubscriber');

const URL = `${API_BASE_URL}/forms/${FORM_ID}/subscribe`;

exports.handler = async event => {
    const { first_name, last_name, email, phone } = JSON.parse(event.body);

    const postData = {
        api_key: API_KEY,
        email,
        first_name,
        fields: { last_name, phone }
    };

    try {
        const res = await findSubscriber(email);
        if (!res.success) throw new Error('An error occured');
        if (res.data) throw new Error('Email address already subscribed');

        await axios.post(URL, postData);
        return formattedReturn(201, { success: true });
    } catch (err) {
        return formattedReturn(400, { success: false, message: err.message });
    }
}