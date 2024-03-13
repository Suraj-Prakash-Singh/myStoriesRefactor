import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  useGetPostQuery,
  useInteractToPostMutation,
} from './postSlice';
import { formatCommentDate } from '@/src/utils/formatDate';

const PostExcerpt = ({ postId }) => {
  const { data: post, isSuccess } = useGetPostQuery(postId);
  const nav = useNavigate();
  const [interactToPost] = useInteractToPostMutation();
  const userId = 'dambo';
  let heartReact;
  let commentsCount;
  let timeAgo;
  if (isSuccess) {
    const createdAt = post.createdAt;
    timeAgo = formatCommentDate(createdAt);
    const likeCounts = post.likes.length;
    commentsCount = post.comments.length;
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

  const handleClickLike = async (e) => {
    e.stopPropagation();
    await interactToPost({ postId, userId });
  };

  const handleClickNav = () => {
    nav(`/profile/posts/${postId}`);
  };

  return (
    <div
      className="p-4 flex cursor-pointer space-x-2 hover:bg-slate-100 border-t"
      onClick={handleClickNav}
    >
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="space-y-1">
        <div className="space-x-1 flex items-center">
          <p className="font-semibold text-lg">Dale Cabarle</p>
          <p className="text-sm text-slate-500">@MrDaleCabarle</p>
          <p className="text-sm text-slate-500">· {timeAgo}</p>
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
          <div className="text-slate-500 flex space-x-1 items-center group">
            <>
              <div className="group-hover:bg-opacity-20 p-3 cursor-pointer rounded-full group-hover:bg-[#1D9BF0]">
                <FaRegComment className="group-hover:text-[#1D9BF0]" />
              </div>
              <p className="group-hover:text-[#1D9BF0]">{commentsCount}</p>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostExcerpt;
