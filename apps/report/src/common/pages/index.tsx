import { FC, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { Form, before, after, past, minLength, required } from '@not-govuk/components';

const Page: FC<PageProps> = props => (
  <div className="govuk-grid-row">
    <div className="govuk-grid-column-two-thirds">
      <h1>Home</h1>
      <p>This is the home page updated.</p>
	<Form action="/result" method="get">
  <Form.TextInput
    name="fullName"
    prettyName="name"
    label={<h2>What is your name?</h2>}
    hint="Write your firstname followed by your surname"
    validators={[required('Enter your name plank!'), minLength(3)('Surely you must have a longer name?')]}
  />
  <Form.Radios
    name="sex"
    label={<h2>Sex?</h2>}
    options={[
      {
        value: "male",
        label: "Male",
      },
      {
        value: "female",
        label: "Female",
      },
      {
        value: "no",
        label: "No thanks, we're British",
      },
    ]}
    validators={[required("Provide your sex")]}
  />
  <Form.DateInput
    name="dob"
    prettyName="date of birth"
    label={<h2>What is your date of birth?</h2>}
    validators={[
      required("Provide your date of birth"),
      past(),
      after("1900-01-01")(),
    ]}
  />
  <Form.Radios
    name="married"
    label={<h2>Are you married?</h2>}
    options={[
      {
        value: "Y",
        label: "Yes",
      },
      {
        value: "N",
        label: "No",
      },
    ]}
    validators={[
      required("Provide your marital status"),
    ]}
  />
  <Form.Submit value="Submit" />
</Form>
    </div>
  </div>
);

export default Page;
export const title = 'Home';
