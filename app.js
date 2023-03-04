const loadData = async(dataLimit) => {
    // spinner start
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
    sortByDate(data.data.tools);
}

function sortByDate(arr){
    const newArray = arr.map(obj =>{
        return{...obj, published_in: new Date(obj.published_in)};
    });
    const tempArray = [...newArray];

    const sortedAsc = tempArray.sort((objA, objB) =>
    Number(objA.published_in)- Number(objB.published_in));

    const formattedSortedAsc = sortedAsc.map(obj =>{
        const options = {day: 'numeric', month: 'numeric', year: 'numeric'};
        return{...obj, published_in: obj.published_in.toLocaleString('en-US', options)};
    });

    const sortButton = document.getElementById('sort-card-btn');
    const seeMoreBtn = document.getElementById('see-more-btn');
    let sortbuttonClicked = false;
    let seeMoreBtnClicked = false;

    // see more btn event
    seeMoreBtn.addEventListener('click', function(){
        toggleSpinner(true);
        displayData(arr);
    })

    // sort by date btn event
    sortButton.addEventListener('click', function(){
        sortButton.style.backgroundColor = 'gray';
        sortbuttonClicked = true;
        if(sortbuttonClicked === true && seeMoreBtnClicked == false){
            toggleSpinner(true);
            displaySorted(formattedSortedAsc, 6);
        }
        // sort by date and see more btn event
        seeMoreBtn.addEventListener('click', function(){
            seeMoreBtnClicked = true;
            if(sortbuttonClicked === true && seeMoreBtnClicked === true){
                toggleSpinner(true);
                displaySorted(formattedSortedAsc);
            }
        })
    });
}


// add list item on cards feature
function addList(items){
    let list = "";
    if(Array.isArray(items) && items.length > 0){
        items.forEach((text)=>{
            list += `<li>${text}</li>`;
        })
    }
    return list;
}

// function for displaying data on card
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
        // console.log(element);
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="col">
                  <div class="card h-100">
                      <div class="p-4 h-50"><img src="${element.image}" class="card-img-top w-100 h-100" style="border-radius: 25px; min-height: 300px" alt="...">
                      </div>
                      <div class="card-body">
                      <h3>Features</h3>
                      <ol id="ai-card-features-${element.id}">
                        ${addList(element.features)}
                      </ol>
                    </div>
                    <div class="row d-flex mx-2">
                    <hr>
                    <div class="col">
                    <h5 class="card-title my-3">${element.name}</h5>
                    <p><i class="fa-regular fa-calendar-days"></i> ${element.published_in}</p>
                    </div>
                    <div class="col text-end my-auto">
                    <button onclick="loadAiDetails('${element.id}')" class="btn btn-danger rounded-5" data-bs-toggle="modal" data-bs-target="#aiUniverse"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                    </div>
                  </div>
                </div>
        `
        aiContainer.appendChild(newDiv);
    }
    toggleSpinner(false);
}

// toggleSpinner
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

// function used for display sorted or unsorted array
function displaySorted(arr, dataLimit){
        if(dataLimit){
            displayData(arr, dataLimit);
        }
            else{
                displayData(arr);
            }
}

// fetching data by id
const loadAiDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDescription(data.data);
    features(data.data.features);
    gettingAccuracy(data.data);
    integrations(data.data.integrations);
}


// function for displaying modal description
const displayDescription = details =>{
    const modalBody = document.getElementById('ai-universe-modal');
    modalBody.innerHTML = '';
    const newModalDiv = document.createElement('div');
    newModalDiv.classList.add('row', 'mx-3', 'p-2', 'p-md-5');
    newModalDiv.innerHTML =`
    <div class="col rounded-3 bg-danger-subtle border border-danger mb-3 me-2 me-md-3">
                    <h4 class="my-3">${details.description}</h4>
          <div class="row mx-1 mb-3">
            <div class="col border me-3 rounded-3 bg-white d-flex justify-content-center align-items-center p-2">
                <p class="text-center text-success fw-bolder">${details.pricing ? details.pricing[0].price: 'Free of cost/'}<br>${details.pricing ? details.pricing[0].plan: 'Basic'}</p>
            </div>
            <div class="col border me-3 rounded-3 bg-white d-flex justify-content-center align-items-center p-2">
                <p class="text-center text-danger fw-bolder">${details.pricing ? details.pricing[1].price: 'Free of cost/'}<br>${details.pricing ? details.pricing[1].plan: 'Pro'}</p>
            </div>
            <div class="col border me-3 rounded-3 bg-white d-flex justify-content-center align-items-center p-2">
                <p class="text-center text-danger-emphasis fw-bolder">${details.pricing ? details.pricing[2].price: 'Free of cost/'}<br>${details.pricing ? details.pricing[2].plan: 'Enterprise'}</p>
            </div>
          </div>
          <div class="row  mx-3 mx-auto">
            <div class="col ">
                <h4>Features</h4>
                <ul id="ai-universe-features">
                </ul>
            </div>
            <div class="col">
                <h4>Integration</h4>
                <ul id="ai-universe-integrations">
                </ul>
            </div>
          </div>
                </div>
                <div class="col rounded-3 border border-dark-subtle order-xs-first order-sm-last mb-3 me-2 me-md-3">
                    <div class="mt-3 m-md-3 position-relative">
                        <img class="img-fluid rounded-3" src="${details.image_link[0]}" alt="">
                        <div id="ai-universe-accuracy" class="position-absolute top-0 end-0 bg-danger my-2 me-2 rounded-1">
                        
                        </div>
                    </div>
                    <div class="p-3 mx-auto">
                    <h4 class="text-center">${details.input_output_examples ? details.input_output_examples[0].input: 'Can You Give Any Example?'}</h4>
                    <p class="text-center mt-3">${details.input_output_examples ? details.input_output_examples[0].output : 'No, Not Yet. Take A Break!'}</p>
                    </div>
                </div>
    `;
    modalBody.appendChild(newModalDiv);
}

// for making unordered features list on modal body
function features(list){
    const featuresContainer = document.getElementById('ai-universe-features');
    for(const key in list){
        const value = list[key];
        const newLi = document.createElement('li');
        newLi.innerText = value.feature_name;
        featuresContainer.appendChild(newLi);
    }
}


// for making unordered integrations list on modal body
function integrations(params){
    const integrationsContainer = document.getElementById('ai-universe-integrations');
    if(params){
        for(const param of params){
            const newLi = document.createElement('li');
            newLi.innerText = param;
            integrationsContainer.appendChild(newLi);
        }
    }
    else{
        integrationsContainer.innerText = 'Not Found';
    }
}


// showing accuracy in the top of the modal body image
function gettingAccuracy(info){
    const accuracyContainer = document.getElementById('ai-universe-accuracy');
    if(info.accuracy.score){
        accuracyContainer.innerHTML = `
    <span class="mx-2 text-white">
    ${info.accuracy.score*100}% Accuracy
    </span>
    `
    }
    else{
        accuracyContainer.classList.add('d-none');
    }
}

// getting default value
loadData(6);