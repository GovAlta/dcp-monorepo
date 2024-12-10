import React from 'react';
import useForm from '../../contexts/useForm';
import { signUpFormConfig } from './config';
import { validateField, validateForm } from '../../utils/forms';
import FormField from '../../components/Input';
import { SignupType } from '../../contexts/constants';

export default function SignupForm() {
  const initialValues = {
    orgName: '',
    email: '',
    firstName: '',
    lastName: '',
    website: '',
    agreement: false,
    signUpType: '',
  };

  const {
    values,
    errors,
    success,
    handleChange,
    handleBlur,
    handleSubmit,
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
          <h2>Sign-up form</h2>
          <div className="goa-adm-form-container">
            <form id="user-form">
              <fieldset>
                <fieldset className="goa-adm-group-radio adm-single-column">
                    <legend>Are you a supplier or a community partner? <span className="required">*</span></legend>
                    <div className="goa-option">
                        <input
                            id="supplier"
                            className={errors.signUpType ? "inputError": ""}
                            name="signUpType"
                            type="radio"
                            onChange={handleChange}
                            value={SignupType.SUPPLIER}
                            required={true}
                        />
                        <label htmlFor="supplier">
                            Supplier - Digital services provider
                        </label>
                    </div>
                    <div className="goa-option">
                        <input
                            id="community-partner"
                            className={errors.signUpType ? "inputError": ""}
                            name="signUpType"
                            type="radio"
                            onChange={handleChange}
                            value={SignupType.COMMUNITY_PARTNER}
                            required={true}
                        />
                        <label htmlFor="community-partner">
                            Community Partner - Digitally curious Albertan, another government or community organization
                        </label>
                    </div>
                    { errors.signUpType && <strong className="error goa-error">{errors.signUpType}</strong> }
                </fieldset>

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
                  <div className="goa-field-split">
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
                    onClick={handleSubmit}
                  >
                    {loading ? 'Submitting...' : 'Submit Form'}
                  </button>
                  {apiError && <div style={{ color: 'red' }}>{apiError}</div>}
                </div>
              </fieldset>
            </form>
            <div className="goa-adm-disclaimer">
              <p>
                The personal information collected is for the Procurement Concierge Program, Alberta Digital Marketplace, an initiative of Digital Design and Delivery branch, Ministry of Technology and Innovation. This collection is authorized by section 33 of <a
                  href="https://open.alberta.ca/publications/f25"
                  target="_blank"
                >
                    <em>Freedom of Information and Protection of Privacy (FOIP) Act
                    </em>
                </a>{' '}. For questions about the collection of personal information, contact the Outreach Team at 587-990-5540, by email at <a
                    href="mailto:digital.Outreach@gov.ab.ca"
                    target="_blank"
                >
                  digital.outreach@gov.ab.ca
                </a>, or mail to 9942-108 Street, Edmonton, Alberta, T5K 2J5.
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
