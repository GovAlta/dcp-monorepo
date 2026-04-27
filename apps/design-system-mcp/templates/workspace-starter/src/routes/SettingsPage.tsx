import { useState } from 'react';
import {
  GoabText,
  GoabButton,
  GoabFormItem,
  GoabInput,
  GoabCheckbox,
  GoabDivider,
  GoabCallout
} from '@abgov/react-components';
import { usePageHeader } from '../contexts/PageHeaderContext';
import { currentUser } from '../data/mockData';

/**
 * SettingsPage - User settings and preferences
 *
 * Features:
 * - Profile information (editable)
 * - Notification preferences
 * - Save confirmation
 *
 * Customize settings based on your app's needs.
 */
export function SettingsPage() {
  usePageHeader('Settings');

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dueDateReminders, setDueDateReminders] = useState(true);
  const [assignmentAlerts, setAssignmentAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // TODO: Implement actual save logic
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="content-padding" style={{ maxWidth: '600px', paddingBottom: '32px' }}>
      {saved && (
        <GoabCallout type="success" heading="Settings saved" mb="l">
          Your preferences have been updated successfully.
        </GoabCallout>
      )}

      <GoabText as="h2" size="heading-m" mt="none" mb="m">Profile Information</GoabText>

      <GoabFormItem label="Full name" mb="m">
        <GoabInput
          name="name"
          value={name}
          onChange={(detail) => setName(detail.value)}
          width="100%"
        />
      </GoabFormItem>

      <GoabFormItem label="Email address" mb="m">
        <GoabInput
          name="email"
          value={email}
          onChange={(detail) => setEmail(detail.value)}
          width="100%"
          type="email"
        />
      </GoabFormItem>

      <GoabFormItem label="Role" mb="m">
        <GoabInput
          name="role"
          value={currentUser.role}
          width="100%"
          disabled
        />
      </GoabFormItem>

      <GoabDivider mt="l" mb="l" />

      <GoabText as="h2" size="heading-m" mb="m">Notification Preferences</GoabText>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--goa-space-m)' }}>
        <GoabCheckbox
          name="emailNotifications"
          text="Email notifications"
          checked={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
        />
        <GoabCheckbox
          name="dueDateReminders"
          text="Due date reminders"
          checked={dueDateReminders}
          onChange={() => setDueDateReminders(!dueDateReminders)}
        />
        <GoabCheckbox
          name="assignmentAlerts"
          text="New assignment alerts"
          checked={assignmentAlerts}
          onChange={() => setAssignmentAlerts(!assignmentAlerts)}
        />
      </div>

      <GoabDivider mt="l" mb="l" />

      <GoabButton type="primary" onClick={handleSave}>Save Settings</GoabButton>
    </div>
  );
}
