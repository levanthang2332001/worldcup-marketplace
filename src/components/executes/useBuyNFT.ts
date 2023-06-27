import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseEther } from 'viem';

import ABIMarket from '@/ABI/MARKETPLACE.json';

import { BuyNFTsProps } from '@/components/buttons/types';

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
