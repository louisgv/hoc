function DatabaseServ($firebaseObject) {
  console.log('DatabaseServ');

  var userName;

  var recipes;

  var User = $firebaseObject.$extend({
    // these methods exist on the prototype, so we can access the data using `this`
    $$defaults: {
      exp: 0,
      level: 1,
      finished: {}
    }
  });

  var user;

  return {
    recipes: recipes,
    userName: userName,
    user: user,
    newUser: function (uname) {
      var ref = fb.child(uname);
      return new User(ref);
    }
  };
}
