import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { NotGovUKPage } from '@not-govuk/components';

import './app.scss';

export const PageWrap: FC<PageProps> = ({ children }) => {
  const navigation = [
    { href: '/get-started', text: 'Get started' },
    { href: '/components', text: 'Components' },
    { href: '/contributing', text: 'Contributing' }
  ];

  return (
    <NotGovUKPage
      department="home-office"
      feedbackHref="https://github.com/UKHomeOffice/lev/issues/new"
      footerContent="Copyright (C) 2020, 2021 Crown Copyright"
      navigation={navigation}
      meta={[
        { href: "https://github.com/UKHomeOffice/lev", text: "GitHub" },
        { href: "https://github.com/UKHomeOffice/lev/issues/new", text: "Contact" },
      ]}
      organisationText="HMPO"
      phase="alpha"
      serviceName="LEV Documentation"
      title="LEV"
      maxContentsWidth={1100}
    >
      {children}
    </NotGovUKPage>
  );
};

export default PageWrap;
