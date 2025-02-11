import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSelectedPicture, picturesSelector } from '../reducer';
import { Picture } from '../types/picture.type';
import { isSome } from 'fp-ts/lib/Option';
import ModalPortal from './modal';
import { ApiStatus } from '../types/api.type';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;

const Pictures = () => {
  const dispatch = useDispatch();
  const picturesStatus = useSelector(picturesSelector);
  const selectedPicture = useSelector(getSelectedPicture);

  const handlePictureClick = (picture: Picture) => {
    dispatch({ type: 'SELECT_PICTURE', picture });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <Container>
      {picturesStatus.type === 'Loading' && <p>Loading...</p>}
      {picturesStatus.type === 'Failure' && <p>Error: {picturesStatus.error}</p>}
      {picturesStatus.type === 'Success' && picturesStatus.pictures.map((picture, index) => (
        <Image key={index} src={picture.previewFormat} alt={picture.author}
        onClick={() => handlePictureClick(picture)} />
      ))}
      {isSome(selectedPicture) && (
        <ModalPortal largeFormat={selectedPicture.value.largeFormat} close={handleCloseModal} />
      )}
    </Container>
  )
};

export default Pictures;
