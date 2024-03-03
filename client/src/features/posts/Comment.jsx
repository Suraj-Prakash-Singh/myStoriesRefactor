import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import {
  FaRegComment,
  FaRegHeart,
  FaTrashAlt,
  FaRegEdit,
  FaVolumeMute,
} from 'react-icons/fa';
import { formatCommentDate } from '@/src/utils/formatDate';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { useDeleteCommentOnPostMutation } from './postSlice';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Comment = ({ postId, comment, currentUserId, postUserId }) => {
  const [deleteCommentOnPost] = useDeleteCommentOnPostMutation();

  const createdAt = comment.createdAt;
  const timeAgo = formatCommentDate(createdAt);
  const commentUserId = comment.userId;

  const onClickHandlerForDeleteComment = async () => {
    await deleteCommentOnPost({ postId, commentId: comment._id });
  };

  // display delete? if user owned post or comment
  let displayDelete;
  if (currentUserId === commentUserId || currentUserId === postUserId) {
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
              This action cannot be undone. This will permanently delete this
              comment and remove the data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={onClickHandlerForDeleteComment}
              variant="destructive"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  let displayEdit;
  if (currentUserId === commentUserId) {
    displayEdit = (
      <Dialog>
        <DialogTrigger asChild>
          <li className=" space-x-2 cursor-pointer hover:bg-slate-100 flex p-4 items-center">
            <FaRegEdit />
            <p>Edit</p>
          </li>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>
              Make changes to your posted comment. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              Content
              <Input
                id="Content"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="">
      <div className="p-4 flex cursor-pointer space-x-2 hover:bg-slate-100 border-t">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        {/* if needed i can treat comment as a post aswell */}
        <Link to={`/profile/posts/${postId}`} className="space-y-1">
          <div className="space-x-1 flex items-center">
            <p className="font-semibold text-lg">Dale Cabarle</p>
            <p className="text-sm text-slate-500">@MrDaleCabarle</p>
            <p className="text-sm text-slate-500">· {timeAgo}</p>
          </div>

          <p>{comment.content}</p>
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
        <div className="flex-1 flex justify-end items-start">
          <Popover>
            <PopoverTrigger className="p-4 hover:bg-[#1D9BF0] rounded-full hover:text-[#1D9BF0] hover:bg-opacity-20">
              <HiOutlineDotsHorizontal className="text-lg" />
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <ul className="font-semibold">
                {displayDelete ?? null}
                {displayEdit ?? null}
                <li className="space-x-2 cursor-pointer hover:bg-slate-100 flex p-4 items-center">
                  <FaVolumeMute />
                  <p>Mute</p>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Comment;
