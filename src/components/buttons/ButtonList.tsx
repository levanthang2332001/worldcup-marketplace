import React, { useState, useEffect, useMemo } from 'react';
import { BuyNFTsProps } from './types';
import CardListModal from '@/components/modals/CardListModal';
import { useAccount } from 'wagmi';
import { useApproveNFTs, useCheckApproved } from '@/components/executes';

export const ButtonList = (props: BuyNFTsProps) => {
  const { tokenId } = props;

  const { address, isConnected } = useAccount();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  const { isCheckApprovedNFT, isSuccessApprovedNFT } = useCheckApproved(
    address as `0x${string}`
  );
  const { approvedNFTs, isLoadingApproved, writeApprovedNFTs, statusApproved } =
    useApproveNFTs();

  const checkedApprovedNFT = useMemo(() => {
    if (isConnected && address && isSuccessApprovedNFT) {
      if (isCheckApprovedNFT) {
        return true;
      }
      return false;
    }
    return false;
  }, [isConnected, address]);

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleListNFTs = (e: React.FormEvent) => {
    if (!checkedApprovedNFT) {
      writeApprovedNFTs?.();
    }
  };

  useEffect(() => {
    if (statusApproved == 'success') {
      setIsApproved(true);
    }
  }, [statusApproved]);
  return (
    <>
      <button
        onClick={checkedApprovedNFT ? handleOpenModal : handleListNFTs}
        className='bg-custom-gradient h-[48px] w-[348px] items-center justify-center rounded-[16px] border-[2px] border-black text-center text-white'
      >
        {!checkedApprovedNFT && !isApproved ? 'Approve for all ' : 'Sell'}
      </button>
      <CardListModal
        isOpen={isModal}
        tokenId={tokenId}
        onClose={() => setIsModal(false)}
      ></CardListModal>
    </>
  );
};
