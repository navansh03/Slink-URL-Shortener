import { useState } from 'react';
import { shortenUrl } from '../utils/api';
import { ShortenedUrlResponse } from '../types';

export const useUrlShortener = () => {
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrlResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customShort, setCustomShort] = useState('');
  const [expiry, setExpiry] = useState(24);

  const handleShorten = async (longUrl: string) => {
    setLoading(true);
    setError(null);
    setShortenedUrl(null);

    try {
      const result = await shortenUrl(longUrl, customShort, expiry);
      setShortenedUrl(result);
      setCustomShort('');
    } catch (err: any) {
      setError(err.message || 'Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    shortenedUrl,
    loading,
    error,
    customShort,
    expiry,
    setCustomShort,
    setExpiry,
    handleShorten,
  };
};