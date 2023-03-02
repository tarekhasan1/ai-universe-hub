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
                    <button onclick="loadAiDetails('${element.id}')" class="btn btn-danger">details</button>
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
}

loadData(6);