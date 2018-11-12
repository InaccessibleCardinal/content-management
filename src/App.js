import React, { Component } from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ImageConfig from './components/ImageConfig';
import uuid from './utils/uuid';
import {categories} from './config';
import {
    getFromListById, 
    removeFromListById, 
    updateInListById, 
    $id
} from './utils/utils';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };
        this.removeField = this.removeField.bind(this);
        this.readFiles = this.readFiles.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateImageCategoryList = this.updateImageCategoryList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    removeField(e, uid) {
        e.preventDefault();
        let images = this.state.images;
        let categoryNames = categories.map((c) => c.displayName);
        let textarea = $id(`textarea_${uid}`);
        textarea.value = '';
        textarea.innerText = '';
        categoryNames.forEach((n) => {
            let checkboxID = `${uid}_${n}`;
            let checkbox = $id(checkboxID)
            checkbox.checked = false;
        });
        this.setState({images: removeFromListById(images, uid)});  
    }

    updateImageCategoryList(uid, categoryDisplayName, checked) {
        let images = this.state.images;
        let currentImage = getFromListById(images, uid);
        let currentCategories = [...currentImage.categories];

        let updatedCategories = [];
        
        if (checked) {
            if (currentCategories.indexOf(categoryDisplayName) === -1) { //if not in categories we add
                updatedCategories = [...currentCategories].concat([categoryDisplayName]);
            } else { //else keep categories as is
                updatedCategories = [...currentCategories];
            }
        } else { //if checked is false 
            if (currentCategories.indexOf(categoryDisplayName) > -1) { //if in categories, we remove
                currentCategories.forEach((category) => {
                    if (category !== categoryDisplayName) {
                        updatedCategories.push(category);
                    }
                });
            } else {
                updatedCategories = [...currentCategories];
            }
        }

        let updatedImages = updateInListById(
            images, 
            uid, 
            [
                {name: 'categories', value: updatedCategories}
            ]
        );
        this.setState({images: updatedImages}, () => console.log('new state: ', this.state));

    }

    updateDescription(value, uid) {
        let images = this.state.images;
        let updatedImages = updateInListById(images, uid, [{name: 'description', value: value}]);
        this.setState({images: updatedImages});
    }

    readFiles(files) {
        let imagePromises = [];
        for (let i = 0; i < files.length; ++i) {
        let p = new Promise((resolve, reject) => {
            try {
                let f = files[i];
                let uid = uuid();
                let reader = new FileReader();
                reader.readAsDataURL(f);
                reader.onload = (e) => resolve({
                    src: e.target.result, 
                    uid: uid, 
                    fileName: f.name,
                    description: '',
                    categories: []
                });
                
            } catch {
                reject('image read failed');
            }
        });
            imagePromises.push(p);
        }
        Promise.all(imagePromises)
            .then((values) => this.setState({images: values}))
            .catch((e) => console.log(e));
    }

    handleSubmit() {
        let payload = {images: this.state.images};
        axios.post('http://localhost:9876/images', payload)
            .then((r) => {
                console.log(r.data);
                this.setState({images: []});
                $id('file-input').value = '';
            })
            .catch((e) => console.log('post failed: ', e));
    }

    render() {
        
        let images = this.state.images.map((im, i) => {
            return (
                <ImageConfig 
                    key={im.uid} 
                    b64image={im.src}
                    fileName={im.fileName} 
                    uid={im.uid}
                    removeField={this.removeField}
                    updateImageCategoryList={this.updateImageCategoryList}
                    updateDescription={this.updateDescription} 
                />
            );
        });
        return (
            <div className="App">
                <Header />
                <button onClick={() => console.log(this.state.images)}>Dump State</button>
                <FileUpload 
                    readFiles={this.readFiles}
                />
                {
                    (images.length > 0) && 
                    <div className="image-field">
                        <h2 className="field-header">
                            Step 2 - Configure Your Image/s:
                        </h2>
                    </div>
                }
                {(images.length > 0) && images}
                {(images.length > 0) && <SubmitButton handleSubmit={this.handleSubmit} />}
            </div>
      );
    }
}

export default App;

function SubmitButton({handleSubmit}) {
    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}