Parse.initialize("EIU9omRLUXGsZb7kR7wBmJ5rd48ikcLLThnNOGlG", "jhS3N5QfP337S8kZp42dbvOkxUChR64nQ8xm6Fy7");
Parse.serverURL = "https://parseapi.back4app.com/";

document.getElementById("notes").style.visibility = "hidden";

var itemArray = [];
var username = "";

async function logIn(){
   var user = Parse.User
        .logIn(document.getElementById("logInUsername").value, document.getElementById("logInPassword").value,).then(function(user) {
            console.log('User found: ' + user.get("username"));
            username = user.get("username");
            getNotes();
    }).catch(function(error){
        console.log("Error: " + error.code + " " + error.message);
    });
    console.log(document.getElementById("logInUsername").value);
    console.log(document.getElementById("logInPassword").value);
    document.getElementById("paragraph").remove();
    document.getElementById("notes").style.visibility = "visible"
}

function getNotes(){
  console.log("getNotes");
  asyncCall();

}

async function asyncCall(){
  console.log("asyncCall");
  const Notes = Parse.Object.extend("Notes");
  const query = new Parse.Query(Notes);
  console.log("async username " + username.toString());
  query.equalTo("username", username.toString());
  const results = await query.find();
  alert("Successfully retrieved " + results.length + " notes");
  for (let i = 0; i < results.length; i++) {
  const object = results[i];
  itemArray.push(object.get('content'));
  }
  addItem()
}

function addItem() {
  console.log("addItem " + itemArray);
  for(var i = 0; i < itemArray.length; i++){
    document.getElementById("itemParagraph").innerHTML+= "<br>" + "<br>" + itemArray[i];
  };
  document.getElementById("Item").value = "";
}

async function saveItem(){
  itemArray.splice(0, itemArray.length);
  const Notes = Parse.Object.extend("Notes");
  const notes = new Notes();

  notes.set("content", document.getElementById("Item").value);
  notes.set("username", username);

  await notes.save().then((note) =>{
    console.log("success");
  }, (error) => {
    console.log("error");
  });
  document.getElementById("itemParagraph").innerHTML = "";

  console.log(itemArray);
  getNotes();
}
