const notifications = {
  'common capabilities reviewer': {
    'common-capabilities:listing-submitted-edit-reviewer': {
      email: {
        subject: 'Service Edit Notification',
        title: 'submission notification',
        subtitle: '',
        body: `<body>
                <p>Dear Approver,</p>
                <p>
                    An edit request has been submitted for an existing service. Below are the details:
                </p>
                <ul>
                    <li><strong>Submitter Name:</strong> {{event.payload.userName}}</li>
                    <li><strong>Service Name:</strong> {{event.payload.appName}}</li>
                    <li><strong>Submitter Email:</strong> {{event.payload.editorEmail}}</li>
                </ul>
                <p>
                    Please log in to the <a href="https://task.adsp-uat.alberta.ca/common_capabilities/common%20capabilities/listings%20review"> task app </a>to review the submission and provide your decision.
                </p>
                <p>
                    Best regards,<br>
                    Common capabilities team
                </p>
            </body>`,
      },
    },
    'common-capabilities:listing-submitted-new-reviewer': {
      email: {
        subject: 'New service Submission',
        title: 'submission notification',
        subtitle: '',
        body: `<body>
                <p>Dear Approver,</p>
                <p>
                    A new service submission requires your review. Below are the details:
                </p>
                <ul>
                    <li><strong>Submitter Name:</strong> {{event.payload.userName}}</li>
                    <li><strong>Service Name:</strong> {{event.payload.appName}}</li>
                    <li><strong>Submitter Email:</strong> {{event.payload.editorEmail}}</li>
                </ul>
                <p>
                    Please log in to the <a href="https://task.adsp-uat.alberta.ca/common_capabilities/common%20capabilities/listings%20review"> task app </a>to review the submission and provide your decision.
                </p>
                <p>
                    Best regards,<br>
                    Common capabilities team
                </p>
            </body>`,
      },
    },
  },
  'common capabilities listings': {
    'common-capabilities:listing-accepted': {
      email: {
        subject: 'Service Submission Approved',
        title: 'submission notification',
        subtitle: '',
        body: `<body>
                <p>Dear <span>{{event.payload.userName}}</span>,</p>
                <p>
                    We are pleased to inform you that your service, <strong>{{event.payload.appName}}</strong>, has been successfully accepted. 
                    it has been reviewed and approved.
                </p>
                <p>
                    Your service is now listed and available for use. <b>Please note that it may take up to an hour after the approval for the listings to be fully updated. </b>   </p>
                <p>     
                If you have any questions or require further assistance, please feel free to
                contact us at
                <a href="mailto:TI.Softwaredelivery@gov.ab.ca">TI.Softwaredelivery@gov.ab.ca</a>.
                </p>
                <p>
                    Thank you for your submission!
                </p>
                <p>
                    Best regards,<br>
                    Common capabilities team
                </p>
            </body>`,
      },
    },
    'common-capabilities:listing-rejected': {
      email: {
        subject: 'Service Submission Rejected',
        title: 'submission notification',
        subtitle: '',
        body: `
            <body>
                <p>Dear <span>{{event.payload.userName}}</span>,</p>
                <p>
                    We regret to inform you that your service, <strong>{{event.payload.appName}}</strong>, has not been accepted. After review, it was determined that the submission does not meet the required criteria at this time.
                </p>
                <p>
                    If you would like to proceed, please make the necessary edits and resubmit your service for review.
                </p>
                <p>
                    <b>Reason:</b> {{event.payload.reason}}
                </p>
                <p>
                    Should you have any questions or need assistance with the resubmission, feel free to contact us at
                    <a href="mailto:TI.Softwaredelivery@gov.ab.ca">TI.Softwaredelivery@gov.ab.ca</a>.
                </p>
                <p>
                    Thank you for your efforts, and we look forward to receiving your updated submission.
                </p>
                <p>
                    Best regards,<br>
                    Common Capabilities Team
                </p>
            </body>`,
      },
    },
    'common-capabilities:listing-submitted-edit': {
      email: {
        subject: 'Confirmation Of Edit Submission',
        title: 'submission notification',
        subtitle: '',
        body: `<div>
                <p>Dear {{event.payload.userName}}</span>,</p>
                <p>
                    Thank you for submitting an edit request for your application,   <b>{{event.payload.appName}}</b>. 
                    This email confirms that your request has been successfully received by our system.
                </p>
                <p>
                    Our Common Capabilities Team will review the changes you have proposed. Once the review process is complete, 
                    you will receive a notification with the decision. The decision will indicate whether your edits have been 
                    <span>approved</span> or <span>rejected</span>.
                </p>
                <p>
                    If additional information or clarification is required during the review process, our team may reach out to you directly.
                </p>
                <p>
                    We appreciate your patience as we ensure all submissions are thoroughly evaluated.
                </p>
                <p>
                    Meanwhile, explore our Common Capabilities app <a href="https://common-capabilities.digital.gov.ab.ca/">here</a> 
                    for reusable components that may enhance your application.
                </p>
                <p>
                    If you have any questions or need further assistance, please contact us at 
                <a href="mailto:TI.Softwaredelivery@gov.ab.ca">TI.Softwaredelivery@gov.ab.ca</a>.
                </p>
                <div class="footer">
                Best regards,<br />
                Common capabilities team
                </div>
            </div>`,
      },
    },
    'common-capabilities:listing-submitted-new': {
      email: {
        subject: 'Confirmation Of Submission',
        title: 'submission notification',
        subtitle: '',
        body: `
            <body>
                <p>Dear {{event.payload.userName}}</span>,</p>
                <p>
                Thank you for submitting your service listing,
                <b>{{event.payload.appName}}</b>, for review. This email
                confirms that your submission has been successfully received by our system.
                </p>
                <p>
                Our Common Capabilities Team will carefully review the details of your
                service. Once the review process is complete, you will receive a
                notification with the decision. The decision will indicate whether your
                application has been <span class="highlight">approved</span> or
                <span class="highlight">rejected</span>.
                </p>
                <p>
                If additional information or clarification is required during the review
                process, our team may reach out to you directly.
                </p>
                <p>
                We appreciate your patience as we ensure all submissions are thoroughly
                evaluated.
                </p>
                <p>
                <p>
                In the meantime, explore our Common Capabilities app
            <a href="https://common-capabilities.digital.gov.ab.ca/">here</a> for reusable components for your application.
                If you have any questions or require further assistance, please feel free to
                contact us at
                <a href="mailto:TI.Softwaredelivery@gov.ab.ca">TI.Softwaredelivery@gov.ab.ca</a>.
                </p>
                <div class="footer">
                Best regards,<br />
                Common capabilities team
                </div>
            </body>`,
      },
    },
  },
};
