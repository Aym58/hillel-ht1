export const getData = async () => {
	let res = await fetch('https://jsonplaceholder.typicode.com/posts');
	let data = await res.json();
	return data;
};

export const deleteData = async (id) => {
	let res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
		method: 'DELETE',
	});
	console.log(res);
};

export const postData = async (userId, title, body) => {
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
	console.log(res);
	let data = await res.json();
	console.log(data);
};

export const changeData = async (userId, title, body, id) => {
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
	console.log(res);
	let data = await res.json();
	console.log(data);
};
