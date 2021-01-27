/**
 * URLs to test.
 */
const urls = [
	'https://bossip.com/',
	'https://bossip.com/category/smh/',
];

/**
 * Default table options.
 */
const tableOptions = {
	drawHorizontalLine: ( index, size ) => {
		return index === 0 || index === 1 || index === size || index % 4 === 0;
	}
}

/**
 * Use this config to output JIRA markdown style tables. See https://github.com/gajus/table for details.
 */
/*
const tableOptions = {
	drawHorizontalLine: () => false,
	border: {
		bodyLeft: `|`,
		bodyRight: `|`,
		bodyJoin: `|`,

		joinBody: `-`,
		joinLeft: `|`,
		joinRight: `|`,
		joinJoin: `|`
	}
};
*/

module.exports = {
	urls: urls,
	tableOptions: tableOptions
};
