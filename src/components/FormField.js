import React from 'react';
import uuid from '../utils/uuid';
import {removeFromListById, updateInListById} from '../utils/utils';

export default class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: '', subFields: []};
        this.addSubField = this.addSubField.bind(this);
        this.removeSubField = this.removeSubField.bind(this);
        this.updateSubFieldValue = this.updateSubFieldValue.bind(this);
    }

    componentWillMount() {
        let {type} = this.props.field;
        this.setState({type});
    }
    
    renderInputs() {
        let {type, subFields} = this.state;
        let {updateValue, field} = this.props;
        let {uid} = field;
        
        if (type === 'H') {
           return (
                <input id={uid} className="edit-copy-input" type="text" onChange={updateValue} />
           ); 
        } else if (type === 'P') {
            return (
                <textarea id={uid} className="edit-copy-textarea" rows="5" onChange={updateValue} />
            );
        } else if (type === 'L') {
            return (
                <ListForm 
                    addSubField={this.addSubField}
                    removeSubField={this.removeSubField}
                    updateSubFieldValue={this.updateSubFieldValue} 
                    subFields={subFields} 
                />
            );
        }
    }
    //only for type ListForm
    addSubField() {
        let newSubFields = this.state.subFields.concat({value: '', uid: uuid()});
        this.setState({subFields: newSubFields});
        let {field, getSubFieldData} = this.props;
        let {uid} = field;
        getSubFieldData(uid, newSubFields);
    }
    //only for type ListForm
    removeSubField(e) {       
        let uid = e.target.id.replace('btn_', '');
        let newSubFields = removeFromListById(this.state.subFields, uid);
        this.setState({subFields: newSubFields});
        let {field, getSubFieldData} = this.props;
        let {uid: parentUID} = field;
        getSubFieldData(parentUID, newSubFields);
    }
    //only for type ListForm
    updateSubFieldValue(e) {
        let target = e.target;
        let {id: uid, value: v} = target;
        let updatedSubFields = updateInListById(this.state.subFields, uid, [{name: 'value', value: v}]);
        this.setState({subFields: updatedSubFields});
        let {field, getSubFieldData} = this.props;
        let {uid: parentUID} = field;
        getSubFieldData(parentUID, updatedSubFields);
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
                    <button id={`btn_${uid}`} className="edit-copy-x-button" onClick={deleteField}>X</button>
                </div>
            </div>
            
        );
    }
    

}

function ListForm({addSubField, updateSubFieldValue, removeSubField, subFields}) {
    const subFieldStyle = {display: 'block', width: '100%', margin: '0.3em 0'};
    let listItems = subFields.map((obj) => {

        let {uid} = obj;
        return (
            <div key={uid}>
                <input 
                    id={uid} 
                    style={subFieldStyle} 
                    type="text" 
                    onBlur={updateSubFieldValue} 
                    placeholder={uid} 
                />
                <button id={`btn_${uid}`} onClick={removeSubField}>X</button>
            </div>
        );
    });
    return (
        <div>
            <button onClick={addSubField}>Add</button>
            {listItems}
        </div>
    );
}