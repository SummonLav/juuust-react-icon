/// <reference types="react" />
  import { ComponentType, SVGAttributes } from 'react';

  interface Props extends SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
  }

  type Icon = ComponentType<Props>;
  export const BlueFace: Icon;
export const Group: Icon;
export const PinkFace: Icon;
export const HeaderImg: Icon;
export const NavBar: Icon;
export const Chatbox: Icon;
