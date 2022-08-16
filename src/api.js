export const getData = async () => {
	try {
		let res = await fetch('https://jsonplaceholder.typicode.com/posts');
		let data = await res.json();
		return data;
	} catch (err) {
		throw err;
	}
};

export const deleteData = async (id) => {
	try {
		await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
			method: 'DELETE',
		});
	} catch (err) {
		throw err;
	}
};

export const postData = async ({ userId, title, body }) => {
	try {
		let res = await fetch('https://jsonplaceholder.typicode.com/posts/', {
			method: 'POST',
			body: JSON.stringify({
				title: body,
				body: title,
				userId: userId,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		await res.json();
	} catch (err) {
		throw err;
	}
};

export const changeData = async ({ userId, title, body, id }) => {
	try {
		let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				title: body,
				body: title,
				userId: userId,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		});
		await res.json();
	} catch (err) {
		throw err;
	}
};
