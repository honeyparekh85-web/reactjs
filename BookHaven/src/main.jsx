import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import './index.css';

// Firebase Auth only allows localhost by default, not 127.0.0.1
if (window.location.hostname === '127.0.0.1') {
  window.location.replace(window.location.href.replace('127.0.0.1', 'localhost'));
}

const AuthProvider = ({ children }) => {
  useFirebaseAuth();
  return children;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
