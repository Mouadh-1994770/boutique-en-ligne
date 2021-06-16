import React from 'react'
function Pagination(props) {
    const numeroDePage = []
    for (let index = 1; index <= Math.ceil(props.totalPublication / props.pagePublier); index++) {
        numeroDePage.push(index);
    }
    return (
        <nav>
            <ul className="pagination">
                {numeroDePage.map((numero) =>
                    <li className="page-item">
                        <a href="#"
                            onClick={() => props.publication(numero)}
                            className='page-link'>{numero}</a>
                    </li>
                )}
            </ul>
        </nav>
    )
} export default Pagination