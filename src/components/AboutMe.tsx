import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AboutMe />
  </React.StrictMode>
);


function AboutMe() {
    return (
        <h1>
          Chrissy G
        </h1>
    )
}