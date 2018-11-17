import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import UploadPage from './pages/UploadPage';
import EditCopyPage from './pages/EditCopyPage';
import EditImagesPage from './pages/EditImagesPage';
import EditJobsPage from './pages/EditJobsPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 'EditCopyPage',
            pages: ['UploadPage', 'EditCopyPage', 'EditImagesPage', 'EditJobsPage']
        }
       this.navigateTo = this.navigateTo.bind(this);
    }

    navigateTo(page) {
        this.setState({activePage: page});
    }

    renderPage() {
       
        switch(this.state.activePage) {
            case 'UploadPage': {
                return (
                    <UploadPage key='UploadPage' />
                );
            }
            case 'EditCopyPage': {
                return (
                    <EditCopyPage key='EditCopyPage' />
                );
            }
            case 'EditImagesPage': {
                return (
                    <EditImagesPage key='EditImagesPage' />
                );
            }
            case 'EditJobsPage': {
                return (
                    <EditJobsPage key='EditJobsPage' />
                );
            }
            default: {
                return (
                    <UploadPage key='UploadPage' />
                );
            }
        }
    }
    render() {
        return (
            <div>
                <Header />
                <Nav navigateTo={this.navigateTo} />
                <ReactCSSTransitionGroup
                     transitionName="pageForward"
                     transitionEnterTimeout={500}
                     transitionLeaveTimeout={500}
                >
                    {this.renderPage()} 
                </ReactCSSTransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default App;