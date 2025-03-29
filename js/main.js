function gotoPage(pagename){
	window.location.href = pagename;
}


// Tab Navigation
function openTab(event,tabId) {
	let tabs = document.querySelectorAll(".tab-content");
	let tabButtons = document.querySelectorAll(".tab");
	
	tabs.forEach(tab => tab.classList.remove("active"));
	tabButtons.forEach(tab => tab.classList.remove("active"));

	document.getElementById(tabId).classList.add("active");
	event.currentTarget.classList.add("active");
}


function showToast(type, message) {
	const toastContainer = document.getElementById('toastContainer');

	// Create Toast Element
	const toast = document.createElement('div');
	toast.className = `toast ${type}`;
	toast.innerHTML = message;

	// Append to Container
	toastContainer.appendChild(toast);

	// Show Toast
	setTimeout(() => {
		toast.classList.add('show');
	}, 100);

	// Auto Remove Toast After 3 Seconds
	setTimeout(() => {
		toast.classList.remove('show');
		setTimeout(() => toast.remove(), 500);
	}, 3000);

	// Remove on Click
	toast.addEventListener('click', () => {
		toast.classList.remove('show');
		setTimeout(() => toast.remove(), 500);
	});
}


function ajaxRequest(url, method = "GET", data = null) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); // Adjust headers if needed

		xhr.onprogress = function (event) {
            if (event.lengthComputable) {
                let percentComplete = (event.loaded / event.total) * 100;
                $("#progressSts").html(percentComplete+"%");
            }
        };

        // Handle Response
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    resolve(JSON.parse(xhr.responseText)); // Parse JSON response
                } catch (error) {
                    reject({ message: "Invalid JSON response", details: error });
                }
            } else {
                reject({ error: "Server Error", status: xhr.status, message: xhr.responseText });
            }
        };

        // Handle Network Errors
        xhr.onerror = function () {
            reject({ error: "Network Error", message: "Check your internet connection" });
        };

        // Handle Timeout
        xhr.ontimeout = function () {
            reject({ error: "Request Timeout", message: "Server took too long to respond" });
        };

        // Send Request
        xhr.send(data ? JSON.stringify(data) : null);
    });
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return hash;
}


// Open Modal Function
function openModal() {
	document.getElementById("myModal").style.display = "block";
}

// Close Modal Function
function closeModal() {
	document.getElementById("myModal").style.display = "none";
}

// Close Modal When Clicking Outside
window.onclick = function(event) {
	let modal = document.getElementById("myModal");
	if (event.target === modal) {
		closeModal();
	}
}





