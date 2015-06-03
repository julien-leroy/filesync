'use strict';
angular.module('FileSync')
	.factory('SocketIOService', ['io', '_', '$timeout', function (io, _, $timeout) {
		var socket = io();
		var _onFileChanged = _.noop;
		var _onVisibilityStatesChanged = _.noop;
		var _onMessageReceived = _.noop;
		var _onNameChanged = _.noop;

		socket.on('connect', function () {
			console.log('connected'); // @todo display it on screen using a notifier
		});

		socket.on('file:changed', function (filename, timestamp, content) {
			$timeout(function () {
				_onFileChanged(filename, timestamp, content);
			});
		});

		socket.on('users:visibility-states', function (states) {
			$timeout(function () {
				_onVisibilityStatesChanged(states);
			});
		});

		socket.on('users:nameChanged', function (name) {
			$timeout(function () {
				_onNameChanged(name);
			});
		});

		socket.on('message:received', function (timestamp, content) {
			$timeout(function () {
				_onMessageReceived(timestamp, content);
			});
		});

		socket.on('error:auth', function (err) {
			// @todo yeurk
			alert(err);
		});

		return {
			onFileChanged: function (f) {
				_onFileChanged = f;
			},

			onChatMessageReceived: function (f) {
				socket.on('chat:messageReceived', f);
			},

			sendChatMessage: function (message) {
				socket.emit('chat:messageSend', message);
			},

			onVisibilityStatesChanged: function (f) {
				_onVisibilityStatesChanged = f;
			},

			onMessageReceived: function (f) {
				_onMessageReceived = f;
			},

			onNameChanged: function (f) {
				_onNameChanged = f;
			},

			userChangedState: function (state) {
				socket.emit('user-visibility:changed', state);
			},

			userNameChanged: function (userName) {
				console.log(userName);
				socket.emit('user-name:changed', userName);
			}
		};
	}]);