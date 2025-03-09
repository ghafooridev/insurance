export default {
  '**/*.{ts,tsx}': (stagedFiles) => [`prettier --write ${stagedFiles.join(' ')}`, `eslint .`]
}