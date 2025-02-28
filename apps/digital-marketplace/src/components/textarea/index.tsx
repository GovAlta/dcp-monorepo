import React from 'react';
import './styles.css';

interface TextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
  error?: string | null;
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
        <label className="label" htmlFor={id}>
          {label}{' '}
          {required ? (
            <span className="required">*</span>
          ) : (
            <span className="optional">[optional]</span>
          )}
          {}
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
