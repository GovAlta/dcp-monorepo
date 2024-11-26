import React from 'react';
import './styles.css';

interface TextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  label,
  required,
}) => {
  return (
    <div className="goa-field">
      {label && (
        <label className='label' htmlFor={id}>
          {label} {required ? <span className="required">*</span> : <span className="optional">[optional]</span>}{}
        </label>
      )}

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={error ? 'inputError' : ''}
      />
      {error && <strong className="error goa-error">{error}</strong>}
    </div>
  );
};

export default Textarea;
