import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { NotGovUKPage } from '@not-govuk/components';
import { useUserInfo } from '@not-govuk/user-info';

import './app.scss';

export const PageWrap: FC<PageProps> = ({ signInHRef, signOutHRef, children }) => {
  const navigation = [
    { href: '/birth', text: 'Births' },
    { href: '/death', text: 'Deaths' },
    { href: '/marriage', text: 'Marriages' },
    { href: '/partnership', text: 'Civil partnerships' }
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
    <NotGovUKPage
      department="home-office"
      feedbackHref="/feedback"
      navigation={navigation}
      meta={[
        { href: '/accessibility-statement', text: 'Accessibility statement' },
        { href: '/lev-help', text: 'help using LEV' },
        { href: 'https://github.com/UKHomeOffice/lev/issues/new', text: 'Contact' }
      ]}
      organisationText="HMPO"
      phase="prototype"
      serviceName="Life Event Verification"
      signOutHref={sign.href}
      signOutText={sign.text}
      title="Life Event Verification"
      maxContentsWidth={-1}
    >
      {children}
    </NotGovUKPage>
  );
};

export default PageWrap;
