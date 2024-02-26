import React from 'react';
import { Link } from 'react-router-dom';
const _404 = () => {
  return (
    <div className="flex justify-center mt-20 flex-col items-center">
      <p className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
        hmmm... Page not found
      </p>
      <Link
        to={'/'}
        className="bg-blue-500 hover:bg-blue-600 font-semibold text-lg rounded-full text-white py-1 px-5"
      >
        Go back
      </Link>
    </div>
  );
};

export default _404;
