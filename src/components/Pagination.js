import React, { useEffect, useState } from 'react'

function Pagination({ currentPage, total, perPage, onChanged}) {

    const [pageNumber, setPageNumber] = useState(Math.round(total / perPage));


    useEffect(() => {
      setPageNumber(Math.ceil(total / perPage))
    }, [total, perPage])

    // useEffect(() => onChanged(currentPage), [currentPage])
    

    const FormatPage = () => {
        const buttons = [];
        for (let index = 0; index < pageNumber; index++) {
            buttons.push(
                <button onClick={() => { onChanged(index + 1) }} 
                    className={'btn px-2 rounded-circle m-1 ' + (currentPage === index + 1 ? "btn-warning" : "btn-light")} style={{ width: '40px' }}>{index + 1}</button>
            );
        }
        console.log(buttons)
        return buttons
    }

    return (
        <div className='d-flex'>
            <button className='btn btn-light px-0 rounded-circle m-1 shadow-0' 
                onClick={() => { currentPage > 1 && onChanged(currentPage - 1)}}
                disabled={currentPage === 1} style={{ width: '40px' }}>{'<'}</button>
            { <FormatPage />}
            <button className='btn btn-light px-0 rounded-circle m-1 shadow-0' onClick={() => { currentPage < pageNumber && onChanged(currentPage + 1)}} 
                disabled={currentPage === pageNumber} style={{ width: '40px' }}>{'>'}</button>
        </div>
    )
}

export default Pagination