// @flow

import * as React from 'react';
import styled from 'styled-components';
import { textColor, fontSize, fontWeight, textAlign } from './constants';
import { shared } from './styles';
import type { TextType, Element } from './TextTypes.js';

type Props = TextType & {| +element: Element |};

const createElement = ({ element, children, ...props }: Props) =>
  React.createElement(element, props, children);

const StyledText = styled(createElement)(
  [],
  ({ type, size, weight, align, uppercase, italic }) => ({
    ...shared,
    color: textColor[type],
    fontSize: fontSize[size],
    fontWeight: fontWeight[weight],
    textAlign: textAlign[align],
    fontStyle: italic && 'italic',
    textTransform: uppercase && 'uppercase',
  })
);

const Text = ({
  align = 'left',
  type = 'primary',
  size = 'normal',
  weight = 'normal',
  element = 'p',
  uppercase = false,
  italic = false,
  dataTest,
  children,
}: Props) => (
  <StyledText
    type={type}
    size={size}
    weight={weight}
    align={align}
    element={element}
    uppercase={uppercase}
    italic={italic}
    data-test={dataTest}
  >
    {children}
  </StyledText>
);

export default Text;
