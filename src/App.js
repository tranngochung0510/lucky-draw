import React, { useState, useEffect } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import headerImg from './images/header.png';
import reward from './images/reward.png';
import axios from 'axios';
// import { Flip } from 'number-flip';
import EventNameInput from './EventNameInput.jsx';
import './App.css';

function App() {
	const { width, height } = useWindowSize();
	const [show, setShow] = useState(false);
	const [customer, setCustomer] = useState({});
	const [events, setEvents] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [disable, setDisable] = useState(true);
	/* useEffect(() => {
		const $ = s => document.querySelector(s);
		var sepa = new Flip({
			node: $(".separate"),
			from: 999999,
			separator: "",
			direct: false,
			duration: 7
		});
		$(".btn-start").onclick = () => {
			let result = ~~(Math.random() * 9999999);

			sepa.flipTo({
				to: result
			});
			// window.localStorage.setItem("result", result);
		};
	}, []); */

	useEffect(() => {
		axios
			.get('http://localhost:3001/graphql?query={getEvents{eventName,id}}')
			.then(res => {
				console.log(res.data.data.getEvents);
				setEvents(res.data.data.getEvents);
			})
			.catch(error => console.log(error));
	}, []);

	function findWinner() {
		if (customers === []) return;
		let tmp = [...customers];
		let index = Math.floor(Math.random() * tmp.length);
		let winner = tmp[index];
		window.localStorage.setItem('result', parseInt(winner.code));
		tmp.splice(customers.indexOf(customer), 1);
		console.log(tmp);
		setCustomers(tmp);
		setCustomer(winner);
	}

	function spin() {
		if (customers.length === 0) {
			alert('Het khach hang');
			return;
		}
		// console.log(customers === [])
		findWinner();
		setTimeout(() => {
			setShow(true);
		}, 7500);
	}
	function getCustomers(data) {
		axios
			.post(`http://localhost:3001/graphql`, {
				query: `
					query GetCustomerByEvent($eventName: String!) {
						getCustomerByEvent(eventName: $eventName) {
							name,
							phone,
							code
					}
					}`,
				variables: {
					eventName: data
				}
			})
			.then(res => {
				let _customers = res.data.data.getCustomerByEvent;
				// let index = Math.floor(Math.random() * _customers.length);
				// let winner = _customers[index];
				// console.log('winner', winner);
				// window.localStorage.setItem('result', parseInt(winner.code));
				// console.log(_customers);
				setCustomers(_customers);
				setDisable(false);
				// setCustomer(winner);
			})
			.catch(error => {
				console.log(error);
				alert(`Danh sach khach hang trong`);
			});
	}
	return (
		<>
			<div className="header">
				<img src={headerImg} alt="" />
				<p>CHÚC MỪNG KHÁCH HÀNG MAY MẮN</p>
			</div>
			<div className="box">
				<div className="separate"></div>
				<div>
					<button
						className="btn-start"
						onClick={() => {
							// console.log("spin")
							spin();
						}}
						disabled={disable}
					>
						Quay
					</button>
					<select name="prize" className="btn-start select-prize">
						<option value="1" defaultValue>
							Giải nhất
						</option>
						<option value="2">Giải nhì</option>
						<option value="3">Giải ba</option>
					</select>
				</div>
				<EventNameInput
					getCustomers={data => {
						getCustomers(data);
					}}
					events={events}
				/>
			</div>
			{show ? (
				<>
					<div className="confetti">
						<Confetti width={width} height={height} />
					</div>
					<div className="reward">
						<img src={reward} alt=""></img>
						<div className="info">
							{/* <div>
								<span>Kết quả :</span>
								<b>{window.localStorage.getItem("result")}</b>
							</div> */}
							<div>
								<span>Họ và tên :</span>
								<b>{customer.name}</b>
							</div>
							<div>
								<span>Số điện thoại :</span>
								<b>{customer.phone}</b>
							</div>
							<div>
								<span>Mã dự thưởng :</span>
								<b>{customer.code}</b>
							</div>
						</div>
						<button
							className="btn-close"
							onClick={() => {
								setShow(false);
								// findWinner();
							}}
						>
							Đóng
						</button>
					</div>
					<div className="mask"></div>
				</>
			) : (
				<div></div>
			)}
		</>
	);
}

export default App;
