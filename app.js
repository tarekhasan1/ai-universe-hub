const loadData = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    // display spinner
    toggleSpinner(true);
    displayData(data.data.tools);
}

const displayData = (ai) =>{
    const aiContainer = document.getElementById('ai-container');
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
                    <button class="btn btn-danger">details</button>
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

loadData();