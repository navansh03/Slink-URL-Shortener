import { ShortenUrlRequest, ShortenedUrlResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const shortenUrl = async (
  url: string,
  customShort?: string,
  expiry?: number
): Promise<ShortenedUrlResponse> => {
  const requestBody: ShortenUrlRequest = {
    url,
    ...(customShort && { short: customShort }),
    ...(expiry && { expiry }),
  };

  const response = await fetch(`${API_BASE_URL}/api/v1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to shorten URL');
  }

  return response.json();
};