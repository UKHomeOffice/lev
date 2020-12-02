import { Address, Birthplace, DateOfBirth, FullName, Informant } from './common';
import data from './v1-births.json'

type Parent = FullName & Birthplace & {
  "occupation"?: string
  "aliases": FullName[]
};

export type V1Birth = {
  "id": number
  "date": string
  "entryNumber"?: number
  "registrar": {
    "signature": string
    "designation"?: string
    "superintendentSignature"?: string
    "superintendentDesignation"?: string
    "subdistrict": string
    "district": string
    "administrativeArea": string
  },
  "informant1": Informant
  "informant2": Informant
  "child": FullName & DateOfBirth & Birthplace & {
    "originalPrefix"?: string
    "originalForenames"?: string
    "originalSuffix"?: string
    "sex": string
  },
  "mother": Parent & Address & {
    "maidenSurname"?: string
    "marriageSurname"?: string
  },
  "father": Parent & {
    "deceased": boolean
  },
  "dateOfDeclaration"?: string
  "dateOfStatutoryDeclarationOfParentage"?: string
  "statutoryDeclarationOfParentage"?: string
  "dateOfNameUpdate"?: string
  "status": {
    "blocked": boolean
    "cancelled": boolean
    "correction": string
    "marginalNote": string
    "nameUpdate": string
    "onAuthorityOfRegistrarGeneral": boolean
    "potentiallyFictitious": boolean
    "praOrCourtOrder": string
    "reregistration": string
  },
  "nextRegistration"?: V1Birth
  "previousRegistration"?: V1Birth
}

export const v1Births: V1Birth[] = data;

export default v1Births;
