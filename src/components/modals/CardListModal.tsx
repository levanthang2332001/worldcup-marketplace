import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

import { useListNFT } from '@/components/executes/useListNFT';

type ListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tokenId?: number | undefined;
  event?: React.ReactElement;
  price?: string;
};

export default function CardListModal(props: ListModalProps) {
  const { isOpen, onClose, tokenId } = props;
  const [price, setPrice] = useState<string | undefined>();

  const initialRef = useRef<HTMLInputElement>(null);
  const valueInput = initialRef.current?.value;

  const { listNFT, isLoadingListNFTs, writeListNFTs } = useListNFT({
    tokenId,
    price,
  });

  const handleListNFTs = () => {
    setPrice(valueInput);
    writeListNFTs?.();
  };

  return (
    <div>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
      >
        <ModalOverlay />
        <ModalContent bgColor='#0E1114'>
          <ModalHeader color='white'>SELL NFT</ModalHeader>
          <ModalCloseButton color='white' />
          <ModalBody pb={6} className='space-y-5'>
            <FormControl>
              <FormLabel color='#7D8DA7' fontSize='md'>
                Enter price
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder='BNB'
                color='white'
                type='number'
              />
            </FormControl>
            <div className='flex flex-row justify-between'>
              <div className='text-sm text-[#7D8DA7]'>Est</div>
              <div className='text-sm text-[#FFFFFF]'>~ 96.000</div>
            </div>
            <div className='text-sm text-[#7D8DA7]'>
              Listing is FREE! When the sale succeeds, the following fees will
              occur.
            </div>
            <div className='flex flex-row justify-between'>
              <div className='text-sm text-[#7D8DA7]'>Marketplace Fee</div>
              <div className='text-sm text-[#FFFFFF]'>5%</div>
            </div>
            <div className='flex flex-row justify-between'>
              <div className='text-sm text-[#7D8DA7]'>You will receive</div>
              <div className='text-sm text-[#FFFFFF]'>0.00 BUSD</div>
            </div>
          </ModalBody>
          <ModalFooter className='mx-12 my-0'>
            <button
              onClick={handleListNFTs}
              className='bg-custom-gradient h-[48px] w-[348px] items-center justify-center rounded-[16px] border-[2px] border-black text-center text-white'
            >
              Sell
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
