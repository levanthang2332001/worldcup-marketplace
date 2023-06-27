import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from 'wagmi';
import { ethers } from 'ethers';

import ABIMarket from '@/ABI/MARKETPLACE.json';
import ABINFT from '@/ABI/NFT.json';
import { ListNFTPros } from './types';
import { useMemo } from 'react';

const CONTRACT_MARKET: string | undefined = process.env.CONTRACT_MARKETPLACE;
const CONTRACT_NFT: string | undefined = process.env.CONTRACT_NFT;

export const useCheckApproved = (address: string) => {
  const {
    data: isCheckApprovedNFT,
    isLoading: isLoadingApprovedNFT,
    isSuccess: isSuccessApprovedNFT,
  } = useContractRead({
    address: CONTRACT_NFT as `0x${string}`,
    abi: ABINFT,
    functionName: 'isApprovedForAll',
    args: [address, CONTRACT_MARKET],
  });

  return { isCheckApprovedNFT, isLoadingApprovedNFT, isSuccessApprovedNFT };
};

export const useApproveNFTs = () => {
  const approved: boolean = true;
  const { config } = usePrepareContractWrite({
    address: CONTRACT_NFT as `0x${string}`,
    abi: ABINFT,
    functionName: 'setApprovalForAllNFT',
    args: [CONTRACT_MARKET, approved],
  });

  const {
    data: approvedNFTs,
    isLoading: isLoadingApproved,
    write: writeApprovedNFTs,
    status: statusApproved,
  } = useContractWrite(config);

  return { approvedNFTs, isLoadingApproved, writeApprovedNFTs, statusApproved };
};

export const useListNFT = ({ tokenId, price }: ListNFTPros) => {
  const formatPrice = useMemo(() => {
    if (price) {
      return ethers.parseUnits(price);
    } else {
      return undefined;
    }
  }, [price]);

  console.log(formatPrice);

  const {
    data: listNFT,
    isLoading: isLoadingListNFTs,
    write: writeListNFTs,
  } = useContractWrite({
    address: CONTRACT_MARKET as `0x${string}`,
    abi: ABIMarket,
    functionName: 'listNFT',
    args: [tokenId, formatPrice],
  });

  return { listNFT, isLoadingListNFTs, writeListNFTs };
};
