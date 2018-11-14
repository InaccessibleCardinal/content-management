import React from 'react';

export default function SubmitButton({handleSubmit}) {
    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}