import { CardNFTs } from '@/components/cards/Card';
import Header from '@/components/layout/Header';
import {
  getDataCountry,
  GetDataNFTs,
  GetQueryListing,
} from '@/components/queries/index';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const CONTRACT_MARKET: string | undefined = process.env.CONTRACT_MARKETPLACE;

type ListedProps = {
  id: string;
  tokenId: number;
  owner: string;
  country: string | undefined;
  price?: number | undefined;
  rarity: string | undefined;
  sender?: string | undefined;
}[];

export default function Asset() {
  const [changeElement, setChangElement] = useState<string>('asset');
  const [isCheckAsset, setIsCheckAsset] = useState<boolean>(true);
  const [isCheckListing, setIsCheckListing] = useState<boolean>(false);
  const [listed, setListed] = useState<ListedProps | undefined>();
  const [listing, setListing] = useState<ListedProps | undefined>();

  const { address } = useAccount();

  const { data: data, refetch: refetchData } = GetDataNFTs({
    ownerAddress: address,
  });

  const { data: dataListing, refetch: refetchListing } = GetQueryListing({
    ownerAddress: CONTRACT_MARKET,
    senderAddress: address,
  });
  useEffect(() => {
    if (data) {
      const formattedData = data?.map((items) => {
        const countryData = getDataCountry(parseInt(items.country));

        return {
          id: items.id,
          tokenId: items.tokenId,
          owner: items.owner,
          country: countryData.country,
          rarity: countryData.rarity,
        };
      });
      setListed(formattedData);
    }
  }, [data, refetchData]);

  useEffect(() => {
    if (dataListing) {
      const formattedDataListing = dataListing.map((items) => {
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
      setListing(formattedDataListing);
    }
  }, [dataListing, refetchListing]);

  const handClickAsset = () => {
    setChangElement('asset');
    setIsCheckAsset(true);
    setIsCheckListing(false);
  };

  const handClickListing = () => {
    setChangElement('listing');
    setIsCheckAsset(false);
    setIsCheckListing(true);
    refetchListing();
  };

  return (
    <div className='w-max-full h-max-full h-[828px] min-h-[828px] bg-[#080A0C]'>
      <Header />
      <div className='flex flex-row gap-4 pl-[6rem] pt-5'>
        <div
          className={
            changeElement === 'asset' ? 'text-white' : 'text-[#7D8DA7]'
          }
        >
          <button
            onClick={handClickAsset}
            className='cursor-pointer underline decoration-2 underline-offset-4 hover:underline-offset-2'
          >
            My Asset
          </button>
        </div>
        <div
          className={
            changeElement === 'listing' ? 'text-white' : 'text-[#7D8DA7]'
          }
        >
          <button
            onClick={handClickListing}
            className='cursor-pointer underline decoration-2 underline-offset-4 hover:underline-offset-2'
          >
            Listing
          </button>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4 bg-[#080A0C] pb-20 pl-24 pt-12'>
        {isCheckAsset && !isCheckListing
          ? listed &&
            listed.map((items) => {
              return (
                <CardNFTs
                  id={items.tokenId}
                  team={items.country}
                  rarity={items.rarity}
                ></CardNFTs>
              );
            })
          : listing &&
            listing.map((item) => {
              return (
                <CardNFTs
                  key={item.tokenId}
                  id={item.tokenId}
                  team={item.country}
                  price={item.price}
                  rarity={item.rarity}
                  sender={item.sender}
                ></CardNFTs>
              );
            })}
      </div>
    </div>
  );
}
