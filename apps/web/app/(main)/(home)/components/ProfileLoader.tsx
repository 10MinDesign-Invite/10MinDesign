import React from "react";

export const ProfileLoader = () => {
  return (
    <div className="absolute w-full md:w-[400px] bg-white dark:bg-yellow-300 top-[70px] rounded-lg right-0 pb-[60px] animate-pulse">
      {/* Header gradient placeholder */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 h-[100px] rounded-t-lg"></div>

      {/* Profile image circle */}
      <div className="-mt-[43px] w-20 h-20 mx-auto outline-double outline-8 outline-black rounded-full bg-gray-300 dark:bg-gray-700"></div>

      {/* Name placeholders */}
      <div className="mt-3 flex max-w-fit gap-2 mx-auto">
        <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Email placeholders */}
      <div className="flex max-w-fit gap-2 mx-auto mt-2">
        <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Buttons placeholders */}
      <div className="w-[70%] mx-auto p-2 flex justify-center gap-4 mt-5">
        <div className="p-2 w-[40%] h-10 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
        <div className="p-2 w-[40%] h-10 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
      </div>

      {/* Close button placeholder */}
      <div className="p-2 mx-auto w-[40px] h-[40px] rounded-full bg-gray-300 dark:bg-gray-700 mt-5"></div>
    </div>
  );
};
