import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectPostById,
  useGetPostQuery,
  useInteractToPostMutation,
} from './postSlice';

const PostExcerpt = ({ postId }) => {
  const { data: post, isSuccess } = useGetPostQuery(postId);
  const [interactToPost] = useInteractToPostMutation();
  const userId = 'dambo';
  let heartReact;
  if (isSuccess) {
    const likeCounts = post.likes.length;
    const userLikeThePost = post.likes.findIndex(
      (likeUserId) => likeUserId === userId
    );
    if (userLikeThePost === -1) {
      heartReact = (
        <>
          <div className="group-hover:bg-opacity-20 p-3 cursor-pointer rounded-full group-hover:bg-[#F91880]">
            <FaRegHeart className="group-hover:text-[#F91880]" />
          </div>
          <p className="group-hover:text-[#F91880]">{likeCounts}</p>
        </>
      );
    } else {
      heartReact = (
        <>
          <div className="group-hover:bg-opacity-20 p-3 cursor-pointer rounded-full group-hover:bg-[#F91880]">
            <FaHeart className="text-[#F91880]" />
          </div>
          <p className="text-[#F91880]">{likeCounts}</p>
        </>
      );
    }
  }
  const handleClickLike = async () => {
    await interactToPost({ postId, userId });
  };
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
          <p className="font-semibold text-lg">Dale Cabarle</p>
          <p className="text-sm text-slate-500">@MrDaleCabarle</p>
          <p className="text-sm text-slate-500">- 1h ago</p>
        </div>
        {post?.content ? (
          <p>{post?.content}</p>
        ) : (
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
            quod cum mollitia, ducimus quo tenetur reiciendis maiores magni
            numquam totam?
          </p>
        )}
        <div className="flex space-x-4">
          <div
            className="text-slate-500 flex items-center group cursor-pointer"
            onClick={handleClickLike}
          >
            {heartReact}
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
