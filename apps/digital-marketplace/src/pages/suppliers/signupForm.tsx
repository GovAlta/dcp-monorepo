import React from 'react';
import useForm from '../../contexts/useForm';
import { signUpFormConfig } from './config';
import { validateField, validateForm } from '../../utils/forms';
import FormField from '../../components/Input';

export default function SignupForm() {
  const initialValues = {
    orgName: '',
    email: '',
    firstName: '',
    lastName: '',
    website: '',
    agreement: false,
  };

  const {
    values,
    errors,
    success,
    handleChange,
    handleBlur,
    handleSubmitSupplier,
    loading,
    apiError,
  } = useForm(initialValues, validateForm, validateField, signUpFormConfig);

  return (
    <div className="goa-adm-form-container">
      {success ? (
        <section id="sign-up-form" className="goa-adm-sign-up-form">
          <section id="successDiv" className="goa-adm-form-success">
            <h3>Thank you for signing up!</h3>
            <p>
              Visit Alberta Purchasing Connection to explore digital
              opportunities.
            </p>
            <a
              className="goa-adm-button-link"
              href="https://purchasing.alberta.ca/search"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore opportunities
            </a>
          </section>
        </section>
      ) : (
        <section id="sign-up-form" className="goa-adm-sign-up-form">
            <h2>Suppliers sign-up form</h2>
            <div className="goa-adm-form-container">
            <form id="user-form">
              <fieldset>
                <FormField
                  id="org-name"
                  name="orgName"
                  type="text"
                  value={values.orgName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.orgName}
                  label="Organization name"
                  required={true}
                />
                <FormField
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  label="Work email"
                  required={true}
                />
                <div>
                  <label className="label" htmlFor="name">
                    Name <span className="required">*</span>
                  </label>
                  <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                    <div style={{ flex: '1' }}>
                      <FormField
                        id="first-name"
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.firstName}
                        placeholder="First name"
                        required={true}
                      />
                    </div>
                    <div style={{ flex: '1' }}>
                      <FormField
                        id="last-name"
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.lastName}
                        required={true}
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>

                <FormField
                  id="website"
                  name="website"
                  type="url"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.website}
                  label="Website"
                  required={false}
                />

                <div className="goa-field goa-agreement goa--required">
                  <div className="goa-option">
                    <input
                      id="agreement"
                      name="agreement"
                      type="checkbox"
                      checked={values.agreement}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="agreement">
                      I would like to be contacted for future engagements,
                      surveys, and events.
                    </label>
                  </div>
                </div>

                <div className="goa-adm-buttons">
                  <button
                    type="submit"
                    className="goa-adm-button"
                    disabled={loading}
                    onClick={handleSubmitSupplier}
                  >
                    {loading ? 'Submitting...' : 'Submit Form'}
                  </button>
                  {apiError && <div style={{ color: 'red' }}>{apiError}</div>}
                </div>
              </fieldset>
            </form>
            <div className="goa-adm-disclaimer">
              <p>
                The information you provide is being collected under section
                33(c) of the{' '}
                <a
                  href="https://open.alberta.ca/publications/f25"
                  target="_blank"
                >
                  <em>
                    Freedom of Information and Protection of Privacy (FOIP) Act
                  </em>
                </a>{' '}
                and will be protected under the provisions of the Act. Questions
                regarding the collection, use and disclosure may be directed to
                [program area contact info here].
              </p>
            </div>

            <div className="goa-adm-recaptcha">
              <p>
                Protected by reCAPTCHA:
                <br />
                <a href="https://www.google.com/intl/en/policies/privacy/">
                  Privacy
                </a>
                <span>-</span>
                <a href="https://www.google.com/intl/en/policies/terms/">
                  Terms
                </a>
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
