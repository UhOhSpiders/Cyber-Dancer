import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json'

Amplify.configure(config);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
    </React.StrictMode>
  ,
)
