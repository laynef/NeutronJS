import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from '../redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import './real-path';

const dest = document.getElementById('public-app');
const store = createStore(window.STORE);

const component = (
	<BrowserRouter>
		{renderRoutes([
			// route here
		])}
	</BrowserRouter>
);

const application = (
	<Provider store={store}>
		{component}
	</Provider>
);

ReactDOM.render(application, dest);

if ((process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging')) {
	window.React = React; // enable debugger
}

/* eslint-disable */
if ((process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') && module.hot) {
	module.hot.accept([
		'./routes',
		'../redux/store',
	], () => {
		const newStore = require('../redux/store')(window.STORE);
		const newRoutes = require('./routes').declarePublicRoutes;

		const newComponent = (
			<BrowserRouter>
				{renderRoutes(newRoutes(true))}
			</BrowserRouter>
		);

		const newApplication = (
			<Provider store={newStore}>
				{newComponent}
			</Provider>
		);
		ReactDOM.render(newApplication, dest);
	});
}
