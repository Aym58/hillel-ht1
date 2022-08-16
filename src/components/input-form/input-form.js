import { Component } from 'react';

class InputForm extends Component {
	render() {
		return (
			<div className='change-wrapper'>
				<form className='add-post'>
					<div className='input-message'>
						<input
							onChange={this.props.handleInputUser}
							type='text'
							className='input-title'
							placeholder='Username'
							value={this.props.inputUser}
						/>
						<textarea
							onChange={this.props.handleInputHeader}
							type='text'
							className='input-title'
							placeholder='Title'
							value={this.props.inputHeader}
						/>
						<textarea
							onChange={this.props.handleInputText}
							type='text'
							className='input-text'
							placeholder='Message'
							value={this.props.inputText}
						/>
					</div>
					<div className='add-message'>
						<button
							className='submit-btn'
							onClick={(e) => {
								e.preventDefault();
								if (this.props.action === 'change') {
									this.props.changePost();
								}
								if (this.props.action === 'add') {
									this.props.addPost();
								}
							}}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default InputForm;
