// @flow

import * as React from 'react';
import { View, Text } from 'react-native';

import { StyleSheet } from '..';

type Props = {
  children: React$Node,
  filled?: boolean,
  disabled?: boolean,
  required?: boolean,
};

const colors = {
  colorTextError: '#d21c1c',
  colorFormLabelFilled: '#7f91a8',
  colorFormLabel: '#46515e',
};

const getAsteriksColor = filled =>
  !filled ? colors.colorTextError : colors.colorFormLabelFilled;

const getColor = (filled, disabled) =>
  !filled || disabled ? colors.colorFormLabel : colors.colorFormLabelFilled;

const Asteriks = ({ filled, children }) => (
  <Text style={[styles.asteriks, { color: getAsteriksColor(filled) }]}>
    {children}
  </Text>
);

const FormLabel = ({ children, required, filled, disabled }: Props) => (
  <View style={[styles.formLabel, { color: getColor(filled, disabled) }]}>
    {required && <Asteriks filled={filled}>* </Asteriks>}
    <Text>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  asteriks: {
    fontWeight: '700',
    fontSize: 14,
  },
  formLabel: {
    flexDirection: 'row',
    fontSize: 14,
    lineHeight: 1.4,
    marginBottom: 4,
  },
});

export default FormLabel;
