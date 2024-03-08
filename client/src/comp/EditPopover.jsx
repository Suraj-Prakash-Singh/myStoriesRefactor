import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { FaRegEdit } from 'react-icons/fa';
import { Button, buttonVariants } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  useEditCommentOnPostMutation,
  useEditPostMutation,
} from '../features/posts/postSlice';

const EditPopover = ({
  currentUserId,
  postId,
  post = null,
  comment = null,
  popOverRef,
}) => {
  const forPost = !comment ? true : false;
  const [data, setData] = useState(forPost ? post?.content : comment?.content);

  const [editCommentOnPost] = useEditCommentOnPostMutation();
  const [editPost] = useEditPostMutation();

  const onClickHandler = async () => {
    if (forPost) {
      await editPost({
        userId: currentUserId,
        content: data,
        postId,
        toUpdateContent: true,
      });
    } else {
      // if the edit element is for comment
      await editCommentOnPost({
        postId,
        commentId: comment._id,
        content: data,
      });
    }
    popOverRef?.current.click();
  };

  // display edit
  let displayEdit;

  if (
    (comment?.userId && currentUserId === comment?.userId) ||
    (forPost && post?.userId && currentUserId === post?.userId)
  ) {
    displayEdit = (
      <Dialog>
        <DialogTrigger asChild>
          <li className="space-x-2 cursor-pointer hover:bg-slate-100 flex p-4 items-center">
            <FaRegEdit />
            <p>Edit</p>
          </li>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {forPost ? 'Post' : 'Comment'} </DialogTitle>
            <DialogDescription>
              {forPost
                ? 'Make changes to your post'
                : 'Make changes to your posted comment. Click save when you are done.'}
            </DialogDescription>
          </DialogHeader>
          <Textarea value={data} onChange={(e) => setData(e.target.value)} />
          <DialogFooter>
            <DialogClose>
              <div
                disabled={data ? false : true}
                className={buttonVariants({ variant: '' })}
                onClick={onClickHandler}
              >
                Save changes
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return <div>{displayEdit ?? null}</div>;
};

export default EditPopover;
