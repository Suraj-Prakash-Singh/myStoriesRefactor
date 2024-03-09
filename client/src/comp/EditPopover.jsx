import React, { useState } from 'react';
import { X } from 'lucide-react';
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
import { buttonVariants } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEditPostMutation } from '../features/posts/postSlice';
import { useEditCommentOnPostMutation } from '../features/comments/commentSlice';

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
        <DialogTrigger asChild={true}>
          <li className="space-x-2 cursor-pointer hover:bg-slate-100 flex p-4 items-center">
            <FaRegEdit />
            <p>Edit</p>
          </li>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex justify-between">
              <p>Edit {forPost ? 'Post' : 'Comment'}</p>
              <DialogClose
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400"
                onClick={() => {
                  popOverRef?.current.click();
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogTitle>
            <DialogDescription>
              {forPost
                ? 'Make changes to your post'
                : 'Make changes to your posted comment. Click save when you are done.'}
            </DialogDescription>
          </DialogHeader>
          <Textarea value={data} onChange={(e) => setData(e.target.value)} />
          <DialogFooter>
            <button
              disabled={data ? false : true}
              className={buttonVariants({ variant: '' })}
              onClick={onClickHandler}
            >
              Save changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return <div>{displayEdit ?? null}</div>;
};

export default EditPopover;
