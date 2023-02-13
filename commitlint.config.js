module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'update',
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert'
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-enum': [0, 'always', []],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-empty': [1, 'never'],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
};
