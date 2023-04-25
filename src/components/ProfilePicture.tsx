import React from "react";

export const ProfilePicture = ({ src, alt, size }) => {
  const imageSize : Number= 1 / 12; // default size is 48px

  return (
    <img
      src={src}
      alt={alt}
      className={`m-2 rounded-full  w-1/3 h-${imageSize}`}
    />
  );
};

export default ProfilePicture;
