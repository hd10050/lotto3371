import { Table } from 'react-bootstrap';
import data from '../data';
import Number from './Number';

function ResultTable(props) {
    return (
        <div className="container">
            <Table striped className="table table-borderless tblTxt align-middle mb-5">
                <thead>
                    <tr>
                        <th>회차</th>
                        <th>날짜</th>
                        <th>당첨번호</th>
                        <th>당첨금액</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, i) =>
                            <tr>
                                <td>{d.round}</td>
                                <td>{d.date}</td>
                                <td>
                                    {
                                        d.num.map((n, i) =>
                                            <Number color={props.colorArr[i > 3 ? 0 : i]} number={n} key={i} />
                                        )
                                    }
                                </td>
                                <td>{d.price}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ResultTable;
