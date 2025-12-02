import React from 'react';
import UrlInput from './UrlInput';
import CustomUrlInput from './CustomUrlInput';
import ShortenedUrlDisplay from './ShortenedUrlDisplay';
import { useUrlShortener } from '../hooks/useUrlShortener';

const UrlShortener: React.FC = () => {
  const {
    shortenedUrl,
    loading,
    error,
    customShort,
    expiry,
    setCustomShort,
    setExpiry,
    handleShorten,
  } = useUrlShortener();

  return (
    <div className="url-shortener">
      <UrlInput onUrlSubmit={handleShorten} />
      
      <CustomUrlInput
        customShort={customShort}
        expiry={expiry}
        onCustomShortChange={setCustomShort}
        onExpiryChange={setExpiry}
      />

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Shortening your URL...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {shortenedUrl && !loading && (
        <ShortenedUrlDisplay shortenedUrl={shortenedUrl} />
      )}
    </div>
  );
};

export default UrlShortener;