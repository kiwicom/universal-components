// @flow

import * as React from 'react';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';
import { View } from 'react-native';

import Text from '../Text';
import StyleSheet from '../PlatformStyleSheet';

import { type OnLayout } from './SliderTypes';

type Props = {|
  +startLabel?: React.Node,
  +startValue: number,
  +endLabel?: React.Node,
  +endValue?: number,
  +max: number,
  +min: number,
|};

type State = {|
  width: number,
  labelStartWidth: number,
  labelStartAtMax: boolean,
  labelEndWidth: number,
  paddingLeft: number,
  paddingRight: number,
|};

export default class SliderLabels extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      width: 0,
      labelStartWidth: 0,
      labelStartAtMax: false,
      labelEndWidth: 0,
      paddingLeft: 0,
      paddingRight: 0,
    };
  }

  componentDidMount() {
    const { endValue } = this.props;
    if (endValue) {
      requestAnimationFrame(this.setPaddingForTwoLabels);
    } else {
      requestAnimationFrame(this.setPaddingForOneLabel);
    }
  }

  getMaxPadding = (gap: number): number => {
    const { width, labelStartWidth, labelEndWidth } = this.state;
    return Math.floor(width - labelStartWidth - labelEndWidth - gap);
  };

  calculateMarkerStartOffset = (): number => {
    const { width } = this.state;
    const { min, max, startValue } = this.props;

    let val;
    if (startValue > max) {
      val = max;
    } else if (startValue < min) {
      val = min;
    } else {
      val = startValue;
    }

    return Math.round((val / (max - min)) * width);
  };

  calculateMarkerEndOffset = (): number => {
    const { width } = this.state;
    const { min, max, endValue } = this.props;

    if (!endValue) {
      return 0;
    }

    let val;
    if (endValue > max) {
      val = max;
    } else if (endValue < min) {
      val = min;
    } else {
      val = endValue;
    }

    const w = (val / (max - min)) * width;
    return Math.round(width - w);
  };

  getStartLabelOffset = (): number => {
    const { labelStartWidth } = this.state;
    const startMarkerOffset = this.calculateMarkerStartOffset();
    const startLabelHalf = labelStartWidth / 2;

    return startMarkerOffset < startLabelHalf
      ? 0
      : startMarkerOffset - startLabelHalf;
  };

  isBelowMaxPadding = (value: number, gap: number = 0): boolean => {
    const maxPadding = this.getMaxPadding(gap);
    return value + gap < maxPadding;
  };

  setPaddingForTwoLabels = (): void => {
    const { labelEndWidth, paddingLeft, paddingRight } = this.state;
    const startLabelOffset = this.getStartLabelOffset();
    const endMarkerOffset = this.calculateMarkerEndOffset();
    const endLabelHalf = labelEndWidth / 2;
    const endLabelOffset =
      endMarkerOffset < endLabelHalf ? 0 : endMarkerOffset - endLabelHalf;

    const isBelowMaxPadding = this.isBelowMaxPadding(
      startLabelOffset + endLabelOffset,
      10
    );

    const hasOffsetChanged =
      paddingLeft !== startLabelOffset || paddingRight !== endLabelOffset;

    if (isBelowMaxPadding && hasOffsetChanged) {
      this.setState({
        paddingLeft: startLabelOffset,
        paddingRight: endLabelOffset,
      });
    }

    requestAnimationFrame(this.setPaddingForTwoLabels);
  };

  setPaddingForOneLabel = (): void => {
    const { paddingLeft, labelStartAtMax } = this.state;
    const startLabelOffset = this.getStartLabelOffset();
    const isBelowMaxPadding = this.isBelowMaxPadding(startLabelOffset);
    const hasOffsetChanged = paddingLeft !== startLabelOffset;

    if (isBelowMaxPadding) {
      if (hasOffsetChanged) {
        this.setState({
          paddingLeft: startLabelOffset,
        });
      }

      if (labelStartAtMax) {
        this.setState({ labelStartAtMax: false });
      }
    } else if (labelStartAtMax === false) {
      this.setState({ labelStartAtMax: true });
    }

    requestAnimationFrame(this.setPaddingForOneLabel);
  };

  saveFullWidth = (e: OnLayout) => {
    this.setState({ width: Math.floor(e.nativeEvent.layout.width) });
  };

  saveLabelStartWidth = (e: OnLayout) => {
    this.setState({ labelStartWidth: Math.floor(e.nativeEvent.layout.width) });
  };

  saveLabelEndWidth = (e: OnLayout) => {
    this.setState({ labelEndWidth: Math.floor(e.nativeEvent.layout.width) });
  };

  render() {
    const { paddingLeft, paddingRight, labelStartAtMax } = this.state;
    const { startLabel, startValue, endLabel, endValue } = this.props;
    return (
      <View
        style={[
          styles.sliderLabels,
          {
            paddingLeft,
            paddingRight,
            justifyContent: labelStartAtMax ? 'flex-end' : 'space-between',
          },
        ]}
        onLayout={this.saveFullWidth}
      >
        <View onLayout={this.saveLabelStartWidth}>
          <Text style={styles.label}>{startLabel || startValue}</Text>
        </View>
        {endValue && (
          <View onLayout={this.saveLabelEndWidth}>
            <Text style={styles.label}>{endLabel || endValue}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderLabels: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: defaultTokens.paletteBlueNormal,
  },
});
