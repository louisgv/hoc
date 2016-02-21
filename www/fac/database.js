function DatabaseServ() {
  console.log('DatabaseServ');

  var recipes;
  var user = {
    exp: 0,
    level: 1,
    finished: {}
  };
  return {
    recipes: recipes,
    user: user
  };
}
