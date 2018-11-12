import 'promise-polyfill/src/polyfill';
import './utils/polyfills/arrayFilter';
import './utils/polyfills/arrayFind';
import './utils/polyfills/arrayMap';
import './utils/polyfills/objectAssign';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
