import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { Form, after, exactLength, integer, past, required } from '@not-govuk/form';

const Page: FC<PageProps> = props => (
  <Fragment>
    <h1>Births</h1>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-one-third">
        <Form action="/birth" method="get">
          <Form.TextInput
            name="system-number"
            prettyName="System number"
            label={<h4>System number</h4>}
            hint="The 9 digit number at the bottom left of the certificate."
            validators={[required(), integer(), exactLength(9)()]}
          />
          <Form.Submit value="Search" />
        </Form>
        <Form action="/birth" method="get">
          <Form.TextInput
            name="forenames"
            label={<h4>Forename(s)</h4>}
            validators={[required()]}
          />
          <Form.TextInput
            name="surname"
            label={<h4>Surname</h4>}
            validators={[required()]}
          />
          <Form.DateInput
            name="dob"
            prettyName="date of birth"
            label={<h4>Date of birth?</h4>}
            validators={[
              required(),
              past(),
              after("2009-07-01")()
            ]}
          />
          <Form.Submit value="Search" />
        </Form>
      </div>
      <div className="govuk-grid-column-two-thirds" style={{ textAlign: 'center' }}>
        <h4>Did you know?</h4>
        <p>Did you know you can enter short dates?</p>
      </div>
    </div>
  </Fragment>
);

export default Page;
export const title = 'Births';
