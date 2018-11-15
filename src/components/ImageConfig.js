import React from 'react';
import CatgegoryCheckbox from './CategoryCheckbox';
import {categories} from '../config';
import {escapeSpecialChars} from '../utils/utils';

export default function ImageConfig({
    b64image, 
    uid, 
    fileName, 
    removeField,
    updateImageCategoryList,
    updateDescription
}) {
    
    let checkboxes = categories.map((category) => {
        return category.displayName;
    })
    .map((displayName, i) => {
        return (
            <CatgegoryCheckbox 
                categoryDisplayName={displayName}
                updateImageCategoryList={updateImageCategoryList}
                position={i}
                key={`${displayName}_checkbox`} 
                uid={uid} 
            />
        );
    });

    return (
        <div className="image-field" key={uid}>
            <h3 className="category-header file-name">{fileName} :</h3>
            <img src={b64image} width="200px" alt="" />
            <h3 className="category-header">Assign to categories:</h3>
            <div className="checkboxes-wrapper">
                {checkboxes}
            </div>
            <h3 className="category-header">Give a description:</h3>
            <textarea
                id={`textarea_${uid}`} 
                rows="5" 
                name="description" 
                onBlur={function(e) {
                    let value = e.target.value;
                    if (value.length > 0) {
                        updateDescription(escapeSpecialChars(value), uid);
                    }  
                }} 
            />
            <RemoveButton uid={uid} removeField={removeField} />
        </div>
    );
}

function RemoveButton({removeField, uid}) {
    return (
        <div>
            <button 
                className="remove-button"
                onClick={function(e) {
                    removeField(e, uid);
                }}
            >
                Delete from batch?
            </button>
        </div>
    );
}