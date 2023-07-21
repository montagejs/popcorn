#!/usr/bin/env node

var webpush = require('web-push');
// https://console.firebase.google.com
var SERVER_API_KEY="";
// From push-worker subscription
var pushSubscription = {"endpoint":"...","expirationTime":null,"keys":{"p256dh":"..."}};

webpush.setGCMAPIKey(SERVER_API_KEY);
webpush.sendNotification(pushSubscription, JSON.stringify({
	tag: Date.now(),
	method:"push",
	title: "Montage Popcorn",
	icon: '/assets/icons/icon-196.png',
	badge:'/assets/icons/icon-128.png',
	sound: '/assets/audio/pop_up_alert.mp3',
	body: "There's a new trailer!"
})).then(function (res) {
	console.log('ok', res);
}).catch(function (err) {
	console.error('err', err);
});
	