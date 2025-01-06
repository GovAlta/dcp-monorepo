import React, { useEffect, useMemo, useState } from 'react';
import useForm from '../../contexts/useForm';
import { apptFormConfig } from './config';
import { validateField, validateForm } from '../../utils/forms';
import FormField from '../../components/Input';
import Textarea from '../../components/textarea';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import { GoACircularProgress } from '@abgov/react-components';
import { getBookingsUrl } from '../../utils/config';
import useFetch from '../../hooks/useFetch';
import type { Bookings } from './types';

enum ContactType {
  EMAIL = 'Email',
  PHONE = 'Phone',
}

export default function ApptForm() {
  const initialValues = {
    organization: '',
    emailAddress: '',
    firstName: '',
    lastName: '',
    date: '',
    toDiscuss: '',
    phoneNumber: '',
    isTechnologyProvider: '',
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
  } = useForm(initialValues, validateForm, validateField, apptFormConfig);

  const bookingsUrl = useMemo(
    () => getBookingsUrl('/bookings/availability?calendarId=subbu-test'),
    []
  );
  const [bookings, error, isBookingsLoading] = useFetch<Bookings>(bookingsUrl);
  // State to track the selected contact method
  const [contactMethod, setContactMethod] = useState(null);

  // Handler to update the selected contact method
  const handleContactMethodChange = (event: any) => {
    const contactMethod = event.target.value;

    if (contactMethod === ContactType.EMAIL) {
      handleChange?.({ target: { name: 'phoneNumber', value: '' } } as any);
    } else if (contactMethod === ContactType.PHONE) {
      handleChange?.({ target: { name: 'emailAddress', value: '' } } as any);
    }

    handleChange?.(event);
    setContactMethod(event.target.value);
  };

  const handleDateChange = (date: any) => {
    let dateString;
    if (date?.[0]) {
      const d = new Date(date?.[0]);
      dateString = `${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    }
    handleChange?.({ target: { name: 'date', value: dateString } } as any);
  };
  
  return (
    <div className="goa-adm-form-container">
      {success ? (
        <section id="sign-up-form" className="goa-adm-sign-up-form">
          <section id="successDiv" className="goa-adm-form-success">
            <h3>Thank you for requesting a consultation.</h3>
            <p>
              We will get back to you shortly to confirm your advisory meeting.
            </p>
            <p>Meanwhile, check out the links below:</p>
            <p className="links">
              <a href="/understanding-procurement/" rel="noopener noreferrer">
                Understanding procurement
              </a>
            </p>
            <p className="links">
              <a
                href="https://purchasing.alberta.ca/support"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alberta Purchasing Connection Help Centre
              </a>
            </p>
            <p className="links">
              <a href="/join/" rel="noopener noreferrer">
                Join Alberta Digital Marketplace
              </a>
            </p>
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
                  id="organization-name"
                  name="organization"
                  type="text"
                  value={values.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.organization}
                  label="Organization name"
                  required={true}
                />

                <fieldset className="goa-adm-group-radio adm-single-column">
                  <legend>
                    Are you a technology provider?{' '}
                    <span className="required">*</span>
                  </legend>
                  <div className="goa-option">
                    <input
                      id="yes-provider"
                      className={
                        errors.isTechnologyProvider ? 'inputError' : ''
                      }
                      name="isTechnologyProvider"
                      type="radio"
                      onChange={handleChange}
                      value="true"
                      required={true}
                    />
                    <label htmlFor="yes-provider">Yes</label>
                  </div>
                  <div className="goa-option">
                    <input
                      id="not-provider"
                      className={
                        errors.isTechnologyProvider ? 'inputError' : ''
                      }
                      name="isTechnologyProvider"
                      type="radio"
                      onChange={handleChange}
                      value="false"
                      required={true}
                    />
                    <label htmlFor="not-provider">No</label>
                  </div>
                  {errors.isTechnologyProvider && (
                    <strong className="error goa-error">
                      {errors.isTechnologyProvider}
                    </strong>
                  )}
                </fieldset>

                <div className="goa-field">
                  <label className="label" htmlFor="comments">
                    What would you like to discuss with your advisor? *
                  </label>
                  <Textarea
                    id="toDiscuss"
                    name="toDiscuss"
                    onChange={handleChange as any}
                    onBlur={handleBlur as any}
                    value={values.toDiscuss}
                    error={errors.toDiscuss}
                    required={true}
                  />
                </div>

                <fieldset className="goa-adm-group-radio adm-single-column">
                  <legend>
                    How would you like us to contact you?{' '}
                    <span className="required">*</span>
                  </legend>
                  <div className="goa-option">
                    <input
                      id="email-select"
                      className={errors.signUpType ? 'inputError' : ''}
                      type="radio"
                      name="signUpType"
                      value={ContactType.EMAIL}
                      checked={contactMethod === ContactType.EMAIL}
                      onChange={handleContactMethodChange}
                    />
                    <label htmlFor="email-select">Email</label>
                    {contactMethod === ContactType.EMAIL && (
                      <>
                        <div className="goa-field goa-contact-input">
                          <FormField
                            id="emailAddress"
                            name="emailAddress"
                            type="email"
                            value={values.emailAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.emailAddress}
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
                      className={errors.signUpType ? 'inputError' : ''}
                      type="radio"
                      name="signUpType"
                      value={ContactType.PHONE}
                      checked={contactMethod === ContactType.PHONE}
                      onChange={handleContactMethodChange}
                    />
                    <label htmlFor="phone-select">Phone</label>
                    {contactMethod === ContactType.PHONE && (
                      <>
                        <div className="goa-field goa-contact-input">
                          <FormField
                            id="phoneNumber"
                            name="phoneNumber"
                            type="phone"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.phoneNumber}
                            placeholder="Phone Number"
                            required={true}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  {errors.signUpType && (
                    <strong className="error goa-error">
                      {errors.signUpType}
                    </strong>
                  )}
                </fieldset>
                <div className="goa-field goa-date-time goa--required">
                  <label className="label" htmlFor="date">
                    When would you like to have your initial consultation?{' '}
                    <span className="required">*</span>
                  </label>

                  <div className="goa-field-split">
                    {isBookingsLoading ? (
                      <GoACircularProgress
                        variant="inline"
                        size="large"
                        message="Loading available dates..."
                        visible={true}
                      ></GoACircularProgress>
                    ) : (
                      <>
                        <div className="goa-date" style={{ flex: '1' }}>
                          <Flatpickr
                            className={`goa-date-picker ${
                              errors.date ? 'inputError' : ''
                            }`}
                            name="date"
                            placeholder="Date"
                            aria-label="Select a Date"
                            options={{
                              // minDate: 'today',
                              // altFormat: 'F j, Y',
                              dateFormat: 'Y-m-d',
                              mode: 'single',
                              enable: bookings?.availableDatesToBook,
                            }}
                            onChange={handleDateChange}
                          />
                          {errors.date && (
                            <strong className="error goa-error">
                              {errors.date}
                            </strong>
                          )}
                        </div>
                        <div className="goa-field goa--required">
                          <select
                            id="time-dateTime"
                            name="when"
                            className={errors.when ? 'inputError' : ''}
                            aria-label="Select a Time"
                            required={true}
                            defaultValue={''}
                            onChange={handleChange as any}
                          >
                            <option value="">Select a Time</option>
                            {bookings?.bookingsAvailability[values.date] && (
                              <>
                                {bookings.bookingsAvailability[values.date]
                                  .AM && <option value="AM">9:00 AM to 12:00 PM</option>}
                                {bookings.bookingsAvailability[values.date]
                                  .PM && <option value="PM">1:00 PM to 3:00 PM</option>}
                              </>
                            )}
                          </select>
                          {errors.when && (
                            <strong className="error goa-error">
                              {errors.when}
                            </strong>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="goa-field goa--required">
                  <div className="goa-option">
                    <input
                      id="agreement"
                      name="agreement"
                      type="checkbox"
                      className={errors.agreement ? 'inputError' : ''}
                      checked={values.agreement}
                      onChange={handleChange}
                    />
                    <label htmlFor="agreement">
                      <p>
                        I agree to be contacted by the Government of Alberta
                        about the Digital Marketplace Supplier Outreach Program.
                        <span className="required">*</span>
                      </p>
                    </label>
                  </div>
                  {errors.agreement && (
                    <strong className="error goa-error">
                      {errors.agreement}
                    </strong>
                  )}
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
                The personal information collected is for the Supplier Outreach
                Program, Alberta Digital Marketplace, an initiative of Digital
                Design and Delivery branch, Ministry of Technology and
                Innovation. This collection is authorized by section 33 of{' '}
                <a
                  href="https://open.alberta.ca/publications/f25"
                  target="_blank"
                >
                  <em>
                    Freedom of Information and Protection of Privacy (FOIP) Act
                  </em>
                </a>{' '}
                . For questions about the collection of personal information,
                contact the Outreach Team at 587-990-5540, by email at{' '}
                <a href="mailto:digital.Outreach@gov.ab.ca" target="_blank">
                  digital.outreach@gov.ab.ca
                </a>
                , or mail to 9942-108 Street, Edmonton, Alberta, T5K 2J5.
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
