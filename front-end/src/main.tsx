import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <App/>

  ,
)
// disabled strict mode
{/* <React.StrictMode>
</React.StrictMode> */}