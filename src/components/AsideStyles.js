import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import {
  BsBox,
  BsStar,
  BsCalendar2Event,
  BsFolder2,
  BsPlusCircle,
  BsThreeDots,
  BsTrash,
  BsPencilSquare,
} from 'react-icons/bs';

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  min-width: 250px;
  height: 100%;
  overflow-y: hidden;
  padding: 20px;
  border-right: 1px solid var(--color-gray-04);

  @media only screen and (max-width: 640px) {
    display: none;
  }
`;

export const AsideNavLink = styled(NavLink)`
  display: flex;
  column-gap: 14px;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;

  .edit-button {
    display: none;
    min-width: 20px;
    height: 20px;
    margin-left: auto;
    color: var(--color-gray-06);

    &:hover {
      color: var(--highlight);
    }
  }
 
  &:hover {
    .save-notes {
      display: none;
    }

    .edit-button {
      display: block;
    }
  }

  &.active {
    background-color: var(--color-gray-01);
    color: var(--highlight);
  }
`;

export const BoxIcon = styled(BsBox)`
  width: 15px;
  height: 15px;
`;

export const StarIcon = styled(BsStar)`
  width: 15px;
  height: 15px;
`;

export const CalendarIcon = styled(BsCalendar2Event)`
  width: 15px;
  height: 15px;
`;

export const FolderIcon = styled(BsFolder2)`
  width: 15px;
  height: 15px;
`;

export const PlusIcon = styled(BsPlusCircle)`
  width: 15px;
  height: 15px;
`;

export const BsThreeDotsIcon = styled(BsThreeDots)`
  width: 15px;
  height: 15px;
`;

export const BsTrashIcon = styled(BsTrash)`
  width: 15px;
  height: 15px;
`;

export const BsPencilSquareIcon = styled(BsPencilSquare)`
  width: 15px;
  height: 15px;
`;
