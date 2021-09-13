import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'video.js/dist/video-js.css';
import reportWebVitals from './reportWebVitals';

import Routes from 'routes';

ReactDOM.render(
  <>
    <div className="flex xl:hidden">
      <nav className="bg-squid fixed w-screen">
        <div className="flex items-center justify-center h-12 px-4 sm:px-12">
          <div className="flex flex-col items-center">
            <p className="text-white text-sm">Smart Traffic Lights</p>
            <p className="text-gray-300 text-xs">(Web Version)</p>
          </div>
        </div>
      </nav>
      <div className="flex flex-col justify-center items-center h-screen w-screen p-4">
        <p className="text-4xl text-center text-gray-700 font-medium">
          Please open in full desktop screen.
        </p>
      </div>
    </div>
    <div className="hidden xl:block">
      <Routes />
    </div>
  </>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
