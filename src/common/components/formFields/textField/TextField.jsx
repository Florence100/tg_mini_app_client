import './textField.css';


export default function TextField(props) {
    return (
        <textarea
            className='text-field'
            rows={props.rows}
            placeholder={props.placeholder}
            onChange={props.onChange}
        ></textarea>
    )
}