import React from 'react';

export default class FormField extends React.Component {
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