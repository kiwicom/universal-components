// @flow

export default (text: ?string) =>
  text ? text[0].toUpperCase() + text.slice(1) : '';
