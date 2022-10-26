import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
import {
  BsBox, BsStar, BsCalendar2Event, BsFolder2, BsPlusCircle,
} from 'react-icons/bs';

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  min-width: 250px;
  height: 100%;
  overflow-y: hidden;
  padding-top: 20px;
  margin-right: 2rem;
  border-right: 1px solid var(--color-gray-04);
`;

export const AsideNavLink = styled(NavLink)`
  display: flex;
  width: 100%;
  column-gap: 14px;
  padding: 8px 12px;
  border-radius: 4px;

  &.active {
    background-color: var(--color-gray-01);
    color: var(--highlight);
  }
`;

export const BoxIcon = styled(BsBox)`
  width: 20px;
  height: 20px;
`;

export const StarIcon = styled(BsStar)`
  width: 20px;
  height: 20px;
`;

export const CalendarIcon = styled(BsCalendar2Event)`
  width: 20px;
  height: 20px;
`;

export const FolderIcon = styled(BsFolder2)`
  width: 20px;
  height: 20px;
`;

export const PlusIcon = styled(BsPlusCircle)`
  width: 20px;
  height: 20px;
`;
