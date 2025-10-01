/// <reference types="nativewind/types" />

// Declarações de tipos globais para NativeWind
declare module "*.svg" {
  import React from 'react';
    import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.css" {
  const content: any;
  export default content;
}
