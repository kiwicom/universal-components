// @flow

import * as React from 'react';
import { View, Text } from 'react-native';

import { StyleSheet } from '..';
import defaultTokens from '../defaultTokens';

type Props = {|
  +children: React$Node,
  +filled?: boolean,
  +disabled?: boolean,
  +required?: boolean,
  +inlineLabel?: boolean,
|};

const getAsteriksColor = filled =>
  !filled
    ? defaultTokens.orbit.colorTextError
    : defaultTokens.orbit.colorFormLabelFilled;

const getColor = (filled, disabled) =>
  !filled || disabled
    ? defaultTokens.orbit.colorFormLabel
    : defaultTokens.orbit.colorFormLabelFilled;

const Asteriks = ({ filled, children }) => (
  <Text style={[styles.asteriks, { color: getAsteriksColor(filled) }]}>
    {children}
  </Text>
);

const FormLabel = ({
  children,
  required,
  filled,
  disabled,
  inlineLabel,
}: Props) => (
  <View style={inlineLabel ? styles.inlineFormLabel : styles.formLabel}>
    {required && (
      <Asteriks style={{ color: getColor(filled, disabled) }} filled={filled}>
        *{' '}
      </Asteriks>
    )}
    <Text style={styles.labelText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  asteriks: {
    fontWeight: '700',
    fontSize: 14,
  },
  labelText: {
    fontSize: 14,
  },
  inlineFormLabel: {
    flexDirection: 'row',
    marginBottom: 0,
    flexWrap: 'nowrap',
  },
  formLabel: {
    flexDirection: 'row',
    marginBottom: 4,
  },
});

export default FormLabel;
