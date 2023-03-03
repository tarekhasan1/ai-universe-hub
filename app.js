const loadData = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    // display spinner
    toggleSpinner(true);
    displayData(data.data.tools, dataLimit);
}

const displayData = (ai, dataLimit) =>{
    const aiContainer = document.getElementById('ai-container');
    aiContainer.innerHTML = '';
    if(dataLimit){
        document.getElementById('see-more-btn').classList.remove('d-none');
        ai = ai.slice(0,6);
    }
    else{
        document.getElementById('see-more-btn').classList.add('d-none');
    }
    for(const element of ai){
        console.log(element);
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="col">
                  <div class="card h-100">
                      <div class="p-4 h-50"><img src="${element.image}" class="card-img-top w-100 h-100" style="border-radius: 25px; min-height: 300px" alt="...">
                      </div>
                      <div class="card-body">
                      <h3>Features</h3>
                      <ol>
                      <li>${element.features[0]}</li>
                      <li>${element.features[1]}</li>
                      <li>${element.features[2]}</li>
                      </ol>
                    </div>
                    <div class="row d-flex mx-2">
                    <hr>
                    <div class="col">
                    <h5 class="card-title my-3">${element.name}</h5>
                    <p><i class="fa-regular fa-calendar-days"></i> ${element.published_in}</p>
                    </div>
                    <div class="col text-end my-auto">
                    <button onclick="loadAiDetails('${element.id}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#aiUniverse"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                    </div>
                  </div>
                </div>
        `
        aiContainer.appendChild(newDiv);
    }
    toggleSpinner(false);
}

const toggleSpinner = isLoading => {
    const spinner = document.getElementById('loader');
    if(isLoading){
        spinner.classList.remove('d-none');
        console.log('spinning');
    }
    else{
        spinner.classList.add('d-none');
        console.log('spinner off');
    }
}

const seeMoreBtn = document.getElementById('see-more-btn').addEventListener('click', function(id){
    loadData();
})


const loadAiDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDescription(data.data);
}

const displayDescription = details =>{
    console.log(details);
    const modalBody = document.getElementById('ai-universe-modal');
    modalBody.innerHTML = '';
    const newModalDiv = document.createElement('div');
    newModalDiv.classList.add('row', 'mx-3', 'p-5');
    newModalDiv.innerHTML =`
    <div class="col rounded-3 bg-danger-subtle border border-danger me-2 me-md-3">
                    <h4 class="my-3">${details.description}</h4>
          <div class="row mx-1 mb-3">
            <div class="col border me-3 rounded-3 bg-white d-flex justify-content-center align-items-center p-2">
                <p><span>$10</span>/<br>month <br> Basic</p>
            </div>
            <div class="col border me-3 rounded-3 bg-white d-flex justify-content-center align-items-center p-2">
                <p><span>$15</span>/<br>month <br>Pro</p>
            </div>
            <div class="col border me-3 rounded-3 bg-white d-flex justify-content-center align-items-center p-2">
                <p><span>$15</span><br>Enterprise</p>
            </div>
          </div>
          <div class="row  mx-3 mx-auto mb-3">
            <div class="col">
                <h4>Features</h4>
                <ul>
                    <li>${details.features[1].feature_name}</li>
                    <li>${details.features[2].feature_name}</li>
                    <li>${details.features[3].feature_name}</li>
                </ul>
            </div>
            <div class="col">
                <h4>Integration</h4>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
          </div>
                </div>
                <div class="col rounded-3 border border-dark-subtle">
                    <div>
                        <img src="..." alt="">
                    </div>
                    <h4>hello</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, inventore!</p>
                </div>
    `;
    modalBody.appendChild(newModalDiv);
}

loadData(6);