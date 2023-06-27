import { useUnListNFT } from '@/components/executes';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';

type ButtonUnListProps = {
  tokenId: number | undefined;
};

export const ButtonUnList = (props: ButtonUnListProps) => {
  const { tokenId } = props;

  const { unListNFTs, isLoadingUnListNFTs, writeUnListNFTs } = useUnListNFT({
    tokenId,
  });

  const handleUnListNFTs = () => {
    writeUnListNFTs?.();
  };

  const route = useRouter();

  useEffect(() => {
    if (unListNFTs) {
      route.reload();
    }
  }, [unListNFTs]);
  return (
    <>
      <button
        onClick={handleUnListNFTs}
        className='bg-custom-gradient h-[48px] w-[348px] items-center justify-center rounded-[16px] border-[2px] border-black text-center text-white'
      >
        Cancel Listing
      </button>
    </>
  );
};
