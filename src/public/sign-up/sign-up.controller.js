(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['userInfo', 'favoriteDishTitle', 'favoriteDishDescription', 'SignUpService'];
function RegistrationController(userInfo, favoriteDishTitle, favoriteDishDescription, SignUpService) {
  var reg = this;
  reg.userInfo = userInfo;
  reg.favoriteDishTitle = favoriteDishTitle;
  reg.favoriteDishDescription = favoriteDishDescription;

  reg.setUser = function(){
    SignUpService.setUser(reg.firstName, reg.lastName, reg.emailAddress, reg.phoneNumber, reg.favoriteDish);
  }

  reg.checkFavoriteDish = function(){
    if (reg.favoriteDish){
      SignUpService.checkFavoriteDish(reg.favoriteDish)
      .then(function(){
        reg.invalidItem = SignUpService.getInvalidItem();
      });
    }
  }

  reg.submit = function () {
    reg.completed = true;
  };
}

})();
