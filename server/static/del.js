var getJob = localStorage.getItem("jobDetail");
var jobDetails = JSON.parse(getJob);

const fetchJob = `
<form id="my-form" action="http://127.0.0.1:5000/jobs/${jobDetails.id}" method="delete" enctype="multipart/form-data">
<h1>Update Job</h1>
  <div class="detail-wrapper">
      <p> Would you like to delete ${jobDetails.company} and all it's related data?</p>
  </div>
<button type="submit" id="submit" >Yes</button>
<a href"./home.html" >Cancel</a>
</form>
`

document.getElementById("renderJobDetail").innerHTML = fetchJob;