import React from 'react';

export const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <img
        src="https://res.cloudinary.com/dnqx8sqdw/image/upload/v1753617909/jpqmrvycqyp47wzaaneh.jpg"
        alt="Empty State"
        className="w-48 h-48 object-contain mb-6 opacity-80"
      />
      <h3 className="text-xl font-semibold text-gray-700">No Items Found</h3>
      <p className="text-gray-500 mt-2 max-w-xs">
        It looks like there's nothing here yet. Try adding some files or folders to get started.
      </p>
    </div>
  );
};
