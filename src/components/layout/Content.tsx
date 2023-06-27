import Image from 'next/image';
import React from 'react';

import data from '@/data/data.json';

import { ButtonMint } from '@/components/buttons/ButtonMint';

import FootBall from '~/images/football.png';

// Function to get four data tier in json
const generateEightCountry = () => {
  const idGroups = [];

  for (let i = 0; i < data.length; i += 8) {
    idGroups.push(data.slice(i, i + 8));
  }

  const tables: Array<Array<{ id: number; country: string; rarity: string }>> =
    [[], [], [], []];

  for (let i = 0; i < idGroups.length; i++) {
    const tableIndex = i % 4;
    tables[tableIndex] = tables[tableIndex].concat(idGroups[i]);
  }

  return tables;
};

const trimCountry = (country: string) => {
  const imagePath = `/images/tier/${country}.png`;
  const trimImage = imagePath.replace(/\s/g, '');
  return trimImage;
};

export default function Content() {
  const data = generateEightCountry();

  return (
    <div className='pl-[10rem]'>
      <div className='flex h-[340px] w-[1000px] flex-row space-x-6 bg-[#0E1114]'>
        <Image
          className='h-auto max-h-full w-auto max-w-full'
          src={FootBall}
          alt='football'
        />
        <div className='flex max-h-full max-w-full flex-col space-y-6 pt-6 '>
          <span className='text-white'>Mint Your NFT</span>
          <br />
          <span className='text-xs leading-6 text-[#7D8DA7]'>
            Mint randomly releases NFT shoes to represent the national team
          </span>
          <div className='flex flex-col space-y-3'>
            <span className='text-xs leading-6 text-[#7D8DA7]'>
              Minted Times: <span className='ml-[184px] text-white'>0</span>
            </span>
            <span className='text-xs leading-6 text-[#7D8DA7]'>
              Mint rate:{' '}
              <span className='ml-[110px]  text-white'>20% Get Tier 1</span>
            </span>
          </div>
          <ButtonMint variant='secondary'>Connect Wallet</ButtonMint>
        </div>
      </div>
      <div className='flex flex-row space-x-3 pt-4'>
        <div className='grid grid-cols-2 gap-5'>
          {data.map((table, index) => (
            <div key={index}>
              <div className='h-[500px] max-h-full w-[490px] max-w-full bg-[#0E1114] px-3 py-2'>
                <div className='text-2xl text-[#B6BFCD]'>Tier {index + 1}</div>
                {table.map((item) => (
                  <div
                    className='flex w-[460px] flex-row justify-between pt-4'
                    key={item.id}
                  >
                    <div className='flex flex-row space-x-2 text-xs text-white'>
                      <Image
                        src={trimCountry(item.country)}
                        width={40}
                        height={40}
                        alt='image'
                      />
                      <div>
                        <div>{item.country}</div>
                        <div>
                          <div className='text-[10px] text-[#7D8DA7]'>
                            Minted: 50
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='text-white'>{item.rarity}%</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
