import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // main component of your app
import { UserProvider } from './Context/UserContext';


// Get the root element from your HTML file
const rootElement = document.getElementById('root');

// Create a root with React 18's createRoot method
const root = ReactDOM.createRoot(rootElement);

// Render your app inside the root
root.render(
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>


  </React.StrictMode>
);
