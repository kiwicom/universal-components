// @flow

import { defaultTokens } from '@kiwicom/orbit-design-tokens';

export default {
  orbit: defaultTokens,
};

export type Theme = {|
  +orbit: typeof defaultTokens,
|};
