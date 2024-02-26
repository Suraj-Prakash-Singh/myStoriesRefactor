import React from 'react';
import { useSelector } from 'react-redux';
import { selectPostById, useGetPostQuery } from './postSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaArrowLeft, FaRegComment, FaRegHeart } from 'react-icons/fa';
import _404 from '@/src/pages/_404';
import PostExcerptSkeleton from './PostExcerptSkeleton';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
const Post = () => {
  const { postId } = useParams();
  const nav = useNavigate();
  if (!postId) return nav('/');
  const { isError, isLoading, data: post } = useGetPostQuery(postId);

  if (isError) return <_404 />;
  return (
    <div>
      <div className="flex">
        <Link className="rounded-full flex items-center space-x-2 p-4 hover:underline">
          <FaArrowLeft />
          <p className="font-semibold text-lg">Post</p>
        </Link>
      </div>
      <div className="p-4 flex space-x-2 border-t">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-2">
          <div className="space-x-1 flex items-center">
            <Link className="font-semibold text-lg">Dale Cabarle</Link>
            <Link className="text-sm text-slate-500">@MrDaleCabarle</Link>
          </div>
          {post?.content ? (
            <p>{post.content}</p>
          ) : (
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio quod cum mollitia, ducimus quo tenetur reiciendis
              maiores magni numquam totam?
            </p>
          )}
        </div>
      </div>
      <div className="flex space-x-2 p-4 border-y text-xl justify-between">
        <div className="flex space-x-4">
          <div className="text-slate-500 flex space-x-1 items-center">
            <FaRegHeart />
            <p>22k</p>
          </div>
          <div className="text-slate-500 flex space-x-1 items-center">
            <FaRegComment />
            <p>44</p>
          </div>
        </div>
        <div className="flex items-center">
          <HiOutlineDotsHorizontal />
        </div>
      </div>
    </div>
  );
};
export default Post;
