import React from 'react';
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

import { Button } from '@/components/ui/button';
import { FaTrashAlt } from 'react-icons/fa';
import { useDeletePostMutation } from '../features/posts/postSlice';
import { useNavigate } from 'react-router-dom';
import { useDeleteCommentOnPostMutation } from '../features/comments/commentSlice';
import { X } from 'lucide-react';

// REFACTOR
const DeletePopover = ({
  currentUserId,
  postUserId,
  postId,
  comment = null,
  popOverRef,
}) => {
  const forPost = !comment ? true : false;
  const [deleteCommentOnPost] = useDeleteCommentOnPostMutation();
  const [deletePost] = useDeletePostMutation();
  const nav = useNavigate();
  // delete post needs -> currentUserId, postId, postUserId
  // delete comment needs -> currentUserId, postId, comment postUserId
  const onClickHandler = async () => {
    if (forPost) {
      await deletePost({ postId });
      return nav('/');
    }
    await deleteCommentOnPost({ postId, commentId: comment._id });
  };

  let displayDelete;

  if (currentUserId === comment?.userId || currentUserId === postUserId) {
    displayDelete = (
      <Dialog>
        <DialogTrigger className="w-full">
          <li className="text-red-500 space-x-2 cursor-pointer w-full hover:bg-slate-50 flex p-4 items-center">
            <FaTrashAlt />
            <p>Delete</p>
          </li>
        </DialogTrigger>
        <DialogContent
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              data from our servers.
            </DialogDescription>
            <DialogClose
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400"
              onClick={() => {
                popOverRef?.current.click();
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onClickHandler} variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return <>{displayDelete ?? null}</>;
};
export default DeletePopover;
