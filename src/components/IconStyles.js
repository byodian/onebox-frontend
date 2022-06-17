import {
  MdMenu,
  MdFavoriteBorder,
  MdFavorite,
  MdClear,
  MdAdd
} from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { BsTag, BsEye, BsEyeSlash } from 'react-icons/bs';
import styled from 'styled-components';

export const Icon = styled.div`
  display: flex;
  align-items: center;
  height: var(--space-48);
  padding-left: var(--space-16);
  margin-bottom: var(--space-16);
  font-size: 2rem;
`;

export const CloseIcon = styled(MdClear)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const Hamburger = styled(MdMenu)`
  width: 24px;
  height: 24px;
`;

export const PlusIcon = styled(MdAdd)`
  width: 24px;
  height: 24px;
`;

export const FavoriteBorderIcon = styled(MdFavoriteBorder)`
`;

export const FavoriteIcon = styled(MdFavorite)`
  color: var(--color-red-03);
`;

export const DeleteIcon = styled(BiTrash)``;

export const TagIcon = styled(BsTag)``;

export const EyeOpenedIcon = styled(BsEye)``;

export const EyeHidedIcon = styled(BsEyeSlash)``;

