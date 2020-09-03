import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { Page } from '@not-govuk/components';

import './app.scss';

export const PageWrap: FC<PageProps> = ({ children }) => {
  const navigation = [
    { href: '/birth', text: 'Births' },
    { href: '/death', text: 'Deaths' },
    { href: '/marriage', text: 'Marriages' },
    { href: '/partnership', text: 'Civil partnerships' }
  ];

  return (
    <Page
      className="wide"
      feedbackHref="/feedback"
      navigation={navigation}
      phase="prototype"
      title="Life Event Verification"
    >
      {children}
    </Page>
  );
};

export default PageWrap;
