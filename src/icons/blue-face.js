import React from 'react';
import PropTypes from 'prop-types';

const BlueFace = props => {
  const { color, size, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...otherProps}
    >
      <path d="M69.215 148.599C32.217 141.825 7.626 106.211 14.4 69.214c6.774-36.998 42.387-61.589 79.385-54.815 36.998 6.774 61.589 42.387 54.815 79.385-6.774 36.997-42.387 61.588-79.385 54.815z"></path>
      <path d="M67.767 53.66l-10.37 56.641 23.78 4.354"></path>
      <path d="M97.76 92.712c8.966 1.641 17.565-4.296 19.206-13.262 1.642-8.966-4.296-17.565-13.262-19.206-8.966-1.642-17.565 4.296-19.206 13.261-1.642 8.966 4.296 17.565 13.262 19.207z"></path>
      <path d="M93.473 43.963l25.567 4.681"></path>
      <path d="M39.173 76.885a7.337 7.337 0 102.642-14.434 7.337 7.337 0 00-2.642 14.434z"></path>
    </svg>
  );
};

BlueFace.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

BlueFace.defaultProps = {
  color: 'currentColor',
  size: '24'
};

export default BlueFace;
