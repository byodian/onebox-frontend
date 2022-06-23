import React from 'react';

import {
  DeleteIcon,
  CreateIcon,
  StarBorderIcon,
  StarIcon,
  DetailIcon,
} from './IconStyles';

function NoteItemIcon({
  like, toggleLike, toggleVisible, deleteNote, goDetail,
}) {
  const IconGroup = [
    {
      id: 2,
      element: like ? <StarIcon /> : <StarBorderIcon />,
      onClick: toggleLike,
      label: '星标',
    },
    {
      id: 3,
      element: <CreateIcon />,
      onClick: toggleVisible,
      label: '编辑',
    },
    {
      id: 4,
      element: <DetailIcon />,
      onClick: goDetail,
      label: '查看详情',
    },
    {
      id: 5,
      element: <DeleteIcon />,
      onClick: deleteNote,
      label: '删除',
    },
  ];

  return (
    <div
      className="flex ml-auto items-center gap-x-2"
    >
      {IconGroup.map((icon) => (
        <button
          className="flex justify-center items-center w-[28px] h-[28px] rounded-full cursor-pointer hover:text-[color:var(--highlight)] hover:bg-[color:var(--highlight-1)]"
          onClick={icon.onClick}
          key={icon.id}
          title={icon.label}
          type="button"
        >
          {icon.element}
        </button>
      ))}
    </div>
  );
}

export default NoteItemIcon;
