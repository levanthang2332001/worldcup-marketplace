import { Card, CardBody, Image, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';

import { ButtonCheckSender } from '@/components/buttons/ButtonCheckSender';
import { ButtonList } from '@/components/buttons/ButtonList';

import CardModal from '../modals/CardModal';

interface CardProps {
  id?: number;
  tokenId?: number;
  team?: string | undefined;
  event?: React.ReactElement;
  image?: string | undefined;
  price?: number | undefined;
  rarity?: string | undefined;
  sender?: string | undefined;
}

export const CardNFTs = (props: CardProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { id, team, rarity, price, sender } = props;

  const imagePath = `/images/shoes/${team}.png`;
  const trimmedImagePath = imagePath.replace(/\s/g, '');

  const handleModal = () => {
    setIsModal(true);
  };

  return (
    <>
      <div
        className='w-[330px] cursor-pointer pt-3'
        onClick={handleModal}
        key={id}
      >
        <Card maxW='sm' className='rounded-2xl' bgColor='black'>
          <CardBody className='overflow-hidden rounded-lg bg-[#0E1114]'>
            <Image
              src={trimmedImagePath}
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <div className='flex flex-row items-center justify-between space-x-8'>
                <div className='flex flex-col space-y-3'>
                  <span className='text-sm font-light text-[#7D8DA7]'>
                    Team
                  </span>
                  <span className='text-s text-white'>{team}</span>
                </div>
                <div className='flex flex-col space-y-3'>
                  <span className='text-sm font-light text-[#7D8DA7]'>
                    Rarity
                  </span>
                  <span className='text-s text-white'>0.08%</span>
                </div>
              </div>
              <div className=' overline decoration-2 underline-offset-4 '>
                {price != null ? (
                  <div className='flex flex-row justify-between'>
                    <div>
                      <span className='text-sm font-light text-[#7D8DA7]'>
                        Price
                      </span>
                    </div>
                    <div className='flex flex-row space-x-2'>
                      <span className=''>
                        <Image
                          src='/images/iconBNB.png'
                          width={18}
                          height={18}
                        ></Image>
                      </span>
                      <span className='text-sm font-light text-white'>
                        {price}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </Stack>
          </CardBody>
        </Card>
      </div>
      <CardModal
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        image={trimmedImagePath}
        team={team}
        tokenId={id}
        rarity={rarity}
        event={
          price == null ? (
            <ButtonList tokenId={id} sender={sender}></ButtonList>
          ) : (
            <ButtonCheckSender
              tokenId={id}
              price={price}
              sender={sender}
            ></ButtonCheckSender>
          )
        }
      ></CardModal>
    </>
  );
};
