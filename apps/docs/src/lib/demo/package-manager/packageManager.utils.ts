export enum PackageManager {
	NPM = 'npm',
	PNPM = 'pnpm',
	Yarn = 'yarn',
}
export interface PackageManagerCommands {
	add: (pkg: string | string[]) => string;
	addDev: (pkg: string | string[]) => string;
}

export function getPackageManagerCommands(packageManager: PackageManager): PackageManagerCommands {
	const commands: { [pm in PackageManager]: PackageManagerCommands } = {
		npm: {
			add(pkg: string | string[]) {
				return `npm install ${([] as string[]).concat(pkg).join(' ')}`;
			},
			addDev(pkg: string | string[]) {
				return `npm install -D ${([] as string[]).concat(pkg).join(' ')}`;
			},
		},
		pnpm: {
			add(pkg: string | string[]) {
				return `pnpm add ${([] as string[]).concat(pkg).join(' ')}`;
			},
			addDev(pkg: string | string[]) {
				return `pnpm add -D ${([] as string[]).concat(pkg).join(' ')}`;
			},
		},

		yarn: {
			add(pkg: string | string[]) {
				return `yarn add ${([] as string[]).concat(pkg).join(' ')}`;
			},
			addDev(pkg: string | string[]) {
				return `yarn add -D ${([] as string[]).concat(pkg).join(' ')}`;
			},
		},
	};

	return commands[packageManager];
}
