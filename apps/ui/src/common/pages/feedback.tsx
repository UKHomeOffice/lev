import { FC, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { Form, email, required } from '@not-govuk/components';
import config from '../config';

export const title = 'Feedback';

const Page: FC<PageProps> = props => (
  <div className="govuk-grid-row">
    <Helmet>
      <title>{title} - LEV</title>
    </Helmet>
    <div className="govuk-grid-column-two-thirds">
      <h1>Feedback</h1>
      <p>If you have an idea for a new feature, or want to provide feedback on
      any aspect of the service, please let us know.</p>
      <a className="govuk-button" href={"mailto:" + config.feedbackEmail + "?subject=LEV Service Feedback"}>Click here to send feedback</a>
    </div>
  </div>
);

export default Page;
