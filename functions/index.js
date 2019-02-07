const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage');
const os = require('os');
const path = require('path');
const spanw = require('child-process-promise').spawn;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize((event) => {
	console.log('event', event);
	const object = event;
	console.log('object', object);
	const contentType = object.contentType;
	const filePath = object.name;
	console.log('file change detected, function execution started');

	if (path.basename(filePath).startsWith('renamed-')) {
		console.log('We already renamed that file');
		return;
	}

	const destBucket = gcs.bucket('play-e37a6.appspot.com/');
	const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
	const metadata = { contentType: contentType };
	return destBucket
		.file(filePath)
		.download({
			destionation: tmpFilePath
		})
		.then(() => {
			return destBucket.upload(tmpFilePath, {
				destionation: 'renamed-' + path.basename(filePath),
				metadata: metadata
			});
		});
});
