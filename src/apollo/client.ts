import { ApolloClient, InMemoryCache } from '@apollo/client';

export const WFCIMarket = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/48552/shoesapi/version/latest',
  cache: new InMemoryCache(),
});
