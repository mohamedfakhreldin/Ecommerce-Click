import React from 'react'

export default function CustomDiaglog({children,toggle}) {
    return (
        <>
    <div onClick={toggle} className={'overlay'}>


</div>
<dialog open style={{marginTop:window.scrollY+'px'}} className={'dialog'}>
{children}
</dialog>
        </>
    )
}
