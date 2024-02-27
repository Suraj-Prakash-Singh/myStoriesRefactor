import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './postSlice';

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <div className="p-4 flex cursor-pointer space-x-2 hover:bg-slate-100 border-t">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Link to={`/profile/posts/${postId}`} className="space-y-1">
        <div className="space-x-1 flex items-center">
          <Link className="font-semibold text-lg">Dale Cabarle</Link>
          <Link className="text-sm text-slate-500">@MrDaleCabarle</Link>
          <p className="text-sm text-slate-500">- 1h ago</p>
        </div>
        {post.content ? (
          <p>{post.content}</p>
        ) : (
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            quod cum mollitia, ducimus quo tenetur reiciendis maiores magni
            numquam totam?
          </p>
        )}
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
  );
};

export default PostExcerpt;
