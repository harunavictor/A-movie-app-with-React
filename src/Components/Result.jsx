import React from 'react'

const Result = ({result,openPopUp}) => {
    return (
        <div className='result'onClick={()=>openPopUp(result.imdbID)}>
            <img src={result.Poster} alt="" />
            <h3>{result.Title}</h3>
        </div>
    )
}

export default Result
