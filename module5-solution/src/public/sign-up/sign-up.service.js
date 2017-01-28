(function (){
"use strict";

angular.module('public')
.service('SignUpService', SignUpService);

function SignUpService() {
  var service = this;

  this.user ={};

  this.user.firstName = "";
  this.user.lastName = "";
  this.user.email = "";
  this.user.phone = "";
  this.user.dish = "";

  this.getUser = function () {
    return this.user;
  };

  this.setUser = function (user) {
    this.user = user;
  };

  this.setFirstName = function (firstName) {
    this.user.firstName = firstName;
  };

  this.setLastName = function (lastName) {
    this.user.lastName = lastName;
  };

  this.setEmail = function ( email) {
    this.user.email = email;
  };

  this.setPhone = function (phone) {
    this.user.phone = phone;
  };

  this.setDish = function (dish)  {
    this.user.dish = dish;
  };

}


})();
