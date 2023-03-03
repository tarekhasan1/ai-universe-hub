const loadData = async(dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    // display spinner
    toggleSpinner(true);
    // console.log(data.data.tools);
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
    console.log(data);
    displayDescription(data.data);
}

const displayDescription = details =>{
    console.log(details);
    const modalBody = document.getElementById('ai-universe-modal');
    modalBody.innerHTML = '';
    const newModalDiv = document.createElement('div');
    newModalDiv.classList.add('row', 'mx-3', 'p-2', 'p-md-5');
    newModalDiv.innerHTML =`
    <div class="col rounded-3 bg-danger-subtle border border-danger mb-3 me-2 me-md-3">
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
          <div class="row  mx-3 mx-auto">
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
                <ul id="ai-universe-integrations" onload="integrations(${details.integrations})">
                </ul>
            </div>
          </div>
                </div>
                <div class="col rounded-3 border border-dark-subtle order-first order-sm-last mb-3 me-2 me-md-3">
                    <div class="mt-3 m-md-3">
                        <img class="img-fluid rounded-3" src="${details.image_link[0]}" alt="">
                    </div>
                    <div class="p-3 mx-auto">
                    <h4 class="text-center">${details.input_output_examples ? details.input_output_examples[0].input: 'Can You Give Any Example?'}</h4>
                    <p class="text-center mt-3">${details.input_output_examples ? details.input_output_examples[0].output : 'No, Not Yet. Take A Break!'}</p>
                    </div>
                </div>
    `;
    modalBody.appendChild(newModalDiv);
}


const integrations = (param) =>{
    const integrationsContainer = document.getElementById('ai-universe-integrations');
    console.log(integrationsContainer);
    if(param){
        const elements = param;
        for(const element of elements){
            let newLi = document.createElement('li');
            newLi.innerText = element;
            // console.log(element);
            // console.log(newLi);
            // integrationsContainer.appendChild(newLi);
        }
        // liContainer.appendChild(newLi);
    }
    else{
        integrationsContainer.innerText = 'Not Found';
    }
}


loadData(6);