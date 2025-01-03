import DOMPurify from 'dompurify';
import TextField from '../textField/TextField';


export default function CommentField(props) {
    const handleCommentChange = (event) => {
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        props.setComment(sanitizedValue);
    }

    return (
        <TextField 
            rows='1'
            placeholder='Комментарий к заказу'
            onChange={handleCommentChange}
        />
    )
}