import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SelectSection from '../components/SelectSection';
import EditCopyControls from '../components/EditCopyControls';
import FormField from '../components/FormField';
import PreviewEditedCopy from '../components/PreviewEditedCopy';
import SubmitButton from '../components/SubmitButton';
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
        this.getSubFieldData = this.getSubFieldData.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
    }
    selectCategory(e) {
        console.log('category selected: ', e.target.value);
    }
    updateValue(e) {
        let target = e.target;
        let {value: v, id: uid} = target;
        let fields = this.state.fields;
        let res = updateInListById(fields, uid, [{name: 'value', value: v}]);
        this.setState({fields: res});
    }
    addFormField(e) {
        let type = e.target.id.replace('btn_', '');
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

    deleteField(e) {       
        let uid = e.target.id.replace('btn_', '');
        this.setState({fields: removeFromListById(this.state.fields, uid)});
    }

    getSubFieldData(uid, data) {
        let fields = this.state.fields;
        let res = updateInListById(fields, uid, [{name: 'subFields', value: data}]);
        this.setState({fields: res});
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
                    getSubFieldData={this.getSubFieldData} 
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
                <SubmitButton handleSubmit={() => {}} />
            </div>
        );
    }
    
}