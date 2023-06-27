import * as React from 'react';

import WCFI from '~/images/WCFI.png';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/buttons/index';
import { useAccount, useBalance } from 'wagmi';
import Skeleton from 'react-loading-skeleton';

export default function Header() {
  const { address } = useAccount();
  const { data, isLoading } = useBalance({
    address: address,
    chainId: 97,
  });

  return (
    <header className=''>
      <div className=' flex flex-row space-x-7 bg-[#080A0C] py-7 pl-5'>
        <div className='pl-[4rem] pr-[6rem]'>
          <div>
            <Image src={WCFI} alt='Logo' className='space-x-10' />
          </div>
        </div>
        <div className='cursor-pointer text-base text-white'>
          <Link href='/'>Home</Link>
        </div>
        <div className='cursor-pointer text-base text-white'>
          <Link href='/marketplace'>Marketplace</Link>
        </div>
        <div className='cursor-pointer text-base text-white'>
          <Link href='/asset'>Asset</Link>
        </div>
        <div className='cursor-pointer text-base text-white'>
          <Link href='/'>Referral Program</Link>
        </div>
        <div className=''>
          <div className='relative bottom-[8px] left-[20rem] flex flex-row justify-between space-x-8'>
            <div className='flex flex-row space-x-2 text-white '>
              <Image
                src='/images/BUSD.png'
                width={40}
                height={48}
                alt='logoBUSD'
              ></Image>
              <div>
                <div className='text-md text-[#7D8DA7]'>BNB</div>
                <div className='text-white'>
                  {!isLoading ? (
                    data?.formatted.slice(0, 4)
                  ) : (
                    <Skeleton count={1} />
                  )}
                </div>
              </div>
            </div>
            <Button variant='primary' className=''>
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
