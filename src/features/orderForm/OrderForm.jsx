import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import DeliveryField from '../../common/components/formFields/deliveryField/DeliveryField';
import DateField from '../../common/components/formFields/dateField/DateField';
import TimeField from '../../common/components/formFields/timeField/TimeField';
import AddressField from '../../common/components/formFields/addressField/AddressField';
import CommentField from '../../common/components/formFields/commentField/CommentField';
import 'react-datepicker/dist/react-datepicker.css';
import './orderForm.css';


export default function OrderForm (props) {
    const deliveryOption = useSelector(state => state.form.delivery);
    console.log('deliveryOption: ', deliveryOption);

    const datePickerRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} className='order-form'>
            <DeliveryField />
            <DateField
                readyDate={props.readyDate}
                setReadyDate={props.setReadyDate}
                setReadyTime={props.setReadyTime}
                datePickerRef={datePickerRef}
            />
            <TimeField
                readyTime={props.readyTime}
                readyDate={props.readyDate}
                setReadyTime={props.setReadyTime}
            />
            { deliveryOption === 'delivery' && 
                <AddressField 
                    address={props.address}
                    setAddress={props.setAddress}
                />
            }
            <CommentField 
                comment={props.comment}
                // comment={props.comment}
                // setComment={props.setComment}
            />
        </form>
    )
}