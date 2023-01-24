let formData = document.getElementById("searches");
let searchBox = document.getElementById("search");
let activeFilters = document.getElementById("active-filters");
let filterTexts = [];
let searchResult = ''

const fetchData = async () => {
  var DataAPI = "./client/data.json";
  const _response = await fetch(DataAPI);
  const _responsedata = await _response.json();
  try {
    const response = await fetch(DataAPI);
    const responsedata = await response.json();
    if (response.status === 200) {
      var allData = responsedata;
      console.log("all Data", allData);

      const DataRenderToHTML = allData
        .map((job) => {
          return `
          <div class="listing-wrapper" id="listing">
            <div class="job-details">
              <div class="items">
                <img src=${job.logo} alt="company logo" />
                <div class="texts">
                  <span class="toptags">
                    <span class="company">${job.company}</span>
                    ${job.new === true ? `<span class="new">NEW!</span>` : ``}
                    ${job.featured === true ? `<span class="featured">FEATURED</span>` : ``}
                  </span>
                  <span class="position">
                    ${job.position}
                  </span>
                  <span class="btags">
                    ${job.postedAt} . ${job.contract} . ${job.location} 
                  </span> 
                </div>
              </div>
              <div class="role">
                <span class="writing">${job.role}</span>
                <span class="writing"> ${job.level}</span>
                ${job.languages.map((language) => {
            return `<span class="writing">${language}</span>`
          }).join(" ")}
                ${job.tools.map((tool) => {
            return `<span class="writing">${tool}</span>`
          }).join(" ")}
              </div>
            </div>
          </div>  
            `;
        })
        .join("");

      document.getElementById("main").innerHTML =
        DataRenderToHTML;
    } else {
      document.getElementById("main").innerHTML =
        response.statusText;
      console.log("'Something else occured", response);
    }
  } catch (error) {
    document.getElementById("main").innerHTML =
      error.message;
    console.log("error here-->", error);
  }

  //search for jobs
  let listingInstance = document.querySelectorAll(".listing-wrapper");

  function liveSearch() {
    let search_query = document.getElementById("search").value;
    //Use innerText if all contents are visible
    //Use textContent for including hidden elements
    for (var i = 0; i < listingInstance.length; i++) {
      if (listingInstance[i].textContent.toLowerCase()
        .includes(search_query.toLowerCase())) {
        // listingInstance[i].style.display = "initial";
      } else {
        listingInstance[i].style.display = "none";
      }
    }
  }

  searchBox.addEventListener('keyup', (e) => {
    liveSearch();
  });

  // append texts into an array when you hit enter

  formData.addEventListener("submit", (e, index) => {
    e.preventDefault();
    filterTexts.push({ val: searchBox.value });
    console.log(">>>>>>>>", filterTexts);

    searchResult = filterTexts.map((filter, index) => {
      return `<span class="filters" id="${index}" key=${index + 1}>
              <span class="filter-text" id="filter-text">${filter.val}</span>
              <button class="x"  onclick="clearActiveFilter(${index})">X</button>
            </span>`
    }).join(" ");
    activeFilters.innerHTML = searchResult;
    liveSearch();
    // console.log("Response", _responsedata)
    // const checkActiveFilters = filterTexts.map(({ active_filter }) => active_filter);

    // const matchedJobFilters = _responsedata.filter((
    //    { role }, { level }) => checkActiveFilters.includes( role, level));
    //   console.log("matched", matchedJobFilters);
  });

};

fetchData();

function clearActiveFilters() {
  document.getElementById("active-filters").innerHTML = '';
  filterTexts = [];
  listingWrapper = document.querySelectorAll(".listing-wrapper");
  [...listingWrapper].forEach(l => l.style.display = "initial");
}

function clearActiveFilter(index){
  document.getElementById(index).innerHTML='';
  // [...filterList.children].forEach(c => filterList.removeChild(c));
}