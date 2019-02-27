import axios from 'axios';

async function getUser() {
	try {
		const response = await axios.get('https://jasonplaceholder.typicode.com/posts');
		console.log(response);
	} catch (error) {
		console.error(error);
	}
}
