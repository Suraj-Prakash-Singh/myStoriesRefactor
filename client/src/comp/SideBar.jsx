import React from 'react';
const SideBar = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="p-4 bg-slate-200 rounded space-y-2">
        <h1 className="font-bold text-xl">Subscribe to Premium</h1>
        <p>
          Subscribe to unlock new features and if eligible, receive a share of
          ads revenue.
        </p>
        <button className="bg-slate-900 text-white rounded-full px-4 py-2">
          Subscribe
        </button>
      </div>
      <div className="p-4 bg-slate-200 rounded space-y-2">
        <h1 className="font-bold text-2xl">Topics for you:</h1>
        <ol className="space-y-2">
          <li>1. Express Nombahhh wan</li>
          <li>2. Create React App Soooks</li>
          <li>3. React still da best</li>
          <li>4. React still da best</li>
          <li>5. React still da best</li>
          <li>6. React still da best</li>
          <li>7. React still da best</li>
          <li>8. React still da best</li>
        </ol>
      </div>
    </div>
  );
};

export default SideBar;
