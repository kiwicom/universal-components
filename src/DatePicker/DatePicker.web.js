// @flow

import * as React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { defaultTokens } from '@kiwicom/orbit-design-tokens';
import { StyleSheet } from '../PlatformStyleSheet';
import DatePickerDayTile from './DatePickerDayTile';
import { Button } from '../Button';
import { Text } from '../Text';
import { getPreviousMonthData, getNextMonthData } from './DatePickerHelpers';

import type { Props } from './DatePickerTypes';

type State = {
  date: Date,
  month: number,
  year: number,
};

const parsePropsToState = date => {
  const tempDate = date ?? new Date();
  return {
    date: tempDate,
    month: tempDate.getMonth(),
    year: tempDate.getFullYear(),
  };
};

export default class WebDatePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = parsePropsToState(props.date);
  }

  componentDidUpdate = (prevProps: Props) => {
    const { date } = this.props;
    if (date && date !== prevProps.date) {
      this.setState(parsePropsToState(date));
    }
  };

  handleDaySelect = (dayId: number) => {
    const { onConfirm } = this.props;
    const { month, year } = this.state;
    const date = new Date(year, month, dayId);
    this.setState(parsePropsToState(date));
    onConfirm(date);
  };

  swapMonthBack = () => {
    this.setState(getPreviousMonthData);
  };

  swapMonthForward = () => {
    this.setState(getNextMonthData);
  };

  render() {
    const { isVisible, minDate, maxDate, onDismiss } = this.props;
    const { date, month, year } = this.state;

    if (!isVisible) {
      return null;
    }

    const monthLength = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const selectedDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const backDisabled =
      minDate && year <= minDate.getFullYear() && month <= minDate.getMonth();
    const forwardDisabled =
      maxDate && year >= maxDate.getFullYear() && month >= maxDate.getMonth();

    const dayTiles = [];
    for (let i = 0; i < startDay + monthLength; i += 1) {
      const dayId = i + 1 - startDay;
      const tempDateTime =
        dayId > 0 ? new Date(year, month, dayId).getTime() : 0;
      const disabled =
        tempDateTime < (minDate ?? 0) ||
        tempDateTime > (maxDate ?? Number.MAX_SAFE_INTEGER);
      dayTiles.push(
        <DatePickerDayTile
          key={`${year}-${month}-${i}`}
          dayId={dayId}
          selected={tempDateTime === selectedDay.getTime()}
          disabled={disabled}
          onDaySelect={this.handleDaySelect}
        />
      );
    }

    const weekRows = [];
    while (dayTiles.length > 0) {
      const key = `${year}-${month}-${weekRows.length}`;
      weekRows.push(
        <View key={key} style={styles.weekRow}>
          {dayTiles.splice(0, 7)}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.dismiss} />
        </TouchableWithoutFeedback>
        <View style={styles.picker}>
          <View style={styles.head}>
            <Button
              width={40}
              onPress={this.swapMonthBack}
              disabled={backDisabled}
              type="secondary"
              label="<"
            />
            <View style={styles.headLabel}>
              <Text>{month + 1}</Text>
              <Text size="small">{year}</Text>
            </View>
            <Button
              width={40}
              onPress={this.swapMonthForward}
              disabled={forwardDisabled}
              type="secondary"
              label=">"
            />
          </View>
          <View style={styles.month}>{weekRows}</View>
          <Button onPress={onDismiss} label="Close" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: parseInt(defaultTokens.zIndexModal, 10),
  },
  dismiss: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: defaultTokens.paletteInkDark,
    opacity: 0.2,
  },
  picker: {
    padding: 10,
    backgroundColor: defaultTokens.paletteWhite,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headLabel: {
    flex: 1,
    alignItems: 'center',
  },
  weekRow: {
    flexDirection: 'row',
  },
  month: {
    marginTop: 10,
    height: 215,
  },
});
