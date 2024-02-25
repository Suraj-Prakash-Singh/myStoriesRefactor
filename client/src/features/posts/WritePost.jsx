import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
const WritePost = () => {
  return (
    <div className=" p-4 space-y-4">
      <div className="flex space-x-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <input
          type="text"
          className="w-full place-self-start p-4 rounded"
          placeholder="What's happening?!"
        />
      </div>
      <div className="border-t flex justify-end">
        <button className="px-8 mt-2 py-2 rounded-full bg-blue-300 text-white">
          Post
        </button>
      </div>
    </div>
  );
};

export default WritePost;
