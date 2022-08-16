import { Component } from 'react';
class Post extends Component {
	render() {
		const { element } = this.props;
		return (
			<div className='post-block'>
				<div className='post-top-bar'>
					<div className='post-info'>
						<span>{element.id}</span>
						<span>User {element.userId}</span>
					</div>
					<div className='post-menu'>
						<button
							onClick={() => {
								this.props.changePost(element);
							}}
						>
							Change
						</button>
						<button
							onClick={() => {
								this.props.deletePost(element.id);
							}}
						>
							Delete
						</button>
					</div>
				</div>
				<div className='post-content'>
					<h1>{element.title}</h1>
					<p>{element.body}</p>
				</div>
			</div>
		);
	}
}

export default Post;
