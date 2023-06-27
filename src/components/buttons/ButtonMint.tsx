import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { useAccount, useConnect, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import { ToastContainer, toast } from 'react-toastify';

import clsxm from '@/lib/clsxm';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useMintNFT } from '@/components/executes/useMintNFT';
import { useToast } from '@chakra-ui/react';

const ButtonVariant = ['primary', 'secondary'] as const;
const ButtonSize = ['sm', 'base'] as const;

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

export const ButtonMint = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = '',
      size = 'base',
      isDarkBg = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref
  ) => {
    const toast = useToast();
    const { isConnected } = useAccount();

    const { connect } = useConnect({
      connector: new InjectedConnector(),
    });

    const {
      data: dataMint,
      isLoading: isLoadingMint,
      write: writeMint,
    } = useMintNFT();

    const buttonClass = clsxm('button', {
      'bg-custom-gradient w-[250px] h-[48px] rounded-[16px] border-[2px] border-black justify-center items-center text-center pt-2 text-white':
        variant === 'primary',
      ' cursor-pointer w-[348px] h-[48px] bg-black justify-center items-center rounded-2xl m-[1px] text-white text-center pt-[11px]':
        variant === 'secondary',
    });

    const handleConnecting = () => {
      try {
        if (!isConnected) {
          connect();
        } else {
          writeMint();
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      if (dataMint) {
        toast({
          title: 'Minted.',
          description: '',
          status: 'success',
          duration: 3000,
          isClosable: false,
          position: 'top-right',
        });
      }
    }, [isLoadingMint, dataMint]);

    return (
      <div
        className={
          variant === 'secondary'
            ? 'bg-custom-gradient h-[50px] w-[350px] rounded-2xl'
            : ''
        }
      >
        <div className={buttonClass} onClick={handleConnecting}>
          <button className=' text-center'>
            {isConnected ? 'Mint with 0.001 BNB' : children}
          </button>
        </div>
      </div>
    );
  }
);
