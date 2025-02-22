import React from 'react';
import dayjs from 'dayjs';

import './styles.css';
import ExternalLink from '../ExternalLink';

type LastUpdatedProps = {
  date?: string;
  name?: string;
  email?: string;
};

const LastUpdated = ({ date, name, email }: LastUpdatedProps) => {
  return date ? (
    <div className="last-updated">
      <span className="label">Last updated:</span>
      <span className="value">{dayjs(date).format('YYYY-MM-DD')}</span>
      {(name || email) && (
        <>
          <span className="value">by</span>
          <span className="value">
            {email ? (
              <ExternalLink link={`mailto:${email}`} text={name || email} />
            ) : (
              name
            )}
          </span>
        </>
      )}
    </div>
  ) : null;
};

export default LastUpdated;
