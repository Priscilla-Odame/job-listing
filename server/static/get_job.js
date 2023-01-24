var getJob = localStorage.getItem("jobDetail");
var jobDetails = JSON.parse(getJob);

const fetchJob = `
  <div class="image-wrapper">
      <img src=${jobDetails.logo} />
  </div>
  <div class="detail-wrapper">
      <span>ID : ${jobDetails.id}</span>
      <span>Company : ${jobDetails.id}</span>
      <span>Role : ${jobDetails.id}</span>
      <span>Position : ${jobDetails.id}</span>
      <span>Contract : ${jobDetails.id}</span>
      <span>Featured : ${jobDetails.id}</span>
      <span>New : ${jobDetails.id}</span> 
      <span>Languages : ${jobDetails.id}</span>
      <span>Tools : ${jobDetails.id}</span>
      <span>Posted At : ${jobDetails.id}</span>
      <span>Location : ${jobDetails.id}</span>
      <span>Level : ${jobDetails.id}</span>
  </div>
`

document.getElementById("renderJobDetail").innerHTML = fetchJob;