import * as React from 'react';
import { IconType } from 'react-icons';

import { useAccount, useConnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import clsxm from '@/lib/clsxm';

const ButtonVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
  'requestConnect',
] as const;
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
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
    const disabled = isLoading || buttonDisabled;

    const buttonClass = clsxm('button', {
      'bg-custom-gradient w-[250px] h-[48px] rounded-[16px] border-[2px] border-black justify-center items-center text-center pt-[10px] text-white':
        variant === 'primary',
      'bg-custom-gradient h-[48px] w-[348px] rounded-[16px] border-[2px] border-black justify-center items-center text-center pt-[10px] text-white':
        variant === 'requestConnect',
    });

    const { address, isConnecting, isConnected, isDisconnected } = useAccount();

    const { connect } = useConnect({
      connector: new InjectedConnector(),
    });

    return (
      <div className={buttonClass}>
        <button onClick={() => connect()} className=' text-center'>
          {isConnected
            ? `${address?.slice(0, 4)}...${address?.slice(-4)}`
            : children}
        </button>
      </div>
    );
  }
);
