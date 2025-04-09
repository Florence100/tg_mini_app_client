import './radioInput.css';


export default function RadioInput (props) {
    return (
        <label>
            <input
                type='radio'
                id={props.id}
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
            />
            <span className='custom-radio'></span>
            <span>{ props.label }</span>
        </label>
    )
}