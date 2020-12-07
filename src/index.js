import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAJjGmO_zVpvp_bFamOhXADf1FQevB1L4Y",
    authDomain: "facedetection-cmpe297.firebaseapp.com",
    projectId: "facedetection-cmpe297",
    storageBucket: "facedetection-cmpe297.appspot.com",
    messagingSenderId: "724468745806",
    appId: "1:724468745806:web:3cf17abe6356d16c7e251f",
    measurementId: "G-NZK4804CH2"
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
