(function () {
'use strict';

angular.module('public')
.service('SignUpService', SignUpService);

SignUpService.$inject=['$http']
function SignUpService($http){
  var service = this;
  service.user ={
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    favoriteDish: ""
  }

  service.invalidItem;

  service.favDishTitle;
  service.favDishDescription;

  service.getUser = function(){
    return service.user;
  }

  service.setUser = function(firstName, lastName, emailAddress, phoneNumber, favoriteDish){
    service.user.firstName = firstName;
    service.user.lastName = lastName;
    service.user.emailAddress = emailAddress;
    service.user.phoneNumber = phoneNumber;
    service.user.favoriteDish = favoriteDish;
  }

  service.checkFavoriteDish = function(favoriteDish){
    return $http({
      method:"GET",
      url:  "https://secure-journey-34634.herokuapp.com/menu_items/" + favoriteDish +".json"
    }).then(function (response) {
      service.invalidItem = false;
      return service.invalidItem;
    }).catch(function(data){
      service.invalidItem = true;
      return service.invalidItem;
    });
  }

  service.getInvalidItem = function(){
    return service.invalidItem;
  }

  service.getFavDishTitle = function(){
    if (service.user.favoriteDish){
      return $http({
        method:"GET",
        url:  "https://secure-journey-34634.herokuapp.com/menu_items/" + service.user.favoriteDish +".json"
      }).then(function (response) {
        service.favDishTitle = response.data.name;
        return service.favDishTitle;
      });
    }
    else{
      return "no favorite selected";
    }
  }

  service.getFavDishDescription = function(){
    if (service.user.favoriteDish){
      return $http({
        method:"GET",
        url:  "https://secure-journey-34634.herokuapp.com/menu_items/" + service.user.favoriteDish +".json"
      }).then(function (response) {
        service.favDishDescription = response.data.description;
        return service.favDishDescription;
      });
    }
    else{
      return "no favorite selected";
    }
  }
}
})();
