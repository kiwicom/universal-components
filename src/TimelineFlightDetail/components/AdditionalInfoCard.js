// @flow

import * as React from 'react';
import { View } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';

import Text from '../../Text';
import { Icon } from '../../Icon';
import type { IconNameType } from '../../types/_generated-types';
import StyleSheet from '../../PlatformStyleSheet';

type Info = {|
  +icon: IconNameType,
  +label: string,
  +value: string,
|};

export type Props = {|
  +title: string,
  +information: Array<Info>,
|};

export default function AdditionalInfoCard({ title, information }: Props) {
  return (
    <View style={styles.container}>
      <Text type="secondary" size="small">
        {title}
      </Text>
      {information.map(infoRow => (
        <View style={[styles.infoRow, styles.row]} key={infoRow.label}>
          <View style={[styles.section, styles.row]}>
            <Icon name={infoRow.icon} size="small" style={styles.infoRowIcon} />
            <Text type="primary" size="small">
              {infoRow.label}
            </Text>
          </View>
          <View style={styles.section}>
            <Text type="secondary" size="small">
              {infoRow.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: defaultTokens.paletteCloudLight,
  },
  row: {
    flexDirection: 'row',
  },
  section: {
    alignItems: 'center',
  },
  infoRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
  },
  infoRowIcon: {
    paddingEnd: 10,
  },
});
