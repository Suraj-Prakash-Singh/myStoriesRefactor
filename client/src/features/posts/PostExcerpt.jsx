import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AiOutlineLike } from 'react-icons/ai';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Post = () => {
  return (
    <div className="p-4 flex cursor-pointer space-x-2 hover:bg-slate-100 border-t">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-1">
        <div className="space-x-1 flex items-center">
          <Link className="font-semibold text-lg">Dale Cabarle</Link>
          <Link className="text-sm text-slate-500">@MrDaleCabarle</Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
          quod cum mollitia, ducimus quo tenetur reiciendis maiores magni
          numquam totam?
        </p>
        <div className="flex space-x-2">
          <div className="text-slate-500 flex space-x-1 items-center">
            <FaRegHeart />
            <p>22k</p>
          </div>
          <div className="text-slate-500 flex space-x-1 items-center">
            <FaRegComment />
            <p>44</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
