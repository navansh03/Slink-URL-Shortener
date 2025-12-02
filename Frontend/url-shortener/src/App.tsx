import React from 'react';
import UrlShortener from './components/UrlShortener';
import './styles/App.css';
import './styles/theme.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">URL Shortener</h1>
          <p className="subtitle">Shorten your links in seconds</p>
        </header>
        <UrlShortener />
      </div>
    </div>
  );
};

export default App;