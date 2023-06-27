import { useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { BuyNFTsProps } from './types';
import { Button } from '../buttons/index';
import { useBuyNFT } from '../executes/index';

export const ButtonBuy = (props: BuyNFTsProps) => {
  const toast = useToast();
  const { address, isConnected } = useAccount();

  const { tokenId, price } = props;

  const { buyNFTs, isLoadingBuyNFTs, writeBuyNFTs } = useBuyNFT({
    tokenId,
    price,
  });

  const handleBuyNFTs = (e: any) => {
    writeBuyNFTs?.();
  };

  useEffect(() => {
    if (isLoadingBuyNFTs) {
      toast({
        title: 'Success.',
        description: '',
        status: 'success',
        duration: 3000,
        isClosable: false,
        position: 'top-right',
      });
    }
  }, [buyNFTs]);

  return (
    <>
      {!isConnected ? (
        <Button variant='requestConnect'>Connect Wallet</Button>
      ) : (
        <button
          onClick={handleBuyNFTs}
          className='bg-custom-gradient h-[48px] w-[348px] items-center justify-center rounded-[16px] border-[2px] border-black text-center text-white'
        >
          Buy
        </button>
      )}
    </>
  );
};
