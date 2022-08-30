const loadPhones = async (searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data = await  res.json()
    displayPhones(data.data , dataLimit);
    
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer =  document.getElementById('phone-container');
    phoneContainer.textContent = ``
    // display 10 phones only
    const showAll =   document.getElementById('show-all')
    if(dataLimit && phones.length > 10) {

        phones = phones.slice(0,10)
       
       showAll.classList.remove('d-none')
    } else{
        showAll.classList.add('d-none')
    }

//   display no phone found  
 const nophone = document.getElementById('noPhone-found');          
if(phones.length === 0){
      nophone.classList.remove('d-none');
     
           } else{
            nophone.classList.add('d-none')
           }
    // display all phones
    phones.forEach(phone => {
        const Phonediv = document.createElement('div')

        Phonediv.classList.add('col')
        Phonediv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick ="loasPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Detail</button>
        </div>
      </div>
        
        
        `
         phoneContainer.appendChild(Phonediv)
         
    })
    // strop loader
    toggleSpinner(false)
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit)
    // searchField.value = ''
}
//  handle search button click
document.getElementById('btn-search').addEventListener('click' , function(){
    // start loader
    processSearch(10);
})


//  search input filed enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
    //  console.log(e.key);
    if(e.key === 'Enter'){
        processSearch(10);
    }
})



const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    } 
    else{
        loaderSection.classList.add('d-none')
    }
}


//  not the best way to load all
document.getElementById('btn-show-all').addEventListener('click' , function(){
 processSearch();
})

const loasPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}


const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTittle =document.getElementById('phoneDetailModalLabel');
    modalTittle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
     <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'no release date found'}</p>
     <p>Others: ${phone.others ? phone.others.Bluetooth : "no bluetooth "}</p>
     
    `
}
loadPhones('apple')