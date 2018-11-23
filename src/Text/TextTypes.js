// @flow

import * as React from 'react';

export type Element = 'span' | 'div' | 'p';

export type TextType = {|
  +align?: 'left' | 'right' | 'center' | 'justify',
  +children: React.Node,
  +dataTest?: string,
  +weight?: 'normal' | 'bold',
  +italic?: boolean,
  +size?: 'normal' | 'large' | 'small',
  +uppercase?: boolean,
  +type?:
    | 'attention'
    | 'critical'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'white',
|};
