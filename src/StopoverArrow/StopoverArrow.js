// @flow

import * as React from 'react';
import { View } from 'react-native';
import shortid from 'shortid';
import Svg, { Rect } from 'svgs';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';

type Props = {|
  +stops?: number,
|};

const leftStopPositions = {
  '1': [22],
  '2': [18, 26],
  '3': [14, 22, 30],
  '4': [10, 18, 26, 34],
};

const renderStops = stops =>
  leftStopPositions[stops].map(leftStopPosition => (
    <Rect
      key={shortid.generate()}
      x={leftStopPosition}
      y="3"
      width="4"
      height="4"
      fill={defaultTokens.backgroundButtonSecondary}
      stroke={defaultTokens.colorIconSecondary}
    />
  ));

const renderArrow = () => (
  <React.Fragment>
    <Rect
      x="2"
      y="4.00024"
      width="49"
      height="1"
      fill={defaultTokens.colorIconSecondary}
    />
    <Rect
      x="51.3281"
      y="3.79321"
      width="1"
      height="5"
      transform="rotate(45 51.3281 3.79321)"
      fill={defaultTokens.colorIconSecondary}
    />
    <Rect
      width="5"
      height="1"
      transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 52.0354 4.50049)"
      fill={defaultTokens.colorIconSecondary}
    />
  </React.Fragment>
);

export default function StopoverArrow({ stops = 0 }: Props) {
  return (
    <View>
      <Svg
        width="53"
        height="9"
        viewBox="0 0 53 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderArrow()}
        {stops > 0 && stops < 5 && renderStops(stops)}
      </Svg>
    </View>
  );
}
