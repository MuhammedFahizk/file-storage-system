import Link from "next/link";
import Div from "./Div";
import { FileActionsMenu } from "./FileActionMenu";
import { BsFillFolderFill } from "react-icons/bs";
import { useState } from "react";

export const FolderItem = ({ item, onRename,onDelete }) => {
  const [data, setData] = useState(item)
  return (
    <Div
      className="overflow-hidden w-full bg-ternary p-4 rounded-xl
                 group cursor-pointer hover:shadow-lg transition-shadow duration-200 relative"
    //   onClick={() => onFolderClick(item)} // Keep folder clickable for navigation
    >
      <div className="absolute top-2 right-2 z-10">
        <FileActionsMenu onRename={onRename} onDelete={onDelete}  item={item} />
      </div>

      <div className="flex items-center space-x-3">
        <span className=" text-3xl">
          <BsFillFolderFill className="text-3xl text-green-500" />
        </span>
        <p
          className="flex-1 text-md font-medium text-gray-800
                       whitespace-nowrap overflow-hidden text-ellipsis pr-10"
          title={item.name}
        >
          {item.name}
        </p>
      </div>

      <Link
        href={`/folders/${item._id}`}
        className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 text-sm mt-3"
      >
        Folder
      </Link>
    </Div>
  );
};
