import React from 'react';

export default function SuccessMessage({closeModal}) {
    return (
        <div className="modal">
            <p className="modal-text">Post Successful</p>
            <button onClick={closeModal} className="modal-button">OK</button>
        </div>
    );
}