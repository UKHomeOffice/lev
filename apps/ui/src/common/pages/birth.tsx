import { useQuery, gql } from '@apollo/client';
import { FC, Fragment, createElement as h } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageProps } from '@not-govuk/app-composer';
import { Details, Form, after, exactLength, date, integer, past, required, withForm } from '@not-govuk/components';
import { BirthSummary } from '@ho-lev/birth-summary';
import { BirthDetails, BirthRecord } from '@ho-lev/birth-details';
import { DateInput } from '@ho-lev/date-input';
import { EventList } from '@ho-lev/event-list';
import { useUserInfo } from '@not-govuk/user-info';
import { processV1Birth } from '../lib/process-records';

export const title = 'Births';

const FormDateInput = withForm(DateInput, [date()]);

const systemNumberImage = require('../../../assets/system-number-hint.png').default;

const v1BirthProperties = `
      id
      date
      entryNumber
      registrar {
        signature
        designation
        subdistrict
        district
        administrativeArea
      }
      informant1 {
        forenames
        surname
        address
        qualification
        signature
        signatureIsMark
      }
      informant2 {
        forenames
        surname
        address
        qualification
        signature
        signatureIsMark
      }
      child {
        forenames
        surname
        dateOfBirth
        birthplace
        originalForenames
        sex
      }
      mother {
        forenames
        surname
        birthplace
        occupation
        maidenSurname
        marriageSurname
      }
      father {
        forenames
        surname
        birthplace
        occupation
        deceased
      }
      dateOfDeclaration
      dateOfStatutoryDeclarationOfParentage
      statutoryDeclarationOfParentage
      dateOfNameUpdate
      status {
        blocked
        cancelled
        correction
        marginalNote
        nameUpdate
        onAuthorityOfRegistrarGeneral
        potentiallyFictitious
        praOrCourtOrder
        reregistration
      }
`;

const birthQuery = gql`
  query birthsQuery($id: Int!) {
    v1Birth(id: $id) {
      ${v1BirthProperties}
    }
  }
`;

const birthsQuery = gql`
  query birthsQuery($forenames: String!, $surname: String!, $dateOfBirth: String!) {
    v1Births(forenames: $forenames, surname: $surname, dateOfBirth: $dateOfBirth) {
      ${v1BirthProperties}
    }
  }
`;

const Page: FC<PageProps> = ({ location, signInHRef }) => {
  const userInfo = useUserInfo();
  const isLoggedIn = !!(userInfo && userInfo.username);
  const hasAccess = !!(userInfo && userInfo.roles?.includes('birth'));
  const query = location.query || {};
  const systemNumber = query['system-number'];
  const forenames = query['forenames'];
  const surname = query['surname'];
  const dateOfBirth = query['dob'] && DateInput.format(query['dob']);
  const dob = dateOfBirth && DateInput.deformat(dateOfBirth);

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
  const loading = (
    <Fragment>
      Loading...
    </Fragment>
  );
  const noResults = (
    <Fragment>
      Sorry, no results were found for {systemNumber || `${forenames} ${surname?.toUpperCase()} ${dateOfBirth}`}.
    </Fragment>
  );

  const gql = hasAccess && (
    systemNumber
    ? useQuery(birthQuery, { variables: { id: Number(systemNumber) } })
    : (
      forenames && surname && dateOfBirth
      ? useQuery(birthsQuery, {
        variables: {
          forenames,
          surname,
          dateOfBirth
        }
      })
      : undefined
    )
  );

  const error = gql?.error && (
    <pre>
      <code>
        {gql.error.toString()}
      </code>
    </pre>
  );

  const results: BirthRecord[] = gql?.data?.v1Births?.map(processV1Birth);
  const selected: BirthRecord = (
    results
    ? results[query['selected']] || undefined
    : gql?.data?.v1Birth && processV1Birth(gql.data.v1Birth)
  );

  const details = selected && (
    <BirthDetails {...selected} />
  );

  return (
    <Fragment>
      <Helmet>
        <title>{title} - LEV</title>
      </Helmet>
      <h1>Births</h1>
      { !hasAccess ? noAccess : (
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <Form action="?" method="get" initialValues={{ surname, forenames, dob }}>
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
              <FormDateInput
                name="dob"
                prettyName="date of birth"
                label={<h4>Date of birth</h4>}
                validators={[
                  required(),
                  past(),
                  after("2009-07-01")()
                ]}
              />
              <Form.Submit value="Search" />
            </Form>
            <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
            <Form action="?" method="get" initialValues={{ 'system-number': systemNumber }}>
              <Form.TextInput
                name="system-number"
                prettyName="System number"
                label={<h4>System number from birth certificate</h4>}
                hint="The 9 digit number at the bottom left of the certificate."
                validators={[required(), integer(), exactLength(9)()]}
              />
              <Details summary="What is the system number?">
                <p>The system number is a unique 9 digit number which identifies the birth event. It is located at the
                    bottom left of the birth certificate.</p>
                <img src={systemNumberImage} alt="9 digit number at the bottom left of the certificate" />
              </Details>
              <Form.Submit value="Lookup" />
            </Form>
          </div>
          <div className="govuk-grid-column-two-thirds">
            { gql?.loading ? loading : (
              gql?.error ? error : (
                !results && !details ? (
                  <div style={{ textAlign: 'center' }}>
                    <h4>Did you know?</h4>
                    <p>Did you know you can enter short dates?</p>
                  </div>
                ) : (
                  !results ? details : (
                    !results.length ? noResults : (
                      <Fragment>
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
                        { !details ? null : (
                          <div className="govuk-grid-column-two-thirds">
                            { details }
                          </div>
                        ) }
                      </Fragment>
                    )
                  )
                )
              )
            ) }
          </div>
        </div>
      ) }
    </Fragment>
  );
};

export default Page;
