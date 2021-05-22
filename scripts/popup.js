/*
	The UI which is popped up while user click on 'browser action' which is your extension icon button right to the browser address bar.
	Most extensions need a popup as entry.
*/

chrome.runtime.sendMessage({ message: "getStats" }, function(response) {
 	const badgesUI = Object.keys(response.currentTrackers).map((item, index) => {
	  return `<button type="button" class="btn btn-info">${item} <span class="badge bg-danger">${response.currentTrackers[item]}</span></button>`;
  }).join("");
  document.getElementById("badges").insertAdjacentHTML("beforeend", badgesUI);

  const trackersUI = Object.keys(response.trackersData).map((item, index) => {
  	return `
	  	<div class="card">
			<div class="card-header" id="heading${index}">
			    <button class="btn btn-link toggle" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="false" aria-controls="collapseOne">
				  	<span> ${item} </span>
			    </button>
			</div>

			<div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#trackers">
			    <div class="card-body">
					<ol>
						${response.trackersData[item].map(domain => {
							if(domain!==''){
								return `<li>${domain}</li>`
							}
						}).join("")}
					</ol>
			    </div>
			</div>
		</div>
	  `;
  }).join("");
  document.getElementById("trackers").insertAdjacentHTML("beforeend", trackersUI);
});