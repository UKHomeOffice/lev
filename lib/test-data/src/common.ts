export type Name = {
  "forenames": string
  "surname": string
};

export type DateOfBirth = {
  "dateOfBirth"?: string
};

export type Birthplace = {
  "birthplace"?: string
};

export type Address = {
  "address"?: string
};

export type FullName = Name & {
  "prefix"?: string
  "suffix"?: string
};

export type Informant = Name & Address & {
  "qualification"?: string
  "signature"?: string
  "signatureIsMark"?: boolean
};
