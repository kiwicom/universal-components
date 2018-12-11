// @flow strict

import * as React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';
import DateFormatter from '../utils/DateUtils/DateFormatter';

import AdaptableBadge from './AdaptableBadge';
import { Icon } from '../Icon';
import Text from '../Text';
import StyleSheet from '../PlatformStyleSheet';

const dateFormat = {
  day: '2-digit',
  month: 'short',
};

type Trip = {|
  +city: string,
  +date: string,
|};

type Props = {|
  +tripType?: 'OneWay' | 'Return' | 'MultiCity',
  +arrival?: Trip,
  +departure?: Trip,
|};

export default function NavigationHeader({
  tripType,
  arrival,
  departure,
}: Props) {
  let icon = '';

  switch (tripType) {
    case 'OneWay':
      icon = 'flight-direct';
      break;
    case 'Return':
      icon = 'flight-return';
      break;
    case 'MultiCity':
      icon = 'flight-multicity';
      break;
    default:
      icon = 'flight-return';
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerLeftcontainer}>
        <View style={styles.citiesContainer}>
          <Text style={styles.departureCity}>
            {(departure && departure.city) || ''}
          </Text>
          <Icon name={icon} />
          <Text style={styles.arrivalCity}>
            {(arrival && arrival.city) || ''}
          </Text>
        </View>
        {arrival != null && departure != null && (
          <View>
            {tripType === 'OneWay' ? (
              <View>
                <AdaptableBadge
                  style={styles.badge}
                  textStyle={styles.badgeText}
                  text={DateFormatter(new Date(arrival.date)).formatCustom(
                    dateFormat
                  )}
                />
              </View>
            ) : (
              <View style={styles.row}>
                <AdaptableBadge
                  style={styles.badge}
                  textStyle={styles.badgeText}
                  text={DateFormatter(new Date(departure.date)).formatCustom(
                    dateFormat
                  )}
                />
                <Text style={{ color: 'black' }}> to </Text>
                <AdaptableBadge
                  style={styles.badge}
                  textStyle={styles.badgeText}
                  text={DateFormatter(new Date(arrival.date)).formatCustom(
                    dateFormat
                  )}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    marginTop: Platform.select({
      ios: 0,
      android: StatusBar.currentHeight,
    }),
    borderBottomWidth: 1,
    borderBottomColor: defaultTokens.paletteInkLighter,
  },
  citiesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeftcontainer: {
    flexDirection: 'column',
    paddingStart: 16,
  },
  departureCity: {
    fontWeight: '800',
    marginEnd: 5,
    fontSize: 16,
    color: defaultTokens.colorTextAttention,
    // marginBottom: 3,
    // paddingTop: 8,
  },
  arrivalCity: {
    fontWeight: '800',
    marginStart: 5,
    fontSize: 16,
    color: defaultTokens.colorTextAttention,
    // marginBottom: 3,
    // paddingTop: 8,
  },
  badgeText: {
    fontSize: 12,
    color: defaultTokens.colorTextPrimary,
  },
  badge: {
    backgroundColor: defaultTokens.paletteCloudNormal,
    // marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
