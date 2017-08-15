const { defineSupportCode } = require('cucumber');

defineSupportCode(({ When, Then }) => {
  When(/^(.*)$/, (value) => {
    console.log(`INFO [steps] ${value}`);
  });
});
