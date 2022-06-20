const axios = require('axios');
const { API_BASE_URL, API_SECRET } = require('./constants');

const URL = `${API_BASE_URL}/subscribers?api_secret=${API_SECRET}&email_address=`;

module.exports = async email => {
    try {
        const res = await axios.get(`${URL}${email}`);
        const subscribers = res.data.subscribers;
        if (!subscribers.length) return { success: true, message: 'Contact does not exist' };
        return { success: true, data: {
            first_name: subscribers[0].first_name,
            last_name: subscribers[0].fields.last_name,
            email: subscribers[0].email_address,
            phone: subscribers[0].fields.phone
        }};
    } catch (err) {
        return { success: false, message: err.message }
    }
};
