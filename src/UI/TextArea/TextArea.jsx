import './textArea.css';


export default function TextArea(props) {
    return (
        <textarea
            className='text-area'
            rows={props.rows}
            placeholder={props.placeholder}
            onChange={props.onChange}
        ></textarea>
    )
}