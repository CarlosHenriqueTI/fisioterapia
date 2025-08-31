import React from 'react';
import { Text as DefaultText } from 'react-native';

export function MonoText(props: DefaultText['props']) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function Text(props: DefaultText['props']) {
  return <DefaultText {...props} />;
}
