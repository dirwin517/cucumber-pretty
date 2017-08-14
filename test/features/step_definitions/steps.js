const { defineSupportCode } = require('cucumber');

defineSupportCode(({ When, Then }) => {
  When('foo', () => console.log('foo'));
  Then('bar', () => console.log('bar'));
});
