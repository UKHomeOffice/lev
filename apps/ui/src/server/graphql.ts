import { makeExecutableSchema } from '@graphql-tools/schema';
import { errors } from '@not-govuk/engine';
import { MockClient, V1Birth } from '@ho-lev/client';

// The GraphQL schema in string form
const typeDefs = `
type Query {
  v1Birth(id: Int!): V1Birth
  v1Births(forenames: String!, surname: String!, dateOfBirth: String!): [V1Birth]!
}

type V1Birth {
  id: Int!
  date: String!
  entryNumber: Int!
  registrar: V1BirthRegistrar!
  informant1: V1BirthInformant!
  informant2: V1BirthInformant!
  child: V1BirthChild!
  mother: V1BirthMother!
  father: V1BirthFather!
  dateOfDeclaration: String
  dateOfStatutoryDeclarationOfParentage: String
  statutoryDeclarationOfParentage: String
  dateOfNameUpdate: String
  status: V1BirthStatus!
  nextRegistration: V1Birth
  previousRegistration: V1Birth
}

type V1BirthRegistrar {
  signature: String!
  designation: String!
  superintendentSignature: String
  superintendentDesignation: String
  subdistrict: String!
  district: String!
  administrativeArea: String!
}

type V1BirthInformant {
  forenames: String!
  surname: String!
  address: String
  qualification: String!
  signature: String!
  signatureIsMark: Boolean!
}

type V1BirthChild {
  forenames: String!
  surname: String!
  prefix: String
  suffix: String
  dateOfBirth: String!
  birthplace: String!
  originalPrefix: String
  originalForenames: String!
  originalSuffix: String
  sex: String!
}

type V1BirthMother {
  forenames: String!
  surname: String!
  prefix: String
  suffix: String
  birthplace: String!
  occupation: String!
  aliases: [V1BirthFullName]!
  maidenSurname: String!
  marriageSurname: String!
}

type V1BirthFather {
  forenames: String!
  surname: String!
  prefix: String
  suffix: String
  birthplace: String!
  occupation: String!
  aliases: [V1BirthFullName]!
  deceased: Boolean!
}

type V1BirthFullName {
  forenames: String!
  surname: String!
  prefix: String
  suffix: String
}

type V1BirthStatus {
  blocked: Boolean!
  cancelled: Boolean!
  correction: String!
  marginalNote: String!
  nameUpdate: String!
  onAuthorityOfRegistrarGeneral: Boolean!
  potentiallyFictitious: Boolean!
  praOrCourtOrder: String!
  reregistration: String!
},
`;

const hasAccess = (roles: string[], resource: string): boolean => (
  roles.includes(resource)
);

const Redact = (roles: string[]) => (obj: object) => (key: string, role: string) => {
  if (!roles.includes(role)) {
    throw new errors.ForbiddenError(`You do not have permission to access the property '${key}' on this object.`);
  }

  return obj[key];
};

const redactBirth = roles => {
  const redactor = Redact(roles);

  return e => {
    const redact = redactor(e);

    return {
      ...e//,
      //date: redact('date', 'birth.date'),
    }
  }
}

const Client = MockClient;

// The resolvers
const resolvers = {
  Query: {
    v1Birth: async (root, { id }, context): Promise<V1Birth | Error> => {
      const roles = context?.auth?.roles || [];

      if (!hasAccess(roles, 'birth')) {
        return new errors.ForbiddenError(`You do not have permission to access the resource 'v1Birth'.`);
      } else {
        const client = Client();
        const data = await client.readV1Birth(id);

        if (data instanceof Error) {
          return data;
        } else {
          try {
            return redactBirth(roles)(data);
          } catch (e) {
            return e;
          }
        }
      }
    },
    v1Births: async (root, { forenames, surname, dateOfBirth }, context): Promise<V1Birth[] | Error> => {
      const roles = context?.auth?.roles || [];

      if (!hasAccess(roles, 'birth')) {
        return new errors.ForbiddenError(`You do not have permission to access the resource 'v1Birth'.`);
      } else {
        const client = Client();
        const data = await client.searchV1Birth({
          forenames,
          surname,
          dateOfBirth
        });

        if (data instanceof Error) {
          return data;
        } else {
          try {
            return data.map(redactBirth(roles));
          } catch (e) {
            return e;
          }
        }
      }
    }
  }
};

// Put together a schema
export const graphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default graphQLSchema;
