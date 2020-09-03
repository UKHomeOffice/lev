import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { A } from '@not-govuk/components';

const Page: FC<PageProps> = props => (
  <div className="govuk-grid-row">
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
export const title = 'Home';
