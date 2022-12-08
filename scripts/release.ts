import { execSync } from 'child_process';
import { copyFileSync } from 'fs';

// Build
execSync('pnpm --filter=@grail-ui/svelte build', { stdio: 'inherit' });

// Copy README
copyFileSync('./README.md', './packages/grail-ui/package/README.md');

// Publish
execSync('pnpm changeset publish');
