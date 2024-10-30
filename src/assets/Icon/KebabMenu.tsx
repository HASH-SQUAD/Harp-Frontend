import React from 'react';

interface KebabMenuProps {
  onClick: () => void;
}

const KebabMenu = ({ onClick }: KebabMenuProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onClick={onClick}
    >
      <circle cx="11.5" cy="6.5" r="1.5" fill="#BCBCBC" />
      <circle cx="11.5" cy="12.5" r="1.5" fill="#BCBCBC" />
      <circle cx="11.5" cy="18.5" r="1.5" fill="#BCBCBC" />
    </svg>
  );
};

export default KebabMenu;
