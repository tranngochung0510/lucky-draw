import React, { useState, useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import headerImg from "./images/header.png";
import reward from "./images/reward.png";
import axios from "axios";
import { Flip } from "number-flip";
import EventNameInput from "./EventNameInput.jsx";
import "./App.css";

function App() {
	const { width, height } = useWindowSize();
	const [show, setShow] = useState(false);
	const [customer, setCustomer] = useState({});
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

	function spin() {
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
				let customers = res.data.data.getCustomerByEvent;
				let index = Math.floor(Math.random() * customers.length);
				let winner = customers[index];
				setCustomer(winner);
				console.log("winner", winner.code);
				window.localStorage.setItem("result", parseInt(winner.code));
			})
			.catch(error => {
				console.log(error);
				alert(`Error`);
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
				<button
					className="btn-start"
					onClick={() => {
						spin();
					}}
				>
					Quay
				</button>
				<EventNameInput
					getCustomers={data => {
						getCustomers(data);
					}}
				></EventNameInput>
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
