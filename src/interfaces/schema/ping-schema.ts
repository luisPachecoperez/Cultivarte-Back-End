import gql from 'graphql-tag';

export const pingTypeDefs = gql`
  type Ping {
    ping: String!
  }

  type Query {
    ping: Ping!
  }
`;
