import { FC, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { A } from '@not-govuk/components';

export const title = 'Home';

const Page: FC<PageProps> = props => (
  <div className="govuk-grid-row">
    <Helmet>
      <title>Life Event Verification</title>
    </Helmet>
    <div className="govuk-grid-column-two-thirds">
      <h1>Welcome to LEV</h1>
      <p>Choose the event to search for:</p>
      <ul>
        <li><A href="/birth">Birth</A></li>
        <li><A href="/death">Death</A></li>
        <li><A href="/marriage">Marriage</A></li>
        <li><A href="/partnership">Civil partnership</A></li>
      </ul>
    </div>
  </div>
);

export default Page;
