import React from 'react';

export default class CatgegoryCheckbox extends React.Component {
    //props//({categoryDisplayName, updateImageCategoryList, uid}) {
    constructor(props) {
        super(props);
        this.state = {
            componentID: '',
            checked: false
        };
        this.toggleChecked = this.toggleChecked.bind(this);
    }
    componentWillMount() {
        let {uid} = this.props;
        this.setState({
            componentID: uid,
        });
    }
    componentWillUnmount() {
        this.setState({checked: false});
    }
    
    toggleChecked() {
        this.setState({checked: !this.state.checked});
    }
    render() {
        let {categoryDisplayName, updateImageCategoryList, uid} = this.props;
        let _this = this;
        return (
            <div className="category-container">
                <label className="category-label" htmlFor="wood">
                    {categoryDisplayName}: 
                </label>
                <input 
                    type="checkbox" 
                    name={categoryDisplayName} 
                    className="category-checkbox"
                    id={`${uid}_${categoryDisplayName}`}
                    checked={this.state.checked}
                    onChange={function(e) {
                        let checkedValue = e.target.checked;
                        _this.toggleChecked();
                        updateImageCategoryList(uid, categoryDisplayName, checkedValue);
                    }} 
                />
            </div>
        );

    }
    
}