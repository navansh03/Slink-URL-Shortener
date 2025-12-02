import React from 'react';

interface CustomUrlInputProps {
  customShort: string;
  expiry: number;
  onCustomShortChange: (value: string) => void;
  onExpiryChange: (value: number) => void;
}

const CustomUrlInput: React.FC<CustomUrlInputProps> = ({
  customShort,
  expiry,
  onCustomShortChange,
  onExpiryChange,
}) => {
  return (
    <div className="custom-options">
      <div className="input-group">
        <label htmlFor="customShort">Custom Short URL (optional)</label>
        <input
          id="customShort"
          type="text"
          placeholder="my-custom-link"
          value={customShort}
          onChange={(e) => onCustomShortChange(e.target.value)}
          className="custom-input"
        />
      </div>

      <div className="input-group">
        <label htmlFor="expiry">Expiry (hours)</label>
        <input
          id="expiry"
          type="number"
          min="1"
          max="168"
          value={expiry}
          onChange={(e) => onExpiryChange(Number(e.target.value))}
          className="custom-input"
        />
      </div>
    </div>
  );
};

export default CustomUrlInput;