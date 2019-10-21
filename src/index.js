import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Flip } from "number-flip";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<App />,
	document.getElementById('root'),
	() => {
		const $ = s => document.querySelector(s);
		const sepa = new Flip({
			node: $(".separate"),
			from: 999999,
			separator: "",
			direct: false,
			duration: 7,
		});

		$(".btn-start").onclick = () => {
			let result = ~~(Math.random() * 999999);
			sepa.flipTo({
				to: result
			});
			window.localStorage.setItem('result', result);
		}
	});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
