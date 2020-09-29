import { FC, createElement as h } from 'react';
import { StandardProps, classBuilder } from '@not-govuk/component-helpers';
import { A, Button } from '@not-govuk/components';

import '../assets/BirthDetails.scss';

export type BirthRecordStatus = {
  corrected: boolean
  courtOrderInPlace: boolean
  courtOrderRevoked: boolean
  /** Whether the fathers details were subsequently added */
  fatherAdded: boolean
  fatherModified: boolean
  /** Whether the user should refer to GRO for more information */
  refer: boolean
  replaced: boolean
  subsequentlyMarried: boolean
}

export type BirthRecord = {
  /** Child's place of birth */
  birthplace: string
  /** Child's date of birth */
  dob: string
  /** Child's father */
  father: {
    /** Father's place of birth */
    birthplace: string
    /** Father's name */
    name: string
  }
  /** Child's forenames */
  forenames: string
  /** Child's mother */
  mother: {
    /** Mother's place of birth */
    birthplace: string
    /** Mother's surname at marriage */
    marriageSurname?: string
    /** Mother's name */
    name: string
    /** Mother's maiden name */
    nee?: string
  }
  /** The registration that procedes this one */
  nextRegistration?: Pick<BirthRecord, 'systemNumber'>
  /** Details on who conducted the registration */
  registered: {
    adminArea: string
    by: string
    /** Date of registration */
    date: string
    district: string
    subDistrict: string
  }
  /** Child's sex */
  sex: 'Male' | 'Female' | 'Indeterminate'
  /** Registration's identifer */
  systemNumber: number
  /** Child's surname */
  surname: string
  /** The registration that precedes this one */
  previousRegistration?: Pick<BirthRecord, 'systemNumber'>
  /** Status of the birth record */
  status: BirthRecordStatus
};

export type BirthDetailsProps = StandardProps & BirthRecord & {
};

export const BirthDetails: FC<BirthDetailsProps> = ({
  birthplace,
  children,
  classBlock,
  classModifiers,
  className,
  dob,
  father,
  forenames,
  nextRegistration,
  mother,
  previousRegistration,
  registered,
  sex,
  status,
  surname,
  systemNumber,
  ...attrs
}) => {
  const classes = classBuilder('ho-lev-birth-details', classBlock, classModifiers, className);
  const heading = `${forenames} ${surname} ${dob}`

  return (
    <div {...attrs} className={classes()}>
      <h1 className="govuk-heading-l">{heading}</h1>
      { !status.refer ? null : (
        <div className="flag alert">Refer to GRO.</div>
      ) }
      { !status.fatherAdded ? null : (
        <div className="flag warning">Father's details added to record.</div>
      ) }
      { !status.subsequentlyMarried ? null : (
        <div className="flag warning">Unmarried parents subsequently married.</div>
      ) }
      { !status.fatherModified ? null : (
        <div className="flag warning">Father's details added / removed from record.</div>
      ) }
      { !status.replaced ? null : (
        <div className="flag warning">Original registration replaced by new registration.</div>
      ) }
      { !status.corrected ? null : (
        <div className="flag warning">Registration has been updated to correct an error.</div>
      ) }
      { !status.courtOrderInPlace ? null : (
        <div className="flag alert">This record has an adoption / court order in place.</div>
      ) }
      { !status.courtOrderRevoked ? null : (
        <div className="flag">This record has an adoption / court order revoked.</div>
      ) }

      { !previousRegistration?.systemNumber ? null : (
        <div className="flag">This is a reregistration.
          <Button href={`/birth?id=${previousRegistration.systemNumber}`}>View the previous registration.</Button>
        </div>
      ) }
      { !nextRegistration?.systemNumber ? null : (
        <div className="flag">Original registration replaced by new registration.
          <Button href={`/birth?id=${nextRegistration.systemNumber}`}>View the next registration.</Button>
        </div>
      ) }
      <table className={classes('data')}>
        <tbody>
          <tr>
            <th>System number</th>
            <td>{systemNumber}</td>
          </tr>
          <tr className="section-head">
            <th colSpan={2}>Child</th>
          </tr>
          <tr>
            <th>Surname</th>
            <td>{surname}</td>
          </tr>
          <tr>
            <th>Forename(s)</th>
            <td>{forenames}</td>
          </tr>
          <tr>
            <th>Date of birth</th>
            <td>{dob}</td>
          </tr>
          <tr>
            <th>Sex</th>
            <td>{sex}</td>
          </tr>
          <tr>
            <th>Place of birth</th>
            <td>{birthplace}</td>
          </tr>
          <tr className="section-head">
            <th colSpan={2}>Mother</th>
          </tr>
          <tr>
            <th><span className="govuk-visually-hidden" aria-hidden="true">Mother's </span>Name</th>
            <td>{mother.name}</td>
          </tr>
          <tr>
            <th><span className="govuk-visually-hidden" aria-hidden="true">Mother's </span>Maiden name</th>
            <td>{mother.nee}</td>
          </tr>
          <tr className={classes('mother-marriage-name')}>
            <th><span className="govuk-visually-hidden" aria-hidden="true">Mother's </span>Surname at marriage<span className={classes('additional')}><br /> if different from maiden name</span></th>
            <td>{mother.marriageSurname}</td>
          </tr>
          <tr>
            <th><span className="govuk-visually-hidden" aria-hidden="true">Mother's </span>Place of birth</th>
            <td>{mother.birthplace}</td>
          </tr>
          <tr className="section-head">
            <th colSpan={2}>Father / Parent</th>
          </tr>
          <tr>
            <th><span className="govuk-visually-hidden" aria-hidden="true">Father's </span>Name</th>
            <td>{father.name}</td>
          </tr>
          <tr>
            <th><span className="govuk-visually-hidden" aria-hidden="true">Father's </span>Place of birth</th>
            <td>{father.birthplace}</td>
          </tr>
          <tr className="section-head">
            <th colSpan={2}>Registration</th>
          </tr>
          <tr>
            <th>Birth registered by</th>
            <td>{registered.by}</td>
          </tr>
          <tr>
            <th>Registration district</th>
            <td>{registered.district}</td>
          </tr>
          <tr>
            <th><span className="govuk-visually-hidden" aria-hidden="true">Registration </span>Sub-district</th>
            <td>{registered.subDistrict}</td>
          </tr>
          <tr>
            <th><span className="govuk-visually-hidden" aria-hidden="true">Registration </span>Administrative area</th>
            <td>{registered.adminArea}</td>
          </tr>
          <tr>
            <th>Date of registration</th>
            <td>{registered.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BirthDetails;
