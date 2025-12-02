import React, { useState, FormEvent } from 'react';

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onUrlSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="url-input-form">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your long URL here..."
        className="url-input"
        required
      />
      <button type="submit" className="submit-button">
        Shorten
      </button>
    </form>
  );
};

export default UrlInput;