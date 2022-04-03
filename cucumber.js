const common = [
  '--require-module ts-node/register', // Load TypeScript module
  'tests/features/**/*.feature',
  '--require tests/features/_step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  common,
  default: '--publish-quiet'
};
