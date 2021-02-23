Parse.initialize("EIU9omRLUXGsZb7kR7wBmJ5rd48ikcLLThnNOGlG", "jhS3N5QfP337S8kZp42dbvOkxUChR64nQ8xm6Fy7");
Parse.serverURL = "https://parseapi.back4app.com/";


function createUser(){
var user = new Parse.User();

user.save({
  username: document.getElementById("inputUsername").value,
  email: document.getElementById("inputEmail").value,
  password: document.getElementById("inputPassword").value
}).then(function(response) {
  alert('New object create with success! ObjectId: ' + response.id + ', '+ user.get('username'));
}).catch(function(error) {
  alert('Error: ' + error.message);
});
Parse.serverURL = "https://parseapi.back4app.com/";

}
