import React, { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import headerImg from './images/header.png';
import reward from './images/reward.png';

import './App.css';

function App() {
	const { width, height } = useWindowSize();
	const [show, setShow] = useState(false);
	return (
		<>
			<div className="header">
				<img src={headerImg} alt="" />
				<p>CHÚC MỪNG KHÁCH HÀNG MAY MẮN</p>
			</div>
			<div className="box">
				<div className="separate"></div>
				<button className="btn-start" onClick={() => setTimeout(() => setShow(true), 7500)}>Quay</button>
			</div>
			{show
				? <>
					<div className="confetti">
						<Confetti width={width} height={height} />
					</div>
					<div className="reward">
						<img src={reward} alt="" ></img>
						<div className="info">
							<div><span>Kết quả :</span><b>{window.localStorage.getItem('result')}</b></div>
							<div><span>Họ và tên	:</span><b>Hardcode</b></div>
							<div><span>Số điện thoại :</span><b>Hardcode</b></div>
							<div><span>Mã dự thưởng :</span><b>Hardcode</b></div>
						</div>
						<button className="btn-close" onClick={() => { setShow(false) }}>Đóng</button>
					</div>
					<div className="mask"></div>
				</>
				: <div></div>
			}

		</>
	);
}

export default App;
