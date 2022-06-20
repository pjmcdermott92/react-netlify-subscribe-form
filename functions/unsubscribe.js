const axios = require('axios');
const formattedReturn = require('./helpers/formattedReturn');
const findSubscriber = require('./helpers/findSubscriber');
const { API_BASE_URL, API_SECRET } = require('./helpers/constants');

const URL = `${API_BASE_URL}/unsubscribe`

exports.handler = async event => {
    const { email } = JSON.parse(event.body);

    try {
        const res = await findSubscriber(email);
        if (!res.success) throw new Error();
        if (res.message) return formattedReturn(400, { success: false, message: res.message });

        await axios.put(URL, { api_secret: API_SECRET, email });
        return formattedReturn(200, { success: true });

    } catch (err) {
        return formattedReturn(500, { success: false, message: 'An error occured' });
    }
}
