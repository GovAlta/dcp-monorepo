import { GoASpacer } from '@abgov/react-components';
import React from 'react';

export default function SoftDelete() {
    return (
        <div>
            <ol className="goa-ordered-list">
                <li>
                    Navigate to a service that you would like to decommission
                    and click on <strong>Update</strong> button on the top right
                    of the details page.
                </li>
                <li>
                    On the update screen, update the <strong>Status</strong>{' '}
                    (The current status of the service) field of the service to{' '}
                    <strong>Decommissioned</strong>.
                    <GoASpacer vSpacing="m" />
                    Please note the differences between the following statuses:
                    <ul>
                        <li>
                            <strong>Deprecated</strong> - The service is still
                            in production, however, no updates will be provided
                            and you should look for an alternative or migrate
                            off of the service soon.
                        </li>
                        <li>
                            <strong>Decommissioned</strong> - The service is no
                            longer in production and is no longer accessible.
                        </li>
                    </ul>
                </li>
                <li>
                    Continue with the update flow as usual. Enter your name and
                    email in the editor section if no other changes are needed,
                    then verify and <strong>Submit</strong> your changes.
                </li>
                <li>
                    Wait for the request to be approved. Your service should now
                    be decommissioned and removed from the default view of the
                    list.
                </li>
                <li>
                    To see decommissioned services in the list, simply check the{' '}
                    <strong>Include decommissioned services</strong> box.
                </li>
            </ol>
            <GoASpacer vSpacing="m" />
            <p>
                For further information, please refer to the DDD&apos;s{' '}
                <a href="https://goa-dio.atlassian.net/wiki/spaces/DIO/pages/3637673998/Guides">
                    Guides
                </a>{' '}
                confluence page.
            </p>
        </div>
    );
}
