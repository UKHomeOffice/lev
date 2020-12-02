import { useQuery, gql } from '@apollo/client';
import { FC, Fragment, createElement as h } from 'react';
import { PageProps } from '@not-govuk/app-composer';
import { A, Details, Form, after, exactLength, integer, past, required } from '@not-govuk/components';
import { BirthSummary } from '@ho-lev/birth-summary';
import { BirthDetails, BirthRecord } from '@ho-lev/birth-details';
import { EventList } from '@ho-lev/event-list';
import { useUserInfo } from '@not-govuk/user-info';
import { processV1Birth } from '../lib/process-records';

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
      Sorry, no results were found for {query['system-number'] || `${query['forenames']} ${query['surname']?.toUpperCase()} ${query['dob']}`}.
    </Fragment>
  );

  const gql = hasAccess && (
    query['system-number']
    ? useQuery(birthQuery, { variables: { id: Number(query['system-number']) } })
    : (
      query['forenames'] && query['surname'] && query['dob']
      ? useQuery(birthsQuery, {
        variables: {
          forenames: query['forenames'],
          surname: query['surname'],
          dateOfBirth: query['dob']
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
export const title = 'Births';
