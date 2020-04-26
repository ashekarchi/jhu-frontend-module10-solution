describe('invalidDishCheck', function () {
  beforeEach(module('public'));

  var signup;
  var $httpBackend;
  var $injector = angular.injector();

  beforeEach(inject(function ($injector) {
      signup = $injector.get('SignUpService');
      $httpBackend = $injector.get('$httpBackend');
    }));

  it('should return false', function() {
    $httpBackend.whenGET("https://secure-journey-34634.herokuapp.com/menu_items/A1.json").respond(false);
    signup.checkFavoriteDish('A1').then(function(response) {
    expect(response).toEqual(false);
    });
    $httpBackend.flush();
  });

});
