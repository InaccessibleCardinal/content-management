import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SelectSection from '../components/SelectSection';
import EditCopyControls from '../components/EditCopyControls';
import FormField from '../components/FormField';
import {categories} from '../config';
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
        this.selectCategory = this.selectCategory.bind(this);
    }
    selectCategory(e) {
        console.log('category selected: ', e.target.value);
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
                <SelectSection categories={categories} selectCategory={this.selectCategory} />
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
    
        const previewStyle = {background: '#000', width: '100%', minHeight: '300px', padding: '0.3em 1em'};
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