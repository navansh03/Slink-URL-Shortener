export interface ShortenUrlRequest {
  url: string;
  short?: string;
  expiry?: number;
}

export interface ShortenedUrlResponse {
  url: string;
  short: string;
  expiry: number;
  rate_limit: number;
  rate_limit_reset: number;
}