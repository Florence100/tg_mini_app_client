import DOMPurify from 'dompurify';
import TextArea from 'UI/TextArea/TextArea';


export default function CommentField(props) {
    const handleCommentChange = (event) => {
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        props.comment.current = sanitizedValue;
    }

    return (
        <TextArea
            rows='1'
            placeholder='Комментарий к заказу'
            onChange={handleCommentChange}
        />
    )
}