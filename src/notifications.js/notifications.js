import React from 'react';
import firbase from '';

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey('BHtcoYXnK3MisJl2WCjEi99YeXzH8pz4P4oPxNvMRxpfnds9P1Czh40WzaBCl21OOROHB_Dtjx2rm2JInPmF56A');

messaging
	.requestPermission()
	.then(function() {
		console.log('Notification permission granted.');
		// TODO(developer): Retrieve an Instance ID token for use with FCM.
		// ...
	})
	.catch(function(err) {
		console.log('Unable to get permission to notify.', err);
	});
