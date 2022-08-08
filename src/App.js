import './App.css';
import { Component } from 'react';
import * as model from './model.js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			inputUser: '',
			inputHeader: '',
			inputText: '',
			showChangePostWrapper: false,
			changePostId: '',
			action: '',
		};
	}

	componentDidMount() {
		(async () => {
			const data = await model.getData();
			this.setState(() => {
				return { data: data };
			});
		})();
	}

	getArrId = (searchId) => {
		let id;
		const arr = this.state.data;
		arr.forEach((el, i) => {
			if (el.id === searchId) id = i;
		});
		return id;
	};

	handleInputUser = (e) => {
		this.setState({ inputUser: e.target.value });
	};
	handleInputHeader = (e) => {
		this.setState({ inputHeader: e.target.value });
	};
	handleInputText = (e) => {
		this.setState({ inputText: e.target.value });
	};

	deletePost = async (id) => {
		const arr = [...this.state.data];
		await model.deleteData(this.getArrId(id));
		arr.splice(this.getArrId(id), 1);
		this.setState(() => {
			return {
				data: arr,
			};
		});
	};

	changePost = async (e) => {
		e.preventDefault();
		const arr = [...this.state.data];
		arr[this.state.changePostId].userId = this.state.inputUser;
		arr[this.state.changePostId].title = this.state.inputHeader;
		arr[this.state.changePostId].body = this.state.inputText;
		await model.changeData(
			this.state.inputUser,
			this.state.inputHeader,
			this.state.inputText,
			this.state.changePostId
		);
		this.setState(() => {
			return {
				data: arr,
				inputUser: '',
				inputHeader: '',
				inputText: '',
				showChangePostWrapper: false,
				changePostId: '',
				action: '',
			};
		});
	};

	addPost = async (e) => {
		e.preventDefault();
		const arr = [...this.state.data];
		const newPostObj = {};
		newPostObj.userId = this.state.inputUser;
		newPostObj.id = arr[arr.length - 1].id + 1;
		newPostObj.title = this.state.inputHeader;
		newPostObj.body = this.state.inputText;
		arr.push(newPostObj);
		await model.postData(newPostObj.userId, newPostObj.title, newPostObj.body);
		this.setState(() => {
			return {
				data: arr,
				showChangePostWrapper: false,
				inputUser: '',
				inputHeader: '',
				inputText: '',
				action: '',
			};
		});
	};

	render() {
		return (
			<div className='App'>
				<div className='wrapper'>
					{this.state.data.map((el) => {
						return (
							<div key={el.id} className='post-block'>
								<div className='post-top-bar'>
									<div className='post-info'>
										<span>{el.id}</span>
										<span>User {el.userId}</span>
									</div>
									<div className='post-menu'>
										<button
											onClick={() => {
												this.setState(() => {
													return {
														showChangePostWrapper: true,
														changePostId: this.getArrId(el.id),
														inputUser: el.userId,
														inputHeader: el.title,
														inputText: el.body,
														action: 'change',
													};
												});
											}}
										>
											Change
										</button>
										<button
											onClick={() => {
												this.deletePost(el.id);
											}}
										>
											Delete
										</button>
									</div>
								</div>
								<div className='post-content'>
									<h1>{el.title}</h1>
									<p>{el.body}</p>
								</div>
							</div>
						);
					})}
				</div>
				{this.state.showChangePostWrapper && (
					<div className='change-wrapper'>
						<form className='add-post'>
							<div className='input-message'>
								<input
									onChange={this.handleInputUser}
									type='text'
									className='input-title'
									placeholder='Username'
									value={this.state.inputUser}
								/>
								<textarea
									onChange={this.handleInputHeader}
									type='text'
									className='input-title'
									placeholder='Title'
									value={this.state.inputHeader}
								/>
								<textarea
									onChange={this.handleInputText}
									type='text'
									className='input-text'
									placeholder='Message'
									value={this.state.inputText}
								/>
							</div>
							<div className='add-message'>
								<button
									className='submit-btn'
									onClick={(e) => {
										if (this.state.action === 'change') this.changePost(e);
										if (this.state.action === 'add') this.addPost(e);
									}}
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				)}
				{this.state.showChangePostWrapper || (
					<div className='add-new-post'>
						<button
							onClick={() => {
								this.setState(() => {
									return {
										showChangePostWrapper: true,
										inputUser: '',
										inputHeader: '',
										inputText: '',
										action: 'add',
									};
								});
							}}
						>
							Add new post
						</button>
					</div>
				)}
			</div>
		);
	}
}

export default App;
