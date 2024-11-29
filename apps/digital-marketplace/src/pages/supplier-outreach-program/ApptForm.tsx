import React, { useState } from 'react';
import useForm from '../../contexts/useForm';
import { apptFormConfig } from './config';
import { validateField, validateForm } from '../../utils/forms';
import FormField from '../../components/Input';
import Textarea from '../../components/textarea';
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/themes/material_green.css";

export default function ApptForm() {
  const initialValues = {
    orgName: '',
    email: '',
    firstName: '',
    lastName: '',
    website: '',
    date: '',
    comments: '',
    agreement: false,
  };

  const {
    values,
    errors,
    success,
    handleChange,
    handleBlur,
    handleSubmitPartner,
    loading,
    apiError,
  } = useForm(initialValues, validateForm, validateField, apptFormConfig);

  // State to track the selected contact method
  const [contactMethod, setContactMethod] = useState(null);

  // Handler to update the selected contact method
  const handleContactMethodChange = (event: any) => {
    setContactMethod(event.target.value);
  };

  return (
    <div className="goa-adm-form-container">
      {success ? (
        <section id="sign-up-form" className="goa-adm-sign-up-form">
          <section id="successDiv" className="goa-adm-form-success">
            <h3>Thank you for requesting a consultation.</h3>
            <p>We will get back to you shortly to confirm your advisory meeting.</p>
            <p>Meanwhile, check out the links below:</p>
            <p className="links"><a href="/understanding-procurement/" rel="noopener noreferrer">Understanding procurement</a></p>
            <p className="links"><a href="https://purchasing.alberta.ca/support" target="_blank" rel="noopener noreferrer">Alberta Purchasing Connection Help Centre</a></p>
            <p className="links"><a href="/join/" rel="noopener noreferrer">Join Alberta Digital Marketplace</a></p>
          </section>
        </section>
      ) : (
        <section id="sign-up-form" className="goa-adm-sign-up-form">
          <div className="goa-adm-form-container">
            <form id="user-form">
              <fieldset>
                <div className="goa-field">
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
                
                <fieldset className="goa-adm-group-radio adm-single-column">
                    <legend>Are you a technology provider? <span className="required">*</span></legend>
                    <div className="goa-option">
                        <input
                            id="yes-provider"
                            name="signUpType"
                            type="radio"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value="yes-provider"
                            required={true}
                        />
                        <label htmlFor="yes-provider">
                            Yes
                        </label>
                    </div>
                    <div className="goa-option">
                        <input
                            id="not-provider"
                            name="signUpType"
                            type="radio"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value="not-provider"
                            required={true}
                        />
                        <label htmlFor="not-provider">
                            No
                        </label>
                    </div>
                </fieldset>

                <div className="goa-field">
                  <label className="label" htmlFor="comments">
                    What would you like to discuss with your advisor? *
                  </label>
                  <Textarea
                    id="comments"
                    name="comments"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comments}
                    error={errors.comments}
                    required={true}
                    />
                </div>
                
                <fieldset className="goa-adm-group-radio adm-single-column">
                    <legend>How would you like us to contact you? <span className="required">*</span></legend>
                    <div className="goa-option">
                      <input
                          id="email-select"
                          type="radio"
                          name="signUpType"
                          value="email-select"
                          checked={contactMethod === 'email-select'}
                          onChange={handleContactMethodChange}
                      />
                      <label htmlFor="email-select">
                          Email
                      </label>
                      {contactMethod === 'email-select' && (
                          <>
                          <div className='goa-field goa-contact-input'>
                              <FormField
                                  id="email"
                                  name="email"
                                  type="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={errors.email}
                                  placeholder="Email"
                                  required={true}
                              />
                          </div>
                          </>
                      )}
                    </div>
                    <div className="goa-option">
                        <input
                            id="phone-select"
                            type="radio"
                            name="signUpType"
                            value="phone-select"
                            checked={contactMethod === 'phone-select'}
                            onChange={handleContactMethodChange}
                        />
                        <label htmlFor="phone-select">
                            Phone
                        </label>
                        {contactMethod === 'phone-select' && ( 
                            <>
                            <div className='goa-field goa-contact-input'>
                                <FormField
                                    id="phone"
                                    name="phone"
                                    type="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.phone}
                                    placeholder="Phone Number"
                                    required={true}
                                />
                            </div>
                            </>
                        )}
                    </div>
                </fieldset>

                <div className="goa-field goa-date-time goa--required">
                  <label className="label" htmlFor="date">
                    When would you like to have your initial consultation? <span className="required">*</span>
                  </label>
                  <div className="goa-field-split">
                    <div className="goa-date" style={{ flex: '1' }}>
                      <Flatpickr className="goa-date-picker" placeholder="Date" aria-label="Select a Date" options={{  minDate: "today",  altFormat: "F j, Y", dateFormat: "F j, Y", }} />
                    </div>
                    <div className="goa-field goa--required">
                      <select
                        id="time-dateTime"
                        name="time-dateTime"
                        aria-label="Select a Time"
                        required={true}
                        defaultValue={""}
                      >
                          <option value="" disabled>Time</option>
                          <option value="morning">9:00 AM to 12:00 PM</option>
                          <option value="afternoon">1:00 PM to 3:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="goa-field goa--required">
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
                      <p>
                      I agree to be contacted by the Government of Alberta about the Digital Marketplace Supplier Outreach Program.<span className="required">*</span></p>
                    </label>
                  </div>
                </div>

                <div className="goa-adm-buttons">
                  <button
                    type="submit"
                    className="goa-adm-button"
                    disabled={loading}
                    onClick={handleSubmitPartner}
                  >
                    {loading ? 'Submitting...' : 'Submit Form'}
                  </button>
                  {apiError && <div style={{ color: 'red' }}>{apiError}</div>}
                </div>
              </fieldset>
            </form>
            <div className="goa-adm-disclaimer">
              <p>
                The personal information collected is for the Supplier Outreach Program, Alberta Digital Marketplace, an initiative of Digital Design and Delivery branch, Ministry of Technology and Innovation. This collection is authorized by section 33 of <a
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
