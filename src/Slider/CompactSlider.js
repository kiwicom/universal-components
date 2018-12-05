// @flow

import * as React from 'react';
import { View } from 'react-native';

import Slider from './Slider';
import StyleSheet from '../PlatformStyleSheet';

type Props = {|
  +min: number,
  +max: number,
  +start: number,
  +end: number,
  +startLabel?: React.Node,
  +endLabel?: React.Node,
|};

type State = {|
  start: number,
  end: number,
|};

export default class CompactSlider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { start, end } = this.props;

    this.state = {
      start,
      end,
    };
  }

  handlePriceChanged = ([start, end]: number[]) =>
    this.setState({
      start,
      end,
    });

  render() {
    const { start, end } = this.state;
    const { min, max, startLabel, endLabel } = this.props;

    return (
      <View>
        <View style={styles.sliderContainer}>
          <Slider
            startValue={start}
            endValue={end}
            min={min}
            max={max}
            onChange={this.handlePriceChanged}
            startLabel={startLabel}
            endLabel={endLabel}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    paddingHorizontal: 20,
  },
});
