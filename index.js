const lighthouse = require('lighthouse');
const constants = require('lighthouse/lighthouse-core/config/constants');
const chromeLauncher = require('chrome-launcher');
const chalk = require('chalk');
const Anim = require('./Anim');
const {table} = require('table');

const config = require('./config');

let data = [];
let animation = new Anim();
const lhResultsDesktop = [];
const lhResultsMobile = [];

const launchChrome = url => {
	return chromeLauncher.launch( {
		chromeFlags: ['--headless']
	} ).then( async chrome => {
		const optsDesktop = {
			output: 'json',

			formFactor: 'desktop',
			throttlingMethod: 'simulate',
			throttling: constants.throttling.desktopDense4G,
			screenEmulation: constants.screenEmulationMetrics.desktop,
			emulatedUserAgent: constants.userAgents.desktop,

			onlyCategories: [ 'performance' ],
			port: chrome.port
		};

		const optsMobile = {
			output: 'json',
			
			formFactor: 'mobile',
			throttlingMethod: 'simulate',
			throttling: constants.throttling.mobileSlow4G,
			screenEmulation: constants.screenEmulationMetrics.mobile,
			emulatedUserAgent: constants.userAgents.mobile,

			onlyCategories: [ 'performance' ],
			port: chrome.port
		};

		process.stdout.write( 'running mobile test ... ' );
		animation.start();
		await lighthouse( url, optsMobile ).then( results => {
			let json = JSON.parse( results.report );
			lhResultsMobile.push( json );
			animation.stop();
		});
		process.stdout.write( chalk.green( 'done   ' ) + '\n' );

		process.stdout.write( 'running desktop test ... ' );
		animation.start();
		await lighthouse( url, optsDesktop ).then( results => {
			let json = JSON.parse( results.report );
			lhResultsDesktop.push( json );
			animation.stop();
		});
		process.stdout.write( chalk.green( 'done   ' ) + '\n' );

		return chrome.kill();
	});
};

( async () => {
	let start = new Date();
	let urls = config.urls;

	for ( let i = 0; i < urls.length; i++ ) {
		let url = urls[i];
		console.log( `Running Lighthouse for: ${url}` );
		await launchChrome( url );
	}
	console.log( '\n' );
	
	let titles = [ 'URL', 'SCORE', 'FCP', 'SI', 'LCP', 'TTI', 'TBT', 'CLS' ];
	data.push( titles );
	
	urls.forEach( ( url, index ) => {

		let urlRow = [ url, '', '', '', '', '', '', '' ];
		data.push( urlRow );

		let mobile = lhResultsMobile[ index ];
		let mobileRow = [
			'-- mobile',
			mobile['categories']['performance']['score'] * 100,
			mobile.audits['first-contentful-paint'].displayValue,
			mobile.audits['speed-index'].displayValue,
			mobile.audits['largest-contentful-paint'].displayValue,
			mobile.audits['interactive'].displayValue,
			mobile.audits['total-blocking-time'].displayValue,
			mobile.audits['cumulative-layout-shift'].displayValue
		];
		data.push( mobileRow );

		let desktop = lhResultsDesktop[ index ];
		let desktopRow = [
			'-- desktop',
			desktop['categories']['performance']['score'] * 100,
			desktop.audits['first-contentful-paint'].displayValue,
			desktop.audits['speed-index'].displayValue,
			desktop.audits['largest-contentful-paint'].displayValue,
			desktop.audits['interactive'].displayValue,
			desktop.audits['total-blocking-time'].displayValue,
			desktop.audits['cumulative-layout-shift'].displayValue
		];
		data.push( desktopRow );
	} );

	const output = table( data, config.tableOptions || {} );
	console.log( output );

	let end = new Date() - start;
	console.info( 'Execution time: %ds', end / 1000 );
})();
