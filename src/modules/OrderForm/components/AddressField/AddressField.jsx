import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { addressChange } from '../../store/formSlice';
import DOMPurify from 'dompurify';
import TextArea from 'UI/TextArea/TextArea';


export default function AddressField(props) {
    console.log('---AddressField---');
    const dispatch = useDispatch();
    const [localAddress, setLocalAddress] = useState('');

    const debouncedUpdate = useRef(
        debounce((value) => {
            dispatch(addressChange(DOMPurify.sanitize(value)));
        }, 500)
    ).current;

    const handleAddressChange = (event) => {
        setLocalAddress(event.target.value);
        debouncedUpdate(event.target.value);
    };

    return (
        <TextArea 
            rows='1'
            placeholder='Адрес доставки'
            onChange={handleAddressChange}
            value={localAddress}
        />
    )
}