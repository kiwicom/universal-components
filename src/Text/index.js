// @flow

import * as React from 'react';
import { textColor, fontSize, fontWeight, align } from './styles';

const styles = {
  ...textColor,
  ...fontSize,
  ...fontWeight,
  ...align,
};

const Text = ({ element = 'p', children, type, ...props }) => {
  const TextElement = element;
  const style = { color: styles[type], fontFamily: 'Roboto' };
  return <TextElement style={style}>{children}</TextElement>;
};

export default Text;
