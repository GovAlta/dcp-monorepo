import React from 'react';
import './styles.css';

interface FormFieldProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  label,
  required,
  placeholder
}) => {
  return (
    <div className="goa-field">
      {label && (
        <label className='label' htmlFor={id}>
          {label} {required ? <span className="required">*</span> : <span className="optional">[optional]</span>}{}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={error ? 'inputError' : ''}
      />
      {error && <strong className="error goa-error">{error}</strong>}
    </div>
  );
};

export default FormField;
