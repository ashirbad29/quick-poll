import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from '../../assets/Icons';

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className="py-16 flex justify-center border-dankPurple border-t-8 relative">
      <div className="flex flex-col items-center">
        <Link to="/" className="text-3xl font-bold">
          Quick Poll{' '}
          <span role="img" aria-label="emoji">
            ⚡
          </span>
        </Link>
        <p className="mt-4 text-lg font-medium">Create Anonomoys polls for free</p>
      </div>
      {pathname !== '/history' && (
        <Link
          to="/history"
          className="absolute bottom-2 right-4 font-medium text-gray-500 flex items-center gap-1 cursor-pointer hover:text-gray-600">
          <span>checkout your polls</span>
          <ChevronRight className="h-5 w-5" />
        </Link>
      )}
    </div>
  );
};

export default Header;
