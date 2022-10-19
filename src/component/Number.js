
function Number(props) {
    return (
        <span className="num" style={{ borderColor: props.color }}>
            <span className="numSpan" style={{ borderColor: props.color }} >{props.number}</span>
        </span>
    )
}

export default Number;