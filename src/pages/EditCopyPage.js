import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import uuid from '../utils/uuid';
import {removeFromListById, updateInListById} from '../utils/utils';

const wrapperStyle = {
    width: '90%',
    margin: 'auto'
};
export default class EditCopyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: []
        }
        this.updateValue = this.updateValue.bind(this);
        this.addFormField = this.addFormField.bind(this);
        this.deleteField = this.deleteField.bind(this);
    }
    updateValue(e, uid) {
        let value = e.target.value;
        let fields = this.state.fields;
        let res = updateInListById(fields, uid, [{name: 'value', 'value': value}])
        this.setState({fields: res});
    }
    addFormField(type) {
        let newFields = this.state.fields
        .concat([
            {
                type: type, 
                value: '', 
                uid: `field_${uuid()}`
            }
        ]);
        this.setState({fields: newFields});
    }
    deleteField(uid) {
        this.setState({fields: removeFromListById(this.state.fields, uid)})
    }
    render() {
        let fields = this.state.fields;

        let formFields = fields.map((f) => {
            let {uid} = f;
            return (
                <FormField 
                    field={f} 
                    updateValue={this.updateValue}
                    deleteField={this.deleteField} 
                    key={uid}
                />
            );
        });
        return (
            <div className="edit-copy-wrapper" style={wrapperStyle}>
                <div className="image-field edit-copy">
                    <h2 className="field-header">Edit Copy</h2>
                </div>
                <EditCopyControls addFormField={this.addFormField} />
                <div style={{overflow: 'hidden'}}>
                    <ReactCSSTransitionGroup
                        transitionName="slideField"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {formFields}
                    </ReactCSSTransitionGroup>
                </div>
                <PreviewEditedCopy fieldsForPreview={fields} />
            </div>
        );
    }
    
}

function EditCopyControls({addFormField}) {
    return (
        <div className="edit-copy-buttons" style={{padding: '0', width: '100%', margin: '1em auto'}}>
            <button onClick={() => addFormField('H')}>Add a Headline</button>
            <button onClick={() => addFormField('L')}>Add a List</button>
            <button onClick={() => addFormField('P')}>Add a Paragraph</button>
        </div>
    );
}

class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: '', subFields: []};
        this.addSubField = this.addSubField.bind(this);
    }

    componentWillMount() {
        let {type} = this.props.field;
        this.setState({type});
    }
    
    renderInputs() {
        let type = this.state.type;
        let {updateValue, field} = this.props;
        let {uid} = field;
        if (type === 'H') {
           return (
                <input className="edit-copy-input" type="text" onChange={(e) => updateValue(e, uid)}/>
           ); 
        } else if (type === 'P') {
            return (
                <textarea className="edit-copy-textarea" rows="5" onChange={(e) => updateValue(e, uid)}/>
            );
        } else if (type === 'L') {
            return (
                <ListForm />
            );
        }
    }
    
    addSubField() {
        return false;
    }

    render() {
        let type = this.state.type;
        let typeText;
        if (type === 'H') {
            typeText = '<h>';
        } else if (type === 'P') {
            typeText = '<p>';
        } else if (type === 'L') {
            typeText = '<ul>';
        }
        let {deleteField, field} = this.props; 
        let {uid} = field;
        
        return (
            <div style={{width: '100%', padding: '0.3em', display: 'flex'}}>
                <div style={{flex: 1}}>
                    <label className="html-label">{typeText}</label>
                </div>
                <div style={{flex: 8, padding: '0.3em'}}>
                    {this.renderInputs()}
                </div>
                <div style={{flex: 1, textAlign: 'center'}}>
                    <button className="edit-copy-x-button" onClick={() => deleteField(uid)}>X</button>
                </div>
            </div>
            
        );
    }
    

}

function ListForm() {
    return (
        <p>...a dynamic list of inputs goes here</p>
    );
}

class PreviewEditedCopy extends React.Component {
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
    
        const previewStyle = {background: '#000', width: '100%', minHeight: '300px'};
        const hStyle = {'color': '#eecc00'};
        const pStyle = {'color': '#fff'};

        let content = fieldsForPreview.map((f) => {
            let {uid, type, value} = f;
            
            if (type === 'H') {
                return <h2 key={`preview_${uid}`} style={hStyle}>{value}</h2>;
            } else if (type === 'P') {
                return <p key={`preview_${uid}`} style={pStyle}>{value}</p>;
            } else if (type === 'L') {
                return <p key={`preview_${uid}`} style={pStyle}>coming soon...</p>
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