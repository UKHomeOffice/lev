import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { Form, after, email, exactLength, integer, past, required } from '@not-govuk/components';

const Page: FC<PageProps> = props => (
  <div className="govuk-grid-row">
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
        <Form.Submit value="Submit" />
      </Form>
    </div>
  </div>
);

export default Page;
export const title = 'Births';
