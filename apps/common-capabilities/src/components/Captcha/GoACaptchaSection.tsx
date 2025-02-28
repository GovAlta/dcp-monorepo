import React from 'react';
import './styles.css';

export default function GoACaptchaSection() {
    return (
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
    );
}
