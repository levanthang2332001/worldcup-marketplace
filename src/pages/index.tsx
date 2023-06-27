import * as React from 'react';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Header from '@/components/layout/Header';
import Content from '@/components/layout/Content';
import Image from 'next/image';

export default function HomePage() {
  return (
    <Layout>
      <main className=''>
        <div className='space-y-4 bg-[#080A0C]'>
          <Header />
          <div className=' flex flex-row pl-[10rem] pt-4'>
            <div className='h-[194px] w-[1000px] bg-[#0E1114]'>
              <div className='flex flex-row items-center justify-center space-x-[20rem] pt-10'>
                <div className='flex flex-col space-y-3 '>
                  <span className='text-lg text-[#7D8DA7]'>Total Reward</span>
                  <span className='text-2xl text-white'>$ 8.046.000</span>
                  <Link href=''>
                    <span className='text-xs text-white'>View Contract</span>
                  </Link>
                </div>
                <div className='flex flex-col space-y-3 '>
                  <span className='text-lg text-[#7D8DA7]'>Participant</span>
                  <span className='text-2xl text-white'>40.320</span>
                </div>
              </div>
            </div>
            <div className='absolute right-48 h-[550px] w-[320px] bg-[#0E1114]'>
              <div className='pt-4 text-white'> Match Schedule</div>
              <div className='pt-4 text-xs text-[#7D8DA7]'>
                Match day 1 of 3
              </div>
              <div className='space-y-5 pt-4'>
                <span className='text-xs text-[#7D8DA7]'>Group A</span>
                <div className='flex flex-row justify-between space-y-2'>
                  <div className='space-y-3'>
                    <div className='flex flex-row space-x-2 '>
                      <Image
                        width={30}
                        height={30}
                        src={'/images/tier/Qatar.png'}
                        alt='logo'
                      />
                      <span className='text-white'>QTA</span>
                    </div>
                    <div className='flex flex-row space-x-2'>
                      <Image
                        width={30}
                        height={30}
                        src={'/images/tier/Ecuador.png'}
                        alt='logo'
                      />
                      <span className='text-white'>ECU</span>
                    </div>
                  </div>
                  <span className='text-sm text-white '>
                    20/11 <br /> 23:00
                  </span>
                </div>
                <div className='flex flex-row justify-between space-y-2'>
                  <div className='space-y-3'>
                    <div className='flex flex-row space-x-2'>
                      <Image
                        width={30}
                        height={30}
                        src={'/images/tier/Senegal.png'}
                        alt='logo'
                      />
                      <span className='text-white'>SEN</span>
                    </div>
                    <div className='flex flex-row space-x-2'>
                      <Image
                        width={30}
                        height={30}
                        src={'/images/tier/Netherlands.png'}
                        alt='logo'
                      />
                      <span className='text-white'>NED</span>
                    </div>
                  </div>
                  <span className='text-sm text-white'>
                    23/11 <br /> 23:00
                  </span>
                </div>
              </div>
              <br />
              <div className='space-y-5'>
                <span className='text-xs text-[#7D8DA7]'>Group B</span>
                <div className='flex flex-row justify-between space-y-2'>
                  <div className='space-y-3'>
                    <div className='flex flex-row space-x-2'>
                      <Image
                        width={30}
                        height={30}
                        src={'/images/tier/England.png'}
                        alt='logo'
                      />
                      <span className='text-white'>ENG</span>
                    </div>
                    <div className='flex flex-row space-x-2'>
                      <Image
                        width={30}
                        height={30}
                        src={'/images/tier/Iran.png'}
                        alt='logo'
                      />
                      <span className='text-white'>IRN</span>
                    </div>
                  </div>
                  <span className='text-sm text-white'>
                    28/11 <br /> 23:00
                  </span>
                </div>
                <div className='flex flex-row justify-between space-y-2'>
                  <div className='space-y-3'>
                    <div className='flex flex-row space-x-2'>
                      <Image
                        width={30}
                        height={30}
                        src={'/images/tier/UnitedStates.png'}
                        alt='logo'
                      />
                      <span className='text-white'>USA</span>
                    </div>
                    <div className='flex flex-row space-x-2'>
                      <Image
                        width={30}
                        height={30}
                        src={'/images/tier/Wales.png'}
                        alt='logo'
                      />
                      <span className='text-white'>WAL</span>
                    </div>
                  </div>
                  <span className='text-sm text-white'>
                    28/11 <br /> 23:00
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Content />
        </div>
      </main>
    </Layout>
  );
}
