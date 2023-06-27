import { parseEther } from 'viem';
import { useContractWrite } from 'wagmi';

import ABINFT from '@/ABI/NFT.json';

const CONTRACT_NFT: string | undefined = process.env.CONTRACT_NFT;

export const useMintNFT = () => {
  const {
    data: dataMint,
    isLoading: isLoadingMint,
    write: writeMint,
  } = useContractWrite({
    address: (CONTRACT_NFT as `0x${string}`) || undefined,
    abi: ABINFT,
    functionName: 'safeMint',
    value: parseEther('0.0001'),
  });

  return {
    data: dataMint,
    isLoading: isLoadingMint,
    write: writeMint,
  };
};
