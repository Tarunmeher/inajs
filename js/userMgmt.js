

let users = [];

/**
 * Method Name : fetchUsers
 * Written By : Tarun Meher
 * This Method fetch existing users ans forward to bind users in the table
 */
function fetchUsers() {	
	try {
		ajaxRequest(mapInfo.serviceUrl+ "/user","GET",{})
			.then(function(response){
				$("#loader").hide(); 
				if(response.messageCode==0){
					console.log(response); 
					users = response.listOfUserResponse;
					currentPage = 1;
					totalPages = Math.ceil(users.length / pageSize);
					updatePagination();
				}else{
					showToast('error', response.message);
				}
			})
			.catch(function(error){
				$("#loader").hide(); 
				showToast('error', 'Login Failed');
				console.error("Error:", error)
			});
	} catch (error) {
		$("#loader").hide(); 
		console.log(error)
	}
}

/**
 * Written By : Tarun Meher
 * Pagination for View User Table Starts
 */
const pageSize = 10; // Items per page 
var userstListDt = [];
var userSearchText = '';
$(".userSearchText").keyup(function(){
	userSearchText = $(this).val();
	updatePagination();
});

// Function to filter and paginate data
const updatePagination = function () {
	// Step 1: Filter full data
	let filteredData = users.filter(user => 
		user.first_name.toLowerCase().includes(userSearchText.toLowerCase()) ||
		user.user_name.toLowerCase().includes(userSearchText.toLowerCase()) ||
		user.email.toLowerCase().includes(userSearchText.toLowerCase()) ||
		user.mobile.includes(userSearchText) ||
		user.user_id.toString().includes(userSearchText) ||
		user.role[0].role_name.toLowerCase().toString().includes(userSearchText.toLowerCase())
	)
	if (userSearchText.length > 0) {
		currentPage = 1;
	}
	// Step 2: Paginate filtered data
	totalPages = Math.ceil(filteredData.length / pageSize);
	let start = (currentPage - 1) * pageSize;
	let end = start + pageSize;
	userstListDt = filteredData.slice(start, end);
	bindUser();

	document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
	document.getElementById('prevBtn').disabled = currentPage === 1;
	document.getElementById('nextBtn').disabled = currentPage === totalPages;
	// Show or hide pagination based on the number of pages
	document.getElementById('userDetailPagination').style.display = totalPages > 1 ? 'flex' : 'none';
};
const nextPage = function () {
	if (currentPage < totalPages) {
		currentPage++;
		updatePagination();
	}
};
const prevPage = function () {
	if (currentPage > 1) {
		currentPage--;
		updatePagination();
	}
};

/**
 * Pagination for View User Table Ends
 */



/**
 * Method Name : viewAssignedGP
 * Written By : Tarun Meher
 * Bind the users in the table
 */
function bindUser(){
	$("#userlist").html('');
	if(userstListDt.length>0){
		userstListDt.forEach((user, index)=>{
			$("#userlist").append(`<tr>
				<td>${index+1}</td>
				<td>${user.user_id?user.user_id:''}</td>
				<td>${user.user_name?user.user_name:''}</td>
				<td>${user.status?user.status:'Not Assigned'}</td>
				<td>${user.role[0].role_name?user.role[0].role_name:''}</td>
				<td><i onclick="viewAssignedGP(${user.user_id})" class="bi bi-eye-fill"></i></td>
				<td><i onclick="assignedNewGP(${user.user_id})" class="bi bi-pin-map-fill"></i></td>
				<td><i onclick="editUser(${user.user_id})" class="bi bi-pencil-fill"></i></td>
				<td><i onclick="deleteUser(${user.user_id})" class="bi bi-trash-fill"></i></td>
				</tr>`);
		});
	}
}


/**
 * Method Name : viewAssignedGP
 * Written By : Tarun Meher
 * This method fetches gp list which are assigned to the selected user 
 * @param {*} uid 
 */
function viewAssignedGP(uid){
	$("#modalTitle").text('Assigned GP/s')
	openModal();
	$("#assignedgp-content").show();
	$("#assigngp-content").hide();
	$("#edituser-content").hide();
}



/**
* Method Name : assignedNewGP
 * Written By : Tarun Meher
 * This method assign new gps to the selected user 
 * @param {*} uid 
 */
function assignedNewGP(uid){
	$("#modalTitle").text('Assign New GP/s')
	openModal();
	$("#assignedgp-content").hide();
	$("#assigngp-content").show();
	$("#edituser-content").hide();
}



/**
 * Method Name : editUser
 * Written By : Tarun Meher
 * This method edit the existing user 
 * @param {*} uid 
 */
function editUser(uid){
	$("#modalTitle").text('Edit User')
	openModal();
	$("#assignedgp-content").hide();
	$("#assigngp-content").hide();
	$("#edituser-content").show();
}



/**
 * Method Name : deleteUser
 * Written By : Tarun Meher
 * This method delete the existing user 
 * @param {*} uid 
 */
function deleteUser(uid){

}


function addGP(event){
	let gpName = $(event).parent().text();
	$(event).parent().remove();
	$("#selectedgplist-list").append(`<div class="list">${gpName}<i class="bi bi-dash-lg" onclick="removeGP(this);"></i></div>`);
}
function removeGP(event){
	let gpName = $(event).parent().text();
	$(event).parent().remove();
	$("#gplist-list").append(`<div class="list">${gpName}<i class="bi bi-plus-lg" onclick="addGP(this);"></i></div>`);
}

$("#openChangePassword").click(function(){
	$("#changepassword-container").show();
	$("#changepassword-container").animate({"width":"300px"}, "fast");	
});
function closeChangePassword(){
	$("#changepassword-container").animate({"width":"0px"}, "fast");
	$("#changepassword-container").hide();
}

