import './counter.css';

function Counter({count, className}) {
    return (
        <div className={'counter ' + className}>
            {count}
        </div>
    )
}

export default Counter;