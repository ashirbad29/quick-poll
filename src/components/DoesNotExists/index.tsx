import * as React from 'react';
import NotFound from '../../assets/NotFound';

const DoesNotExists = ({ message }: { message: string }) => (
  <div className="flex-1 bg-gray-100 flex flex-col gap-6 items-center justify-center p-4">
    <NotFound className="w-full max-w-sm" />
    <span className="text-lg font-medium text-gray-600">{message}</span>
  </div>
);

export default DoesNotExists;
