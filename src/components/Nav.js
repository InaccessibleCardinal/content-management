import React from 'react';

export default function Nav({navigateTo}) {
    return (
        <div className="navigation">
            <ul className="navigation-list">
                <li className="navigation-list-item" onClick={() => navigateTo('UploadPage')}>Upload Images</li>
                <li className="navigation-list-item" onClick={() => navigateTo('EditCopyPage')}>Edit Copy</li>
                <li className="navigation-list-item" onClick={() => navigateTo('EditImagesPage')}>Edit Images</li>
                <li className="navigation-list-item" onClick={() => navigateTo('EditJobsPage')}>Edit jobs</li>
            </ul>
        </div>
    );
}