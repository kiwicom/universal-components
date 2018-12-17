// @flow

import * as React from 'react';
import { View } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';

import Shimmer from '../Placeholder/shimmer';
import connect from '../Placeholder/connect';
import StyleSheet from '../PlatformStyleSheet';

const Placeholder = () => (
  <View style={styles.container}>
    <View style={styles.pricePlaceholder}>
      <Shimmer
        style={{
          backgroundColor: defaultTokens.paletteCloudLightActive,
          height: 25,
          borderRadius: parseFloat(defaultTokens.borderRadiusLarge),
        }}
      />
    </View>
    <View style={[styles.bottomContainer, styles.padding]}>
      <View style={styles.placePlacholder}>
        <Shimmer
          style={{
            backgroundColor: defaultTokens.paletteCloudLightActive,
            height: 16,
            borderRadius: parseFloat(defaultTokens.borderRadiusLarge),
          }}
        />
      </View>
      <View style={styles.countryPlaceholder}>
        <Shimmer
          style={{
            backgroundColor: defaultTokens.paletteCloudLightActive,
            height: 16,
            borderRadius: parseFloat(defaultTokens.borderRadiusLarge),
          }}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 152,
    justifyContent: 'space-between',
    borderRadius: parseFloat(defaultTokens.borderRadiusLarge),
    overflow: 'hidden',
    backgroundColor: defaultTokens.paletteCloudLight,
  },
  pricePlaceholder: {
    width: 100,
    padding: 10,
  },
  placePlacholder: {
    marginBottom: 4,
    width: 200,
  },
  countryPlaceholder: {
    width: 100,
  },
  padding: {
    padding: 10,
  },
});

export default connect(Placeholder);
