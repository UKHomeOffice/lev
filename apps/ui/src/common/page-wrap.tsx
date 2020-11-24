import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { Page } from '@not-govuk/components';
import { useUserInfo } from '@not-govuk/user-info';

import './app.scss';

export const PageWrap: FC<PageProps> = ({ signInHRef, signOutHRef, children }) => {
  const navigation = [
    { href: '/birth', text: 'Births' },
    { href: '/death', text: 'Deaths' },
    { href: '/marriage', text: 'Marriages' },
    { href: '/partnership', text: 'Civil partnerships' },
    { href: '/accessibility-statement', text: 'Accessibility statement' }
  ];
  const userInfo = useUserInfo();
  const sign = (
    userInfo && userInfo.username
    ? {
      href: signOutHRef,
      text: 'Sign out'
    }
    : {
      href: signInHRef,
      text: 'Sign in'
    }
  );

  return (
    <Page
      className="wide"
      feedbackHref="/feedback"
      navigation={navigation}
      phase="prototype"
      title="Life Event Verification"
      signOutHref={sign.href}
      signOutText={sign.text}
    >
      {children}
    </Page>
  );
};

export default PageWrap;
