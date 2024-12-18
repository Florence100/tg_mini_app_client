import DOMPurify from 'dompurify';


export default function CommentField(props) {
    const handleCommentChange = (event) => {
        const sanitizedValue = DOMPurify.sanitize(event.target.value);
        props.setComment(sanitizedValue);
    }

    return (
        <div className='text-field-wrap'>
            <textarea
                className='text-field'
                rows='1'
                placeholder='Комментарий к заказу'
                onChange={handleCommentChange}
            ></textarea>
        </div>
    )
}