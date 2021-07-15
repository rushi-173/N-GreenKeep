import React from 'react'
import './ToastComp.css'

export function ToastComp({showToast, variant, message}) {
    return (
        <div className={showToast ? `toast-comp ${variant}` : `toast-comp hide-toast ${variant}`}>
            {/* <div className="toast-head">{variant}</div> */}
            <div className="toast-msg">{message}</div>
        </div>
    )
}

