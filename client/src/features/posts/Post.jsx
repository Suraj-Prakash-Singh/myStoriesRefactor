import React from 'react';
import { useGetPostQuery, useInteractToPostMutation } from './postSlice';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaArrowLeft, FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import _404 from '@/src/pages/_404';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { formatDateTime } from '@/src/utils/formatDate';
import Comment from './Comment';
import PostComment from './PostComment';

const Post = () => {
  const { postId } = useParams();
  const [interactToPost] = useInteractToPostMutation();
  const nav = useNavigate();
  const loc = useLocation();
  // this is coming from userSlice
  const userId = 'ponga';

  // validation for postID
  if (!postId) return nav('/');

  // query the post
  const { isError, isLoading, isSuccess, data: post } = useGetPostQuery(postId);

  // if post doesn't exist
  if (isError) return <_404 />;

  // if exist, create a heartExcerpt
  let heartReact;
  let commentsCount;
  let commentsOnPost;
  if (isSuccess) {
    const likeCounts = post.likes.length;
    commentsCount = post.comments.length;

    commentsOnPost = post.comments.map((comment) => (
      <Comment
        key={comment._id}
        comment={comment}
        currentUserId={userId}
        postId={postId}
        postUserId={post.userId}
      />
    ));
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

  // handleLikeClick fn
  const handleClickLike = async () => {
    await interactToPost({ postId, userId });
  };

  // render ui
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
          {post?.content ? <p className="text-lg">{post.content}</p> : null}
          {post?.createdAt ? (
            <p className="text-slate-500 text-sm">
              {formatDateTime(post.createdAt)}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex space-x-2 p-4 border-y text-xl justify-between">
        <div className="flex space-x-4">
          <div
            className="text-slate-500 flex items-center group cursor-pointer"
            onClick={handleClickLike}
          >
            {heartReact}
          </div>

          {/* comments count */}
          <div className="text-slate-500 flex space-x-1 items-center group cursor-pointer">
            <div className="group-hover:bg-opacity-20 p-3 cursor-pointer rounded-full group-hover:bg-[#1D9BF0]">
              <FaRegComment className="group-hover:text-[#1D9BF0]" />
            </div>
            <p className="group-hover:text-[#1D9BF0]">{commentsCount}</p>
          </div>
        </div>
        <div className="flex items-center">
          <HiOutlineDotsHorizontal />
        </div>
      </div>

      {/* post your reply */}
      <PostComment postId={postId} userId={userId} />

      {/* comments */}
      {commentsOnPost}
    </div>
  );
};
export default Post;
