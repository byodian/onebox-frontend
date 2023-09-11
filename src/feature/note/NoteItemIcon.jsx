import { Dropdown } from 'antd';
import {
  MdOutlineMode,
  MdOutlineArticle,
  MdOutlineFolder,
  MdOutlineStarBorder,
} from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { StarIcon } from '../../components/button';

function DropdownWrapper({ folders, onClick }) {
  const items = folders.map((folder) => ({
    key: folder.id,
    label: (
      <div onClick={() => onClick(folder.id)} aria-hidden="true">{folder.name}</div>
    ),
  }));

  return (
    <Dropdown menu={{ items }} placement="left" trigger={['click']} destroyPopupOnHide>
      <MdOutlineFolder />
    </Dropdown>
  );
}

function NoteItemIcon({
  star,
  toggleStar,
  toggleEditDialog,
  toggleFolder,
  deleteNote,
  goDetail,
  folders,
  updateFolder,
}) {
  const IconGroup = [
    {
      id: 2,
      element: star === 1 ? <StarIcon /> : <MdOutlineStarBorder />,
      onClick: toggleStar,
      label: '星标',
    },
    {
      id: 3,
      element: <MdOutlineMode />,
      onClick: toggleEditDialog,
      label: '编辑',
    },
    {
      id: 4,
      element: <MdOutlineArticle />,
      onClick: goDetail,
      label: '查看详情',
    },
    {
      id: 5,
      element: <BiTrash />,
      onClick: deleteNote,
      label: '删除',
    },
    {
      id: 6,
      element: <DropdownWrapper folders={folders} onClick={updateFolder} />,
      onClick: toggleFolder,
      label: '移动',
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
