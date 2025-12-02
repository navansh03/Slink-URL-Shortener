import React, { useState } from 'react';
import { ShortenedUrlResponse } from '../types';

interface ShortenedUrlDisplayProps {
  shortenedUrl: ShortenedUrlResponse;
}

const ShortenedUrlDisplay: React.FC<ShortenedUrlDisplayProps> = ({ shortenedUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl.short);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="result-container">
      <h3>Your Shortened URL</h3>
      
      <div className="url-display">
        <div className="url-box">
          <p className="original-url">Original: {shortenedUrl.url}</p>
          <div className="short-url-wrapper">
            <a 
              href={shortenedUrl.short} 
              target="_blank" 
              rel="noopener noreferrer"
              className="short-url"
            >
              {shortenedUrl.short}
            </a>
            <button onClick={handleCopy} className="copy-button">
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>
      </div>

      <div className="url-info">
        <div className="info-item">
          <span className="info-label">Expires in:</span>
          <span className="info-value">{shortenedUrl.expiry} hours</span>
        </div>
        <div className="info-item">
          <span className="info-label">Rate limit remaining:</span>
          <span className="info-value">{shortenedUrl.rate_limit}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Rate limit resets in:</span>
          <span className="info-value">{shortenedUrl.rate_limit_reset} minutes</span>
        </div>
      </div>
    </div>
  );
};

export default ShortenedUrlDisplay;