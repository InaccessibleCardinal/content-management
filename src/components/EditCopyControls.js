import React from 'react';

export default function EditCopyControls({addFormField}) {
    return (
        <div className="edit-copy-buttons" style={{padding: '0', width: '100%', margin: '1em auto'}}>
            <button className="navigation-list-item buttons" onClick={() => addFormField('H')}>Add a Headline</button>
            <button className="navigation-list-item buttons" onClick={() => addFormField('L')}>Add a List</button>
            <button className="navigation-list-item buttons" onClick={() => addFormField('P')}>Add a Paragraph</button>
        </div>
    );
}