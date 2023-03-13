import { execSync } from 'child_process';
import { copyFileSync } from 'fs';

// Build
execSync('pnpm --filter=@grail-ui/svelte build', { stdio: 'inherit' });

// Copy files before publish
copyFileSync('./README.md', './packages/grail-ui/README.md');
copyFileSync('./packages/grail-ui/.npmignore', './packages/grail-ui/dist/.npmignore');

// Publish
execSync('pnpm changeset publish', { stdio: 'inherit' });
