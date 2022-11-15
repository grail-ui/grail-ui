module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['workspace-scopes'],
  rules: {
    'header-max-length': [2, 'always', 80],
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'test', // Adding missing tests or correcting existing tests
        'perf', // A code change that improves performance
        'revert', // Reverts a previous commit
        'cleanup', // Everything else ¯\_(ツ)_/¯
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'repo', // Changes that affect the build system, testing configuration, external dependencies etc
        'ci', // Changes to our CI configuration files and scripts
        //...package names from workspace
      ],
    ],
  },
  ignores: [
    (commit) => {
      return !process.env.CI && /wip/i.test(commit);
    },
  ],
};
