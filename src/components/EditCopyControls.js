import React from 'react';

export default function EditCopyControls({addFormField}) {
    return (
        <div className="edit-copy-buttons" style={{padding: '0', width: '100%', margin: '1em auto'}}>
            <button id="btn_H" className="navigation-list-item buttons" onClick={addFormField}>
                Add a Headline
            </button>
            <button id="btn_L" className="navigation-list-item buttons" onClick={addFormField}>
                Add a List
            </button>
            <button id="btn_P" className="navigation-list-item buttons" onClick={addFormField}>
                Add a Paragraph
            </button>
        </div>
    );
}