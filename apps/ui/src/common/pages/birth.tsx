import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { A, Details, Form, after, exactLength, integer, past, required } from '@not-govuk/components';
import { BirthSummary } from '@ho-lev/birth-summary';
import { BirthDetails, BirthRecord } from '@ho-lev/birth-details';
import { EventList } from '@ho-lev/event-list';
import { useUserInfo } from '@not-govuk/user-info';

const systemNumberImage = require('../../../assets/system-number-hint.png').default;

const Page: FC<PageProps> = ({ location, signInHRef }) => {
  const userInfo = useUserInfo();
  const isLoggedIn = !!(userInfo && userInfo.username);
  const hasAccess = !!(userInfo && userInfo.roles?.includes('birth'));
  const query = location.query;
  const registered = {
    adminArea: '',
    by: '',
    date: '',
    district: '',
    subDistrict: ''
  };
  const status = {
    corrected: false,
    courtOrderInPlace: false,
    courtOrderRevoked: false,
    fatherAdded: false,
    fatherModified: false,
    refer: false,
    replaced: false,
    subsequentlyMarried: false
  };
  const results: BirthRecord[] = Object.keys(query).length && [
    {
      forenames: `${query['forenames']} One`,
      surname: query['surname'].toUpperCase(),
      dob: query['dob'],
      birthplace: 'Swansea',
      mother: {
        name: `Jane ${query['surname']}`,
        birthplace: 'Swansea'
      },
      father: {
        name: `Dave ${query['surname']}`,
        birthplace: 'Swansea'
      },
      sex: 'Male',
      systemNumber: 111111111,
      registered,
      status
    },
    {
      forenames: `${query['forenames']} Two`,
      surname: query['surname'].toUpperCase(),
      dob: query['dob'],
      birthplace: 'Manchester',
      mother: {
        name: `Susan ${query['surname']}`,
        birthplace: 'Swansea'
      },
      father: {
        name: `William ${query['surname']}`,
        birthplace: 'Swansea'
      },
      sex: 'Male',
      systemNumber: 222222222,
      registered,
      status
    },
    {
      forenames: `${query['forenames']} Three`,
      surname: query['surname'].toUpperCase(),
      dob: query['dob'],
      birthplace: 'Cardiff',
      mother: {
        name: `Doris Peterson`,
        birthplace: 'Swansea'
      },
      father: {
        name: `Gerald ${query['surname']}`,
        birthplace: 'Swansea'
      },
      sex: 'Male',
      systemNumber: 333333333,
      registered,
      status
    }
  ];

  const mustLogIn = (
    <Fragment>
      Please <a href={signInHRef}>sign-in</a> in order to access this page.
    </Fragment>
  );
  const noAccess = !isLoggedIn ? mustLogIn : (
    <Fragment>
      Sorry, your account does not have access to this page.
    </Fragment>
  );

  return (
    <Fragment>
      <h1>Births</h1>
      { !hasAccess ? noAccess : (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <Form action="/birth" method="get">
              <Form.TextInput
                name="surname"
                label={<h4>Surname</h4>}
                validators={[required()]}
              />
              <Form.TextInput
                name="forenames"
                label={<h4>Forename(s)</h4>}
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
            <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
            <Form action="/birth" method="get">
              <Form.TextInput
                name="system-number"
                prettyName="System number"
                label={<h4>System number from birth certificate</h4>}
                hint="The 9 digit number at the bottom left of the certificate."
                validators={[required(), integer(), exactLength(9)()]}
              />
              <Details summary="What is the system number?">
                <img src={systemNumberImage} alt="9 digit number at the bottom left of the certificate" />
              </Details>
              <Form.Submit value="Search" />
            </Form>
          </div>
          { results ? (
            Array.isArray(results) ? (
              <div className="govuk-grid-column-two-thirds">
                <div className="govuk-grid-column-one-third">
                  <EventList>
                    { results.map((v, i) => (
                      <BirthSummary
                        {...v}
                        number={i}
                      />
                    )) }
                  </EventList>
                </div>
                <div className="govuk-grid-column-two-thirds">
                  <BirthDetails {...results[query['selected'] || 0]} />
                </div>
              </div>
            ) : (
              <div className="govuk-grid-column-two-thirds">
                <BirthDetails {...results} />
              </div>
            )
          ) : (
            <div className="govuk-grid-column-two-thirds" style={{ textAlign: 'center' }}>
              <h4>Did you know?</h4>
              <p>Did you know you can enter short dates?</p>
            </div>
          ) }
        </div>
      ) }
    </Fragment>
  );
};

export default Page;
export const title = 'Births';
