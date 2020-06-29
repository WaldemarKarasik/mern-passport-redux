import React from 'react'
import {Link} from 'react-router-dom'

export const Category = ({category}) => {
    return (
        <div>
            
            <p>{category.name}</p>
            <div>
            {category.words.map(word=> {
                return (<Link key={word._id} to={`/word/${word.name.toLowerCase()}`} ><p>{word.name}</p></Link>)
            })}
            </div>
            {/* {console.log(category)} */}
        </div>
    )
}