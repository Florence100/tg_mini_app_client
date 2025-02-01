import DOMPurify from 'dompurify';
import TextArea from '../../../../UI/TextArea/TextArea';


export default function AddressField(props) {
    const handleAddressChange = (event) => {
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        props.setAddress(sanitizedValue);
    }

    return (
        <TextArea 
            rows='1'
            placeholder='Адрес доставки'
            onChange={handleAddressChange}
        />
    )
}