import React, { useState } from 'react';

// import InputTag from './InputTag';
import {
  DeleteIcon,
  TagIcon,
  CreateIcon,
  StarBorderIcon,
  StarIcon,
  DetailIcon,
} from './IconStyles';

// import { useField } from '../hooks/';

function NoteItemIcon({
  tags, like, toggleLike, toggleVisible, deleteNote, updateTag, goDetail,
}) {
  // const tagsState = useField('text', tags.join(','));
  const [visibility, setVisibility] = useState(false);

  const IconGroup = [
    {
      id: 1,
      element: <TagIcon />,
      onClick: () => setVisibility(!visibility),
      label: '开发中...',
    },
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

  // const handleTagUpdate = () => {
  //   updateTag(tagsState.value);
  //   setVisibility(!visibility);
  // };

  return (
    <>
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

      {/* {visibility */}
      {/*   ? <InputTag tagsState={tagsState} handleTagsSubmit={handleTagUpdate} /> */}
      {/*   : null */}
      {/* } */}
    </>
  );
}

export default NoteItemIcon;
