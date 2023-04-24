import React from 'react';

export const ProfilePicture = ({ src, alt, size }) => {
  const imageSize = size || 9; // default size is 48px

  return (
    <img
      src={src}
      alt={alt}
      className={`m-2 rounded-full w-${imageSize} h-${imageSize}`}
    />
  );
};

export default ProfilePicture;