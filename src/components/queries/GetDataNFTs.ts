import { gql, useQuery } from '@apollo/client';
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
  query MyQuery($ownerAddress: String!) {
    tokens(
      first: 50
      orderBy: tokenId
      orderDirection: asc
      where: { owner: $ownerAddress }
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

export const GetDataNFTs = ({
  ownerAddress,
}: {
  ownerAddress: string | undefined;
}): DataType => {
  const {
    data: dataQuery,
    loading: isLoadingNFTs,
    error: isErrorNFTs,
    refetch: refetchNFTs,
  } = useQuery<TokenResponse>(QUERY_TOKEN, {
    variables: { ownerAddress },
  });

  const formatData = useMemo(() => {
    if (!isLoadingNFTs && dataQuery) {
      return dataQuery.tokens.map((item) => ({
        id: item.id,
        tokenId: parseInt(item.tokenId),
        owner: item.owner,
        country: item.country,
      }));
    } else {
      return undefined;
    }
  }, [dataQuery]);

  return {
    isLoading: false,
    isError: false,
    data: formatData,
    refetch: refetchNFTs,
  };
};
