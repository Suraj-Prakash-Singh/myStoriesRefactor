import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { formatCommentDate } from '@/src/utils/formatDate';
const Comment = ({ postId, comment }) => {
  const createdAt = comment.createdAt;
  const timeAgo = formatCommentDate(createdAt);
  return (
    <div className="">
      <div className="p-4 flex cursor-pointer space-x-2 hover:bg-slate-100 border-t">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        {/* if needed i can treat comment as a post aswell */}
        <Link to={`/profile/posts/${postId}`} className="space-y-1">
          <div className="space-x-1 flex items-center">
            <p className="font-semibold text-lg">Dale Cabarle</p>
            <p className="text-sm text-slate-500">@MrDaleCabarle</p>
            <p className="text-sm text-slate-500">· {timeAgo}</p>
          </div>

          <p>{comment.content}</p>
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
        </Link>
      </div>
    </div>
  );
};

export default Comment;
