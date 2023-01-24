var getJob = localStorage.getItem("jobDetail");
var jobDetails = JSON.parse(getJob);

const fetchJob = `
<form id="my-form" action="http://127.0.0.1:5000/jobs/${jobDetails.id}" method="patch" enctype="multipart/form-data">
<h1>Update Job</h1>
<div class="image-wrapper">
      <img src=${jobDetails.logo} />
      <label for="logo">Select a file:</label>
      <input type="file" name="logo" id="logo">
  </div>
  <div class="detail-wrapper">
      <span>ID : ${jobDetails.id}</span>
      <span>Company : <input type="text" value="${jobDetails.company}" name ="company" id="company"></span>
      <span>Role : <input type="text" value="${jobDetails.role}" name="role" id="role"></span>
      <span>Position : <input type="text" value="${jobDetails.position}" name="position" id="position"></span>
      <span>Contract : <input type="text" value="${jobDetails.contract}" name="contract" id="contract"></span>
      <span>Featured : <select id="featured" name="featured">
            <option value="true">True</option>
            <option value="false">False</option>
            </select></span>

      <span>New : <select id="new" name="new">
          <option value="true">True</option>
          <option value="false">False</option>
        </select></span> 

      <span>Languages : <input type="text" value="${jobDetails.languages}" name="languages" id="languages"></span>
      <span>Tools :<input type="text" value="${jobDetails.tools} name="tools" id="tools"></span>
      <span>Posted At : <input type="text" value="${jobDetails.postedAt}" name="postedAt" id="time"></span>
      <span>Location : <input type="text" value="${jobDetails.location}" name="location" id="location"></span>
      <span>Level :<input type="text" value="${jobDetails.level}" name="level" id="level"></span>
  </div>
<button type="submit" id="submit" >Submit</button>
</form>
  
`

document.getElementById("renderJobDetail").innerHTML = fetchJob;