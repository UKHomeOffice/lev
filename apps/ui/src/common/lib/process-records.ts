import { V1Birth } from '@ho-lev/client';
import { BirthRecord } from '@ho-lev/birth-details';

const toBritishDateFormat = (date: string) => (new Date(date)).toLocaleDateString('en-GB');

export const processV1Birth = (r: V1Birth): BirthRecord => {
  const blocked = r.status.blocked !== false;
  const block = blocked ? () => 'UNAVAILABLE' : value => value;

  return {
    systemNumber: r.id,
    surname: block(r.child.surname),
    forenames: block(r.child.forenames),
    dob: block(toBritishDateFormat(r.child.dateOfBirth)),
    sex: block(r.child.sex),
    birthplace: block(r.child.birthplace),
    mother: {
      name: block(`${r.mother.forenames} ${r.mother.surname}`),
      nee: block(r.mother.maidenSurname),
      marriageSurname: block(r.mother.marriageSurname),
      birthplace: block(r.mother.birthplace),
      occupation: block(r.mother.occupation)
    },
    father: {
      name: block(`${r.father.forenames} ${r.father.surname}`),
      birthplace: block(r.father.birthplace),
      occupation: block(r.father.occupation)
    },
    registered: {
      by: block(r.informant1.qualification),
      district: block(r.registrar.district),
      subDistrict: block(r.registrar.subdistrict),
      adminArea: block(r.registrar.administrativeArea),
      date: block(toBritishDateFormat(r.date))
    },
    status: blocked ? {
      refer: true
    } : {
      refer: (
        ( r.status.reregistration !== 'None' &&
          r.status.reregistration !== 'Father added' &&
          r.status.reregistration !== 'Subsequently married' &&
          r.status.reregistration !== 'Father modified' &&
          r.status.reregistration !== 'Replacement registration'
        ) ||
          r.status.potentiallyFictitious !== false ||
          ( r.status.marginalNote !== 'None' &&
            r.status.marginalNote !== 'Court order in place' &&
            r.status.marginalNote !== 'Court order revoked'
          ) ||
          r.status.cancelled !== false
      ),
      fatherAdded: r.status.reregistration === 'Father added',
      subsequentlyMarried: r.status.reregistration === 'Subsequently married',
      fatherModified: r.status.reregistration === 'Father modified',
      replaced: r.status.reregistration === 'Replacement registration',
      corrected: r.status.correction && r.status.correction !== 'None',
      courtOrderInPlace: r.status.marginalNote === 'Court order in place',
      courtOrderRevoked: r.status.marginalNote === 'Court order revoked'
    },
    nextRegistration: blocked ? {
      systemNumber: null
    } : {
      systemNumber: r.nextRegistration?.id
    },
    previousRegistration: blocked ? {
      systemNumber: null
    } : {
      systemNumber: r.previousRegistration?.id
    }
  };
};

const processV1DeathRecord = r => {
  const blocked = r.status.blocked !== false;
  const block = blocked ? () => 'UNAVAILABLE' : value => value;

  return {
    id: Number(r.id),
    date: block(toBritishDateFormat(r.date)),
    entryNumber: block(r.entryNumber),
    registrar: {
      signature: block(r.registrar.signature),
      designation: block(r.registrar.designation),
      subdistrict: block(r.registrar.subdistrict),
      district: block(r.registrar.district),
      administrativeArea: block(r.registrar.administrativeArea)
    },
    informant: {
      forenames: block(r.informant.forenames),
      surname: block(r.informant.surname),
      address: block(r.informant.address),
      qualification: block(r.informant.qualification),
      signature: block(r.informant.signature)
    },
    deceased: {
      forenames: block(r.deceased.forenames),
      surname: block(r.deceased.surname),
      maidenSurname: block(r.deceased.maidenSurname),
      dateOfBirth: block(toBritishDateFormat(r.deceased.dateOfBirth)),
      dateOfDeath: block(toBritishDateFormat(r.deceased.dateOfDeath)),
      dateOfDeathQualifier: block(r.deceased.dateOfDeathQualifier),
      birthplace: block(r.deceased.birthplace),
      deathplace: block(r.deceased.deathplace),
      ageAtDeath: block(r.deceased.ageAtDeath),
      sex: block(r.deceased.sex),
      address: block(r.deceased.address),
      occupation: block(r.deceased.occupation),
      retired: blocked ? false : r.deceased.retired,
      causeOfDeath: block(r.deceased.causeOfDeath),
      certifiedBy: block(r.deceased.certifiedBy),
      relationshipToPartner: block(r.deceased.relationshipToPartner),
      aliases: blocked ? [] : r.deceased.aliases
    },
    partner: {
      name: block(r.partner.name),
      occupation: block(r.partner.occupation),
      retired: block(r.partner.retired)
    },
    mother: {
      name: block(r.mother.name),
      occupation: block(r.mother.occupation)
    },
    father: {
      name: block(r.father.name),
      occupation: block(r.father.occupation)
    },
    coroner: {
      name: block(r.coroner.name),
      designation: block(r.coroner.designation),
      area: block(r.coroner.area)
    },
    inquestDate: block(r.inquestDate),
    status: {
      refer: blocked || (r.status.marginalNote && r.status.marginalNote !== 'None'),
      corrected: r.status.correction && r.status.correction !== 'None'
    },
    previousRegistration: blocked ? {
      date: null,
      systemNumber: null
    } : {
      date: r.previousRegistration && r.previousRegistration.date,
      systemNumber: r.previousRegistration && r.previousRegistration.id
    },
    nextRegistration: blocked ? {
      date: null,
      systemNumber: null
    } : {
      date: r.nextRegistration && r.nextRegistration.date,
      systemNumber: r.nextRegistration && r.nextRegistration.id
    }
  };
};

const processV1MarriageRecord = r => {
  const blocked = r.status.blocked !== false;
  const block = blocked ? () => 'UNAVAILABLE' : value => value;

  return {
    id: Number(r.id),
    entryNumber: block(r.entryNumber),
    dateOfMarriage: block(toBritishDateFormat(r.dateOfMarriage)),
    placeOfMarriage: {
      address: block(r.placeOfMarriage.address),
      parish: block(r.placeOfMarriage.parish),
      short: block(r.placeOfMarriage.short)
    },
    registrar: {
      signature: block(r.registrar.signature),
      designation: block(r.registrar.designation),
      superintendentSignature: block(r.registrar.superintendentSignature),
      superintendentDesignation: block(r.registrar.superintendentDesignation),
      district: block(r.registrar.district),
      administrativeArea: block(r.registrar.administrativeArea)
    },
    groom: {
      forenames: block(r.groom.forenames),
      surname: block(r.groom.surname),
      age: block(Number(r.groom.age)),
      occupation: block(r.groom.occupation),
      retired: block(r.groom.retired),
      address: block(r.groom.address),
      condition: block(r.groom.condition),
      signature: block(r.groom.signature)
    },
    bride: {
      forenames: block(r.bride.forenames),
      surname: block(r.bride.surname),
      age: block(Number(r.bride.age)),
      occupation: block(r.bride.occupation),
      retired: block(r.bride.retired),
      address: block(r.bride.address),
      condition: block(r.bride.condition),
      signature: block(r.bride.signature)
    },
    fatherOfGroom: {
      forenames: block(r.fatherOfGroom.forenames),
      surname: block(r.fatherOfGroom.surname),
      occupation: block(r.fatherOfGroom.occupation),
      retired: block(r.fatherOfGroom.retired),
      designation: block(r.fatherOfGroom.designation),
      deceased: block(r.fatherOfGroom.deceased)
    },
    fatherOfBride: {
      forenames: block(r.fatherOfBride.forenames),
      surname: block(r.fatherOfBride.surname),
      occupation: block(r.fatherOfBride.occupation),
      retired: block(r.fatherOfBride.retired),
      designation: block(r.fatherOfBride.designation),
      deceased: block(r.fatherOfBride.deceased)
    },
    witness1: {
      signature: block(r.witness1.signature)
    },
    witness2: {
      signature: block(r.witness2.signature)
    },
    witness3: {
      signature: block(r.witness3.signature)
    },
    witness4: {
      signature: block(r.witness4.signature)
    },
    witness5: {
      signature: block(r.witness5.signature)
    },
    witness6: {
      signature: block(r.witness6.signature)
    },
    witness7: {
      signature: block(r.witness7.signature)
    },
    witness8: {
      signature: block(r.witness8.signature)
    },
    witness9: {
      signature: block(r.witness9.signature)
    },
    witness10: {
      signature: block(r.witness10.signature)
    },
    status: {
      refer: blocked || (r.status.marginalNote && r.status.marginalNote !== 'None')
    },
    previousRegistration: blocked ? {
      systemNumber: null
    } : {
      systemNumber: r.previousRegistration && r.previousRegistration.id
    },
    nextRegistration: blocked ? {
      systemNumber: null
    } : {
      systemNumber: r.nextRegistration && r.nextRegistration.id
    }
  };
};

const processV1PartnershipRecord = r => {
  const blocked = r.status.blocked !== false;
  const block = blocked ? () => 'UNAVAILABLE' : value => value;

  return {
    id: Number(r.id),
    dateOfPartnership: block(toBritishDateFormat(r.dateOfPartnership)),
    placeOfPartnership: {
      address: block(r.placeOfPartnership.address),
      short: block(r.placeOfPartnership.short)
    },
    registrar: {
      signature: block(r.registrar.signature)
    },
    partner1: {
      prefix: r.partner1.prefix,
      forenames: block(r.partner1.forenames),
      surname: block(r.partner1.surname),
      suffix: r.partner1.suffix,
      dob: block(toBritishDateFormat(r.partner1.dob)),
      sex: block(r.partner1.sex),
      occupation: block(r.partner1.occupation),
      retired: block(r.partner1.retired),
      address: block(r.partner1.address),
      aliases: blocked ? [] : r.partner1.aliases,
      condition: block(r.partner1.condition),
      signature: block(r.partner1.signature)
    },
    partner2: {
      prefix: block(r.partner2.prefix),
      forenames: block(r.partner2.forenames),
      surname: block(r.partner2.surname),
      suffix: block(r.partner2.suffix),
      dob: block(toBritishDateFormat(r.partner2.dob)),
      sex: block(r.partner2.sex),
      occupation: block(r.partner2.occupation),
      retired: block(r.partner2.retired),
      address: block(r.partner2.address),
      aliases: blocked ? [] : r.partner2.aliases,
      condition: block(r.partner2.condition),
      signature: block(r.partner2.signature)
    },
    fatherOfPartner1: {
      forenames: block(r.fatherOfPartner1.forenames),
      surname: block(r.fatherOfPartner1.surname),
      occupation: block(r.fatherOfPartner1.occupation),
      retired: block(r.fatherOfPartner1.retired),
      designation: block(r.fatherOfPartner1.designation),
      deceased: block(r.fatherOfPartner1.deceased)
    },
    fatherOfPartner2: {
      forenames: block(r.fatherOfPartner2.forenames),
      surname: block(r.fatherOfPartner2.surname),
      occupation: block(r.fatherOfPartner2.occupation),
      retired: block(r.fatherOfPartner2.retired),
      designation: block(r.fatherOfPartner2.designation),
      deceased: block(r.fatherOfPartner2.deceased)
    },
    motherOfPartner1: {
      forenames: block(r.motherOfPartner1.forenames),
      surname: block(r.motherOfPartner1.surname),
      occupation: block(r.motherOfPartner1.occupation),
      retired: block(r.motherOfPartner1.retired),
      designation: block(r.motherOfPartner1.designation),
      deceased: block(r.motherOfPartner1.deceased)
    },
    motherOfPartner2: {
      forenames: block(r.motherOfPartner2.forenames),
      surname: block(r.motherOfPartner2.surname),
      occupation: block(r.motherOfPartner2.occupation),
      retired: block(r.motherOfPartner2.retired),
      designation: block(r.motherOfPartner2.designation),
      deceased: block(r.motherOfPartner2.deceased)
    },
    witness1: {
      forename: block(r.witness1.forename),
      surname: block(r.witness1.surname)
    },
    witness2: {
      forename: block(r.witness2.forename),
      surname: block(r.witness2.surname)
    },
    status: {
      refer: blocked || (r.status.marginalNote && r.status.marginalNote !== 'None')
    },
    previousRegistration: blocked ? {
      systemNumber: null
    } : {
      systemNumber: r.previousRegistration && r.previousRegistration.id
    },
    nextRegistration: blocked ? {
      systemNumber: null
    } : {
      systemNumber: r.nextRegistration && r.nextRegistration.id
    }
  };
};
