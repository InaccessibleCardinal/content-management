import React from 'react';

export default function FileUpload({readFiles}) {
    return (
        <div className="image-field">
            <h2 className="field-header">Step 1 - Upload Your Image/s:</h2>
            <input type="file"
                id="file-input" 
                className="file-upload-input" 
                onChange={function(e) {
                    let files = e.target.files;
                    readFiles(files);
                }}
                multiple 
            />
        </div>
    );
}