module.exports = {
	root: true,
	// This tells ESLint to load the config from the package `eslint-config-custom`
	extends: ["base"],
	settings: {
		next: {
			rootDir: ["apps/*/"],
		},
	},
};
