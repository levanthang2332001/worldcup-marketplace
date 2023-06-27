import { gql, useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { useMemo } from 'react';

import { Token } from '@/__generated__/graphql';

type TokenResponse = {
  tokens: Token[];
};

type DataType = {
  isLoading: boolean;
  isError: boolean;
  data: Token[] | undefined;
  refetch: any;
};

const QUERY_TOKEN = gql(`
query MyQuery{
  tokens(
    first: 50
    orderBy: tokenId
    orderDirection: asc
  ) {
    id
    tokenId
    owner
    sender
    price
    country
  }
}
`);

export const GetDataMarket = (): DataType => {
  const {
    data: dataQuery,
    loading: isLoadingNFTs,
    error: isErrorNFTs,
    refetch: refetchMarket,
  } = useQuery<TokenResponse>(QUERY_TOKEN);

  const formatData = useMemo(() => {
    if (!isLoadingNFTs && dataQuery) {
      const filterData = dataQuery?.tokens.filter(
        (item) => item.price !== null || NaN || undefined
      );

      return filterData.map((item) => ({
        id: item.id,
        tokenId: parseInt(item.tokenId),
        owner: item.owner as string,
        sender: item.sender as string,
        price: ethers.formatEther(item.price),
        country: parseInt(item.country),
      }));
    } else {
      return undefined;
    }
  }, [dataQuery]);

  return {
    isLoading: false,
    isError: false,
    data: formatData,
    refetch: refetchMarket,
  };
};
