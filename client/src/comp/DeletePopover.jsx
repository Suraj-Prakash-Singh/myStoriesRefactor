import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { FaTrashAlt } from 'react-icons/fa';
import {
  useDeleteCommentOnPostMutation,
  useDeletePostMutation,
} from '../features/posts/postSlice';

// REFACTOR
const DeletePopover = ({
  currentUserId,
  postUserId,
  postId,
  comment = null,
}) => {
  const forPost = !comment ? true : false;
  const [deleteCommentOnPost] = useDeleteCommentOnPostMutation();
  const [deletePost] = useDeletePostMutation();

  // delete post needs -> currentUserId, postId, postUserId
  // delete comment needs -> currentUserId, postId, comment postUserId
  const onClickHandler = async () => {
    if (forPost) {
      return await deletePost({ postId });
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              data from our servers.
            </DialogDescription>
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
