import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { parseEther } from 'viem';

import ABIMarket from '@/ABI/MARKETPLACE.json';

import { BuyNFTsProps } from '@/components/buttons/types';

const CONTRACT_MARKET: string | undefined = process.env.CONTRACT_MARKETPLACE;

export const useUnListNFT = ({ tokenId }: BuyNFTsProps) => {
  const { config } = usePrepareContractWrite({
    address: CONTRACT_MARKET as `0x${string}`,
    abi: ABIMarket,
    functionName: 'unlistNFT',
    args: [tokenId],
  });

  const {
    data: unListNFTs,
    isLoading: isLoadingUnListNFTs,
    write: writeUnListNFTs,
  } = useContractWrite(config);

  return { unListNFTs, isLoadingUnListNFTs, writeUnListNFTs };
};
