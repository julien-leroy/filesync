'use strict';
angular.module('FileSync').controller('ChatCtrl', function ($scope, SocketIOService, ChatService, $sce) {
   this.messages = ChatService.messages;
   this.inputValue = '';
   this.author = '';
   SocketIOService.onChatMessageReceived(function (author, message) {
     this.messages.push({
     	content: message,
     	timestamp: ChatService.getFomatedTimestamp(),
     	author: author
     });
     $scope.$apply();
   }.bind(this));
   this.sendMessage = function () {
     ChatService.sendMessage(this.inputValue);
     this.inputValue = '';
   };
   this.deleteMessage = function (index) {
     ChatService.deleteMessage(index);
   };
   this.formatMessage = function(message){
     return ChatService.formatMessage(message, $sce);
   }
   this.changeName = function(name){
     return ChatService.changeName(name);
   }
}); 
