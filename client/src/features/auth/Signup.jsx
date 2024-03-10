import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState({
    previewImage: null,
    picture: null,
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        console.error('No files were accepted or an error occurred.');
        return;
      }
      const file = acceptedFiles[0];
      const preview = URL.createObjectURL(file);
      setFile({ picture: file, previewImage: preview });
    },
  });

  const handleSubmit = () => {
    console.log(previewImage[0]);
  };
  return (
    <div className="min-h-[100vh] flex justify-center items-center bg-[#F2F2F2]">
      <div className="bg-white p-4 rounded w-1/4 space-y-2">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Create new account
        </h1>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <p className="text-xs">This is your public display name.</p>
          </div>
          <Input
            type="email"
            name="emil"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="picture" className="text-lg font-semibold mb-2">
              Profile picture (Optional)
            </Label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-600">Drop the files here ...</p>
              ) : (
                <p className="text-gray-600">
                  Drag and drop an image here, or click to select a file
                </p>
              )}
            </div>
            {file?.previewImage && (
              <div className="mt-4">
                <img
                  src={file?.previewImage}
                  alt="Preview"
                  className="max-w-full h-auto"
                />
              </div>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            className="mt-6 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300"
          >
            Submit
          </Button>
        </div>
        {/* <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="picture">Profile picture (Optional)</Label>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag and drop an image here, or click to select a file</p>
              )}
            </div>
            {previewImage && (
              <div>
                <img src={previewImage} alt="Preview" className="" />
              </div>
            )}
          </div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div> */}
      </div>
    </div>
  );
};

export default Signup;
