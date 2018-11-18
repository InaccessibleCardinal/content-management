import React from 'react';

export default function SelectSection({selectCategory, categories}) {
    let options = [{displayName: ''}]
        .concat(categories)
        .map((c) => <option key={c.displayName}>{c.displayName}</option>);
    return (
        <div>
            <select className="category-select" onChange={selectCategory}>
                {options}
            </select>
        </div>
    );
}