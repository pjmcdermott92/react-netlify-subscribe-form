import './AlertMessage.scss';

const AlertMessage = ({ type, title, message }) => (
    <div className='alertMessage' data-type={type}>
        {title && <h3>{title}</h3>}
        <p>{message}</p>
    </div>
);

AlertMessage.defaultProps = {
    type: 'success',
    title: null,
    message: 'This is an alert message.'
}

export default AlertMessage;
