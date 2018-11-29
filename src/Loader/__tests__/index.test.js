// @flow

import * as React from 'react';
import { Platform } from 'react-native';
import { render } from 'react-native-testing-library';
import snapshotDiff from 'snapshot-diff';

import { Loader, PageLoader } from '../index';

describe('Loader', () => {
  it('should match snapshot diff between small and large loader', () => {
    const small = render(<Loader size="small" />);
    const large = render(<Loader size="large" />);

    expect(snapshotDiff(small, large, { contextLines: 1 })).toMatchSnapshot();
  });
});

describe('Page Loader', () => {
  const { getByType } = render(<PageLoader />);

  it('should have large page loader for Android', () => {
    if (Platform.OS === 'android') {
      expect(getByType(Loader).props.size).toBe('large');
    }
  });

  it('should have small page loader for iOS', () => {
    if (Platform.OS === 'android') {
      expect(getByType(Loader).props.size).toBe('small');
    }
  });
});
