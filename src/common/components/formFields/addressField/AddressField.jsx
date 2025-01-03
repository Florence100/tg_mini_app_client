import DOMPurify from 'dompurify';
import TextField from '../textField/TextField';


export default function AddressField(props) {
    const handleAddressChange = (event) => {
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        props.setAddress(sanitizedValue);
    }

    return (
        <TextField 
            rows='1'
            placeholder='Адрес доставки'
            onChange={handleAddressChange}
        />
    )
}