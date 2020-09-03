import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { A, Form, after, exactLength, integer, past, required } from '@not-govuk/components';
import { BirthSummary } from '@ho-lev/birth-summary';

const Page: FC<PageProps> = ({ location }) => {
  const query = location.query;
  const results = Object.keys(query).length && [
    {
      name: `${query['forenames']} One ${query['surname']}`,
      dob: query['dob'],
      birthplace: 'Swansea',
      mother: `Jane ${query['surname']}`,
      father: `Dave ${query['surname']}`
    },
    {
      name: `${query['forenames']} Two ${query['surname']}`,
      dob: query['dob'],
      birthplace: 'Manchester',
      mother: `Susan ${query['surname']}`,
      father: `William ${query['surname']}`
    },
    {
      name: `${query['forenames']} Three ${query['surname']}`,
      dob: query['dob'],
      birthplace: 'Cardiff',
      mother: `Doris Peterson`,
      father: `Gerald ${query['surname']}`
    }
  ];

  const details = e => (
    <dl>
      <dt>Full name</dt>
      <dd>{e.name}</dd>
      <dt>Date of Birth</dt>
      <dd>{e.dob}</dd>
      <dt>Birthplace</dt>
      <dd>{e.birthplace}</dd>
      <dt>Mother</dt>
      <dd>{e.mother}</dd>
      <dt>Father</dt>
      <dd>{e.father}</dd>
    </dl>
  );

  return (
    <Fragment>
      <h1>Births</h1>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-quarter">
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
        { results ? (
          Array.isArray(results) ? (
            <Fragment>
              <div className="govuk-grid-column-one-quarter">
                <ul>
                  { results.map((v, i) => (
                    <BirthSummary
                      name={v.name}
                      date={v.dob}
                      place={v.birthplace}
                      number={i}
                    />
                  )) }
                </ul>
              </div>
              <div className="govuk-grid-column-one-half">
                {details(results[query['selected'] || 0])}
              </div>
            </Fragment>
          ) : (
            <div className="govuk-grid-column-three-quarters">
              {details(results)}
            </div>
          )
        ) : (
          <div className="govuk-grid-column-three-quarters" style={{ textAlign: 'center' }}>
            <h4>Did you know?</h4>
            <p>Did you know you can enter short dates?</p>
          </div>
        ) }
      </div>
    </Fragment>
  );
};

export default Page;
export const title = 'Births';
