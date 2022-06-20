const findSubscriber = require('./helpers/findSubscriber');
const formattedReturn = require('./helpers/formattedReturn');

exports.handler = async event => {
    const { email } = JSON.parse(event.body);

    const res = await findSubscriber(email);

    if (!res.success) return formattedReturn(500, res);
    if (res.message) return formattedReturn(400, { success: false, message: res.message });
    return formattedReturn(200, res);
}
