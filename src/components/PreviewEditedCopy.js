import React from 'react';

export default class PreviewEditedCopy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fieldsForPreview: []};
    }

    componentWillReceiveProps(nextProps) {
        let fieldsForPreview = this.props.fieldsForPreview;
        let nextFieldsForPreview = nextProps.fieldsForPreview;
        if (nextFieldsForPreview !== fieldsForPreview) {
            this.setState({fieldsForPreview: nextFieldsForPreview});
        }
    }

    render() {
        let {fieldsForPreview} = this.state;
    
        const previewStyle = {background: '#000', width: '100%', minHeight: '300px', padding: '0.3em 1em'};
        const hStyle = {color: '#eecc00', fontSize: '1.1em'};
        const pStyle = {color: '#fff', fontSize: '0.9em'};

        let content = fieldsForPreview.map((f) => {
            let {uid, type, value, subFields} = f;
            
            if (type === 'H') {

                return <h2 key={`preview_${uid}`} style={hStyle}>{value}</h2>;

            } else if (type === 'P') {

                return <p key={`preview_${uid}`} style={pStyle}>{value}</p>;

            } else if (type === 'L') {

                if (subFields) {
                    let sfListItems = subFields.map((sf) => {
                        let {uid: sfuid, value: sfValue} = sf;
                        return (
                            <li key={sfuid} style={pStyle}>{sfValue}</li>
                        );
                    });
                    return (
                        <ul key={`preview_${uid}`}>
                            {sfListItems}
                        </ul>
                    );
                }  else {

                    return <p key={`preview_${uid}`} style={pStyle}>Add some list items...</p>;

                }              
                
            } else {
                return null;
            }
        });

        return (
            <div>
                <h2 className="field-header">Preview:</h2>
                <div style={previewStyle}>
                    {content}
                </div>
            </div>
        )

    
    }    
}