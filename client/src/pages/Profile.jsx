import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { MdDateRange } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PostExcerpt from '../features/posts/PostExcerpt';

const Profile = () => {
  return (
    <div>
      <div className="flex">
        <Link className=" rounded-full flex items-center space-x-2 p-4 hover:underline">
          <FaArrowLeft />
          <p className="font-semibold text-lg">Go back</p>
        </Link>
      </div>

      {/* profile */}
      <div>
        <div className="flex items-center space-x-2 p-4">
          <Avatar className="h-28 w-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
              Dale Pogi
            </h2>
            <p className="text-slate-500">@MrDaleCabarle</p>
          </div>
          <div className="flex-1 flex justify-end">
            <Dialog>
              <DialogTrigger className="py-2 px-4 border border-slate-200 rounded-full font-semibold hover:bg-slate-200">
                Edit Profile
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="border-y p-4">
          <div className="flex items-center space-x-1">
            <MdDateRange />
            <p>Joined November 2019</p>
          </div>
          <div>143 posts</div>
        </div>
      </div>

      {/* posts */}
      <div>
        <PostExcerpt />
        <PostExcerpt />
        <PostExcerpt />
        <PostExcerpt />
      </div>
    </div>
  );
};

export default Profile;
