import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { Page } from '@not-govuk/components';

import './app.scss';

export const PageWrap: FC<PageProps> = ({ children }) => {
  const navigation = [
    { href: '/get-started', text: 'Get started' },
    { href: '/components', text: 'Components' },
    { href: '/contributing', text: 'Contributing' }
  ];

  return (
    <Page
      feedbackHref="/feedback"
      navigation={navigation}
      phase="alpha"
      title="Life Event Verification"
    >
      {children}
    </Page>
  );
};

export default PageWrap;
