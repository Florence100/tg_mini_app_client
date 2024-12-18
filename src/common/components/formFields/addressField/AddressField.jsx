import DOMPurify from 'dompurify';


export default function AddressField(props) {
    const handleAddressChange = (event) => {
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        props.setAddress(sanitizedValue);
    }

    return (
        <div className='text-field-wrap'>
            <textarea
                className='text-field'
                rows='1'
                placeholder='Адрес доставки'
                onChange={handleAddressChange}
            ></textarea>
        </div>
    )
}