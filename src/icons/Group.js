import React from 'react';
import PropTypes from 'prop-types';

const Group = props => {
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
      <path d="M68.609 149.454c36.642 7.935 72.911-15.422 80.846-52.064 7.935-36.642-15.416-72.91-52.064-80.846C60.743 8.608 24.48 31.966 16.545 68.608 8.61 105.25 31.967 141.52 68.61 149.454z"></path>
      <path d="M103.323 62l-12.147 56.097-23.55-5.1"></path>
      <path d="M60.768 86.45c-8.88-1.924-14.52-10.68-12.596-19.56 1.922-8.88 10.68-14.52 19.56-12.597 8.88 1.923 14.519 10.68 12.596 19.56-1.923 8.88-10.68 14.52-19.56 12.596z"></path>
      <path d="M114.045 98.464c-6.846-1.482-11.194-8.233-9.711-15.079 1.482-6.845 8.233-11.193 15.079-9.71 6.845 1.482 11.193 8.233 9.711 15.079-1.483 6.845-8.234 11.193-15.079 9.71z"></path>
      <path d="M131.016 65.432l6.132 1.328-2.216-13.704-6.127-1.326 2.211 13.702z"></path>
      <path d="M121.047 63.274l6.133 1.328-2.217-13.704-6.126-1.326 2.21 13.702z"></path>
    </svg>
  );
};

Group.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Group.defaultProps = {
  color: 'currentColor',
  size: '24'
};

export default Group;
