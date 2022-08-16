import './App.css';
import { Component } from 'react';
import InputForm from './components/input-form/input-form.js';
import Post from './components/post/post.js';
import * as api from './api.js';

class App extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			showChangePostWrapper: false,
		};
	}

	componentDidMount = async () => {
		try {
			const data = await api.getData();
			this.setState(() => {
				return { data: data };
			});
		} catch (err) {
			console.error('Error: ' + err.message);
		}
	};

	getArrId = (searchId) =>
		this.state.data.findIndex((el) => el.id === searchId);

	handleInputUser = (e) => this.setState({ inputUser: e.target.value });

	handleInputHeader = (e) => this.setState({ inputHeader: e.target.value });

	handleInputText = (e) => this.setState({ inputText: e.target.value });

	deletePost = async (id) => {
		try {
			const deleteId = this.getArrId(id);
			await api.deleteData(deleteId);
			this.setState({
				data: this.state.data.filter((el, i) => i !== deleteId),
			});
		} catch (err) {
			console.error('Error: ' + err.message);
		}
	};

	changePost = async () => {
		try {
			const chandeId = this.state.inputId;
			const changedPostArr = [...this.state.data];
			changedPostArr[chandeId] = {
				...changedPostArr[chandeId],
				userId: this.state.inputUser,
				title: this.state.inputHeader,
				body: this.state.inputText,
			};

			await api.changeData(changedPostArr[chandeId]);
			this.setState(() => {
				return {
					data: changedPostArr,
					inputUser: '',
					inputHeader: '',
					inputText: '',
					inputId: '',
					showChangePostWrapper: false,
					action: '',
				};
			});
		} catch (err) {
			console.error('Error: ' + err.message);
		}
	};

	addPost = async () => {
		try {
			const newPostObj = {
				userId: this.state.inputUser,
				id: this.state.data[this.state.data.length - 1].id + 1,
				title: this.state.inputHeader,
				body: this.state.inputText,
			};

			await api.postData(newPostObj);
			this.setState(() => {
				return {
					data: [...this.state.data, newPostObj],
					showChangePostWrapper: false,
					inputUser: '',
					inputHeader: '',
					inputText: '',
					action: '',
				};
			});
		} catch (err) {
			console.error('Error: ' + err.message);
		}
	};

	showAddPostForm = () => {
		this.setState(() => {
			return {
				showChangePostWrapper: true,
				inputUser: '',
				inputHeader: '',
				inputText: '',
				action: 'add',
			};
		});
	};

	showChangePostForm = (element) => {
		this.setState(() => {
			return {
				showChangePostWrapper: true,
				inputId: this.getArrId(element.id),
				inputUser: element.userId,
				inputHeader: element.title,
				inputText: element.body,
				action: 'change',
			};
		});
	};

	render() {
		return (
			<div className='App'>
				<div className='wrapper'>
					{this.state.data.map((element) => {
						return (
							<Post
								key={element.id}
								element={element}
								deletePost={this.deletePost}
								changePost={this.showChangePostForm}
							/>
						);
					})}
				</div>
				{this.state.showChangePostWrapper && (
					<InputForm
						action={this.state.action}
						inputUser={this.state.inputUser}
						handleInputUser={this.handleInputUser}
						inputHeader={this.state.inputHeader}
						handleInputHeader={this.handleInputHeader}
						inputText={this.state.inputText}
						handleInputText={this.handleInputText}
						changePost={this.changePost}
						addPost={this.addPost}
					/>
				)}
				{this.state.showChangePostWrapper || (
					<div className='add-new-post'>
						<button onClick={this.showAddPostForm}>Add new post</button>
					</div>
				)}
			</div>
		);
	}
}

export default App;
