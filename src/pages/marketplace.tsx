import React, { useEffect, useState } from 'react';

import Header from '@/components/layout/Header';
import { GetDataMarket } from '@/components/queries/GetDataMarket.ts';
import { CardNFTs } from '@/components/cards/Card';
import { getDataCountry } from '@/components/queries/getCountry';
import { useAccount } from 'wagmi';
import { Skeleton } from '@chakra-ui/react';

type ListedProps = {
  id: string;
  tokenId: number;
  owner: string;
  sender: string;
  price: number;
  country: string | undefined;
  rarity: string | undefined;
}[];

export default function MarketPlace() {
  const [market, setMarket] = useState<ListedProps>([]);
  const { data: data, isLoading, refetch } = GetDataMarket();

  useEffect(() => {
    if (data) {
      const formattedData = data.map((items) => {
        const countryData = getDataCountry(items.country);
        const rarity = countryData?.rarity as string;

        return {
          id: items.id,
          tokenId: items.tokenId,
          owner: items.owner,
          sender: items.sender,
          price: items.price,
          country: countryData?.country,
          rarity: rarity,
        };
      });
      setMarket(formattedData);
    }
  }, [data, refetch]);

  return (
    <div>
      <Header />
      <div className='w-max-full h-max-full grid h-[1080px] min-h-[1080px] grid-cols-4 gap-y-4 bg-[#080A0C] pl-[6rem] pt-4'>
        {market &&
          market.map((e) => {
            return isLoading ? (
              <Skeleton height='20rem' width='80%' />
            ) : (
              <CardNFTs
                id={e.tokenId}
                team={e.country}
                rarity={e.rarity}
                price={e.price}
                sender={e.sender}
              ></CardNFTs>
            );
          })}
      </div>
    </div>
  );
}
