import { parseEther } from 'viem';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { BuyNFTsProps } from '@/components/buttons/types';

import ABIMarket from '@/ABI/MARKETPLACE.json';

const CONTRACT_MARKET: string | undefined = process.env.CONTRACT_MARKETPLACE;

export const useBuyNFT = ({ tokenId, price }: BuyNFTsProps) => {
  const { config } = usePrepareContractWrite({
    address: CONTRACT_MARKET as `0x${string}`,
    abi: ABIMarket,
    functionName: 'buyNFT',
    args: [tokenId],
    value: parseEther(`${price}`),
  });

  const {
    data: buyNFTs,
    isLoading: isLoadingBuyNFTs,
    write: writeBuyNFTs,
  } = useContractWrite(config);

  return { buyNFTs, isLoadingBuyNFTs, writeBuyNFTs };
};
