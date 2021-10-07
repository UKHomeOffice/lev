import { FC, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { Form, email, required } from '@not-govuk/components';

export const title = 'Feedback';

const Page: FC<PageProps> = props => (
  <div className="govuk-grid-row">
    <Helmet>
      <title>{title} - LEV</title>
    </Helmet>
    <div className="govuk-grid-column-two-thirds">
      <h1>Feedback</h1>
      <Form action="/feedback" method="get">
        <Form.TextInput
          name="email"
          label={<h4>Email address</h4>}
          hint="An e-mail address so that we can reply to you"
          validators={[required(), email()]}
        />
        <Form.Textarea
          name="message"
          label={<h4>Message</h4>}
          validators={[required()]}
        />
        <Form.Submit>Search</Form.Submit>
      </Form>
    </div>
  </div>
);

export default Page;
