import React, { useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { ButtonBuy } from '@/components/buttons/index';

import { ButtonUnList } from './ButtonUnList';

/*
  Check owner and connection address
*/
type ButtonProps = {
  tokenId?: number;
  price?: number | undefined;
  sender?: string | undefined;
};

export const ButtonCheckSender = (props: ButtonProps) => {
  const [lowerCaseAddress, setLowerCaseAddress] = useState<string>('');
  const { address } = useAccount();

  const { tokenId, price, sender } = props;

  const checkSender = useMemo(() => {
    if (address) {
      setLowerCaseAddress(address?.toLowerCase());
      if (sender === lowerCaseAddress) {
        return true;
      }
      return false;
    }
    return false;
  }, [sender, lowerCaseAddress]);

  return (
    <>
      {checkSender ? (
        <ButtonUnList tokenId={tokenId}></ButtonUnList>
      ) : (
        <ButtonBuy tokenId={tokenId} price={price}></ButtonBuy>
      )}
    </>
  );
};
