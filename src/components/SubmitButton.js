import React from 'react';

export default function SubmitButton({handleSubmit}) {
    return (
        <div className="submit-button-container">
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    );
}