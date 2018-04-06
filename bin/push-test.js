const webpush = require('web-push');
// https://console.firebase.google.com
const SERVER_API_KEY="";
// From push-worker subscription
const pushSubscription = {"endpoint":"...","expirationTime":null,"keys":{"p256dh":"..."}};

webpush.setGCMAPIKey(SERVER_API_KEY);
webpush.sendNotification(pushSubscription, JSON.stringify({
	tag: Date.now(),
	method:"push",
	title: "Montage Popcorn",
	body: "There's a new trailer!"
})).then(function (res) {
	console.log('ok', res)
}).catch(function (err) {
	console.error('err', err)
});
