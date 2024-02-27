import React from 'react';
import { useGetPostQuery, useInteractToPostMutation } from './postSlice';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaArrowLeft, FaRegComment, FaRegHeart, FaHeart } from 'react-icons/fa';
import _404 from '@/src/pages/_404';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { formatDateTime } from '@/src/utils/formatDate';

const Post = () => {
  const { postId } = useParams();
  const [interactToPost] = useInteractToPostMutation();
  const nav = useNavigate();
  const loc = useLocation();
  // this is coming from userSlice
  const userId = 'dambo';

  // validation for postID
  if (!postId) return nav('/');

  // query the post
  const { isError, isLoading, isSuccess, data: post } = useGetPostQuery(postId);

  // if post doesn't exist
  if (isError) return <_404 />;

  // if exist, create a heartExcerpt
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
          <div className="text-slate-500 flex space-x-1 items-center">
            <FaRegComment />
            <p>44</p>
          </div>
        </div>
        <div className="flex items-center">
          <HiOutlineDotsHorizontal />
        </div>
      </div>

      {/* post your reply */}
      <div className="p-4 flex space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex-1 text-xl">
          <div>
            <label htmlFor="comment" className="sr-only">
              comment
            </label>

            <div className="overflow-hidden">
              <textarea
                id="comment"
                className="w-full min-h-[100px]  h-auto resize-none focus:border-none border-none focus:outline-none px-0 align-top sm:text-lg"
                rows={4}
                placeholder="Post your reply"
              />

              <div className="flex items-center justify-end gap-2 py-3">
                <button className="px-8 mt-2 py-2 rounded-full bg-blue-300 text-white">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* comments */}
      <div className="border-t">
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

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio quod cum mollitia, ducimus quo tenetur reiciendis
              maiores magni numquam totam?
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
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Post;
