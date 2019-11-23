import React from 'react';

// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';

// @material-ui/core components
// import { makeStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Poppers from '@material-ui/core/Popper';

export default function CustomerFormInput(props) {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState('');
	const [target, setTarget] = React.useState(null);

	function handleClickOpen(e) {
		setTarget(e.currentTarget);
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	function handleMenuCLick(e) {
		let eventName = e.target.dataset.name;
		setName(eventName);
		props.getCustomers(eventName);
		handleClose();
	}

	return (
		<div>
			<button
				onClick={handleClickOpen}
				className="btn-start"
				style={{
					// backgroundImage:`url(${setting})`,
					marginTop: '30px'
					// marginLeft :"26%"
				}}
			>
				Chọn sự kiện
			</button>
			<p className="event">{name || ''}</p>
			<Poppers open={open} transition disablePortal anchorEl={target}>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						id="menu-list-grow"
						style={{
							transformOrigin:
								placement === 'bottom'
									? 'left top'
									: 'left bottom'
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList role="menu">
									{props.events.map(event => (
										<MenuItem
											onClick={handleMenuCLick}
											key={event.id}
											data-name={event.eventName}
										>
											{event.eventName}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Poppers>
		</div>
	);
}

// <Dialog
// 				open={open}
// 				onClose={handleClose}
// 				aria-labelledby="form-dialog-title"
// 			>
// 				<DialogTitle id="form-dialog-title">Lấy dữ liệu </DialogTitle>
// 				<DialogContent>
// 					<TextField
// 						autoFocus
// 						margin="dense"
// 						id="name"
// 						label="Tên sự kiện"
// 						fullWidth
// 						onChange={e => {
// 							getName(e);
// 						}}
// 					/>
// 				</DialogContent>
// 				<DialogActions>
// 					<Button onClick={handleClose} color="primary">
// 						Hủy
// 					</Button>
// 					<Button
// 						onClick={() => {
// 							props.getCustomers(name);
// 							setOpen(false);
// 						}}
// 						color="primary"
// 					>
// 						Xác nhận
// 					</Button>
// 				</DialogActions>
// 			</Dialog>
