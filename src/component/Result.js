
import Number from './Number'

function Result(props) {
    return (
        <div className="container fixedclear" style={{ backgroundColor: "#11629c" }}>
            <img width="30%" className="cursorPointer" src={process.env.PUBLIC_URL + '/img/prev.png'} style={{ float: "left" }} onClick={() => { props.prevBtn() }} />
            <img width="30%" className="cursorPointer" src={process.env.PUBLIC_URL + '/img/next.png'} style={{ float: "right" }} onClick={() => { props.nextBtn() }} />
            <div className="container col-6 p-5 whiteTxt" >
                <h2>{props.data.round} 회 당첨결과</h2>
                <h4 className="mb-3">( {props.data.date} 추첨 )</h4>

                {
                    props.data.num.map((num, i) =>
                        <Number color={props.colorArr[i > 3 ? 0 : i]} number={num} key={i} />
                    )
                }
                <h4 className="mt-3">당첨금액</h4>
                <h1>{props.data.price}</h1>
            </div>


        </div>
    )
}

export default Result;