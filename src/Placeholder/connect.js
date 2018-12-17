// @flow

import * as React from 'react';

type Props = {
  onReady?: boolean,
  children: React.Node,
  animate?: string,
  customAnimate?: () => void,
};

const connect = (PlaceholderComponent: any) => {
  function placeholder(props: Props) {
    const { onReady, children, ...otherProps } = props;

    if (onReady) {
      return children;
    }

    return <PlaceholderComponent {...otherProps} />;
  }

  return placeholder;
};

export default connect;
