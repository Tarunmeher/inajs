function login(){
	const username = $("#username").val();
	const password = $("#password").val();
	if(username && password){
		try { 
			$("#loader").show(); 
			const payload = { 
				username: username, 
				password: hashCode(password),
			}
			ajaxRequest(mapInfo.serviceUrl+ "/authentication","POST",payload)
			.then(function(response){
				$("#loader").hide(); 
				if(response.messageCode==0){
                    showToast('success', 'Login Successful');
                    setTimeout(function(){
                        sessionStorage.setItem('userInfo',response.listOfUserResponse);
                        gotoPage('index.html');
                    },1000);
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
			showToast('error', 'Login Failed');
            console.error("Error:", error)
		}
	}else{
		if(!username){
			showToast('error', 'Username is Required');
            return;
		}
		if(!password){
			showToast('error', 'Password is Required');
            return;
		}
	}
}

