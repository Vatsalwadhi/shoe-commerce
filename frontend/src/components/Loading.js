import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="loading-spinner"></div>
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
};

export default Loading;
