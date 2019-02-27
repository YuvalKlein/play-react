import axios from 'axios';

export async function getUser() {
	try {
		const response = await axios.get('https://jasonplaceholder.typicode.com/posts');
		console.log(response);
	} catch (error) {
		console.error(error);
	}
}
