// @flow

import * as React from 'react';
import { View } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';

import { Icon } from '../Icon';
import Touchable from '../Button/Touchable';
import StyleSheet from '../PlatformStyleSheet';
import AdditionalInfo, {
  type Props as AdditionalInfoProps,
} from './components/AdditionalInfo';
import CardHeader from './components/CardHeader';

type Props = {|
  +additionalInfo: $PropertyType<AdditionalInfoProps, 'additionalInfo'>,
  +carrier: {|
    +code: string,
    +name: string,
    +type?: 'airline' | 'bus' | 'train',
  |},
  +duration: string,
|};
type State = {|
  expanded: boolean,
|};
export default class TimelineFlightDetail extends React.Component<
  Props,
  State
> {
  state = {
    expanded: false,
  };

  toggleCard = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  connectionInfo = () => {
    const { expanded } = this.state;
    const { additionalInfo } = this.props;
    return expanded ? <AdditionalInfo additionalInfo={additionalInfo} /> : null;
  };

  render() {
    const { expanded } = this.state;
    const { carrier, duration } = this.props;
    return (
      <View style={[styles.container, styles.row]}>
        <View style={styles.line}>
          <View style={styles.strip} />
          <Icon
            name="airplane-down"
            size="small"
            color={defaultTokens.paletteBlueNormal}
            style={styles.icon}
          />
          <View style={[styles.strip, styles.secondStrip]} />
        </View>
        <View style={styles.cardContainer}>
          <Touchable onPress={this.toggleCard}>
            <View style={styles.card}>
              <CardHeader
                carrier={carrier}
                expanded={expanded}
                duration={duration}
              />
              {this.connectionInfo()}
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  container: {
    minHeight: 52,
    backgroundColor: defaultTokens.paletteWhite,
  },
  line: {
    paddingStart: 20,
    paddingEnd: 14,
  },
  strip: {
    height: 17,
    width: 2,
    backgroundColor: defaultTokens.paletteBlueNormal,
  },
  secondStrip: {
    flex: 1,
  },
  icon: {
    marginStart: -9,
    padding: 2,
    backgroundColor: defaultTokens.paletteWhite,
  },
  cardContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginEnd: 8,
  },
  card: {
    justifyContent: 'center',
    marginVertical: 4,
    paddingHorizontal: 4,
    borderColor: defaultTokens.paletteInkLight,
    borderWidth: 0.5,
    borderRadius: parseFloat(defaultTokens.borderRadiusNormal),
    backgroundColor: defaultTokens.paletteWhite,
    android: {
      elevation: 1,
    },
    ios: {
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowColor: defaultTokens.paletteInkDark,
    },
    web: {
      boxShadow: '0px 2px 4px rgba(23,27,30,0.1)',
      width: '100%',
    },
  },
});
