// Initialize Firebase
	var config = {
		apiKey: "AIzaSyCkgoARfdFPy5Vg2Hp5tfzpj1RFHGNrnis",
		authDomain: "sauermanncrud.firebaseapp.com",
		databaseURL: "https://sauermanncrud.firebaseio.com",
		projectId: "sauermanncrud",
		storageBucket: "sauermanncrud.appspot.com",
		messagingSenderId: "892015769643"
	};
	firebase.initializeApp(config);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('things');


readUserData(); 
	

// --------------------------
// READ
// --------------------------
function readUserData() {



	usersRef.on("value", snap => {

		var tableRef = document.getElementById('listOfAllElements').getElementsByTagName('tbody')[0];
		tableRef.innerHTML = ""

		snap.forEach(childSnap => {
			let key = childSnap.key,
				value = childSnap.val()
  			
			
			
			console.log(value);

			// edit icon
			let editIconUI = document.createElement("span");
			editIconUI.class = "edit-user";
			editIconUI.innerHTML = " ✎";
			editIconUI.setAttribute("userid", key);
			editIconUI.addEventListener("click", editButtonClicked)

			// delete icon
			let deleteIconUI = document.createElement("span");
			deleteIconUI.class = "delete-user";
			deleteIconUI.innerHTML = " ☓";
			deleteIconUI.setAttribute("userid", key);
			deleteIconUI.addEventListener("click", deleteButtonClicked)
		

			// Insert a row in the table at the last row
			var newRow   = tableRef.insertRow(tableRef.rows.length);
			
			// Insert a cell in the row at index 0
			var newCell1  = newRow.insertCell(0);
			var newCell2  = newRow.insertCell(1);
			var newCell3  = newRow.insertCell(2);
			
			// Append a text node to the cell
			var rowName  = document.createTextNode(value.name);
			var rowAnz  = document.createTextNode(value.anz);
			
			
			
			newCell1.appendChild(rowName);
			newCell2.appendChild(rowAnz);
			newCell3.appendChild(editIconUI);
			newCell3.appendChild(deleteIconUI);
 		});


	})

}




// --------------------------
// ADD
// --------------------------

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked)



function addUserBtnClicked() {

	const usersRef = dbRef.child('things');

	const addUserInputsUI = document.getElementsByClassName("user-input");

 	// this object will hold the new user information
    let newUser = {};

    // loop through View to get the data for the model 
    for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

        let key = addUserInputsUI[i].getAttribute('data-key');
        let value = addUserInputsUI[i].value;
        newUser[key] = value;
    }
	usersRef.push(newUser)
}


// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

		e.stopPropagation();

		var userID = e.target.getAttribute("userid");

		const userRef = dbRef.child('things/' + userID);
		
		userRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {
	

	$('#editElementModal').modal('show');
	

	//set user id to the hidden input field
	document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

	const userRef = dbRef.child('things/' + e.target.getAttribute("userid"));

	// set data to the user field
	const editUserInputsUI = document.querySelectorAll(".edit-user-input");


	userRef.on("value", snap => {

		for(var i = 0, len = editUserInputsUI.length; i < len; i++) {

			var key = editUserInputsUI[i].getAttribute("data-key");
					editUserInputsUI[i].value = snap.val()[key];
		}

	});




	const saveBtn = document.querySelector("#edit-user-btn");
	saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {
 
	const userID = document.querySelector(".edit-userid").value;
	const userRef = dbRef.child('things/' + userID);

	var editedUserObject = {}

	const editUserInputsUI = document.querySelectorAll(".edit-user-input");

	editUserInputsUI.forEach(function(textField) {
		let key = textField.getAttribute("data-key");
		let value = textField.value;
  		editedUserObject[textField.getAttribute("data-key")] = textField.value
	});



	userRef.update(editedUserObject);
	$("#editElementModal").modal("hide")


}



        








