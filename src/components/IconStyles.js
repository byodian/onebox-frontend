import {
  MdMenu,
  MdOutlineStarBorder,
  MdOutlineStar,
  MdClear,
  MdAdd,
  MdOutlineMode,
  MdOutlineArticle
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

export const StarBorderIcon = styled(MdOutlineStarBorder)`
`;

export const StarIcon = styled(MdOutlineStar)`
  color: var(--highlight);
`;

export const DeleteIcon = styled(BiTrash)``;

export const TagIcon = styled(BsTag)``;

export const EyeOpenedIcon = styled(BsEye)``;

export const EyeHidedIcon = styled(BsEyeSlash)``;

export const CreateIcon = styled(MdOutlineMode)``;

export const DetailIcon = styled(MdOutlineArticle)``;
