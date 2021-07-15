import React, { useState } from 'react'
import './SelectComp.css'

export function SelectComp({localTag, setLocalTag, tags }) {
    const [drop, setDrop] = useState(false);

    return (
        <div className="select-comp">
            <button
                onClick = {() => setDrop(!drop)}
                className="drop-btn">
                {localTag}
            </button>   
            { drop && <div className="dropdown-content">
                <div
                    onClick={() => {
                        setLocalTag("All Notes")
                        setDrop(false)
                    }}
                    className="dropdown-item">
                    No Tag
                </div>
                {
                    tags.map((tag, index) => {
                        return (
                            <div
                                onClick={() => {
                                    setLocalTag(tag)
                                    setDrop(false)
                                }}
                                className="dropdown-item"
                                key={index}>
                                {tag}
                            </div>
                        )
                    })
                }
            </div>}
        </div>
    )
}

