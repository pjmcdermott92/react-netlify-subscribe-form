export const formatTelephone = phoneString => {
    const cleaned = ('' + phoneString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) return `(${match[1]}) ${match[2]}-${match[3]}`;
    return phoneString;
}

export const canSubmit = (values, errors) => {
    let canSubmit = false;
    const keys = Object.keys(values);
    if (keys.length) keys.forEach(key => {
        if (values[key].length < 1 || values[key] === '') canSubmit = false;
        else canSubmit = true;
    });
    if (Object.keys(errors).length) canSubmit = false;
    return canSubmit;
}

export const makeApiRequest = async (url, body) => {
    if (body) body = JSON.stringify(body);

    try {
        const res = await fetch(`api/${url}/`, { method: 'POST', body });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        return { success: true, data: json.data };
    } catch (err) {
        return { success: false, message: err.message };
    }
}
