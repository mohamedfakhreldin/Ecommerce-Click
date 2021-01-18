import React from 'react'

export default function Table(props) {
    return (
        <table className="table table-hover">


        <thead >
            <tr>
               { props.columns.map((column,index)=>

               <th key={index}>{column}</th>
               )}

            </tr>
        </thead>
        <tbody >

                    {props.children}


        </tbody>
    </table>
    )
}
