import React, { useRef } from 'react';
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
  DialogClose,
} from '@/components/ui/dialog';
import { FaTrashAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const EditPopover = ({ currentUserId, postUserId, commentUserId = null }) => {
  const popOverRef = useRef();

  // display edit
  let displayEdit;
  const forPost = !commentUserId ? true : false;
  if (currentUserId === commentUserId || currentUserId === postUserId) {
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
          <Textarea
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
          />
          <DialogFooter>
            <DialogClose>
              <Button
                type="submit"
                disabled={currentComment ? false : true}
                className="disabled:opacity-50"
                onClick={onClickHandlerForEditComment}
              >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return <>{displayEdit ?? null}</>;
};

export default EditPopover;
