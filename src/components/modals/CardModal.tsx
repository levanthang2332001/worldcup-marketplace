import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image?: string;
  team?: string | undefined;
  rarity?: string | undefined;
  tokenId?: number;
  event?: React.ReactElement;
  price?: number | undefined;
};

export default function CardModal(props: ModalProps) {
  const { isOpen, onClose, image, team, rarity, tokenId, price, event } = props;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent bgColor='#0E1114'>
          <ModalHeader textColor='white'>NFT Detail </ModalHeader>
          <ModalCloseButton bgColor='white' />
          <ModalBody>
            <div className='flex flex-row space-x-3'>
              <Image alt='Image NFTs' src={image} width={200} height={200} />
              <div className='flex h-[12rem] w-[20rem] flex-col space-y-3 pt-3'>
                <div className='flex justify-between'>
                  <span className='text-[#7D8DA7]'>Team</span>
                  <span className='text-white'>{team}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-[#7D8DA7]'>Rarity</span>
                  <span className='text-white'>{rarity}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-[#7D8DA7]'>ID</span>
                  <span className='text-white'>#{tokenId}</span>
                </div>
                {price == null ? (
                  <div className='flex justify-between'>
                    <span className='text-[#7D8DA7]'>Estimate</span>
                    <span className='text-white'>$4,292</span>
                  </div>
                ) : (
                  <div className='flex justify-between'>
                    <span className='text-[#7D8DA7]'>Price</span>
                    <span className='text-white'>{price}</span>
                  </div>
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>{event ? event : 'ERROR'}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
