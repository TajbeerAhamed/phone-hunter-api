const loadphones = (searchPhone, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container')
    phonesContainer.textContent = ''
    const showAll = document.getElementById('show-all')
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }

    const noFound = document.getElementById('no-found-msg')
    if (phones.length === 0) {
        noFound.classList.remove('d-none')
    }
    else {
        noFound.classList.add('d-none')
    }
    phonesContainer.textContent = ''
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top w-80" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <button onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
    </div>
        `
        phonesContainer.appendChild(phoneDiv)
        // console.log(phone)
    })
    toggleSpinner(false)
    // console.log(phones)
}

const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value
    loadphones(searchValue, dataLimit)
}



document.getElementById('search-btn').addEventListener('click', function () {
    processSearch(10)
})

document.getElementById('search-field').addEventListener('keypress', function (e) {
    console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(10)
    }
});



const toggleSpinner = isLoading => {
    const loadSection = document.getElementById('loader')
    if (isLoading) {
        loadSection.classList.remove('d-none')
    }
    else {
        loadSection.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch()
})


const loadPhoneDetail = id => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModalLabel')
    modalTitle.innerText = phone.name
    const phoneDetail = document.getElementById('phone-detail')
    phoneDetail.innerHTML = `
    <img src="${phone.image}">
    <p>Chipset: ${phone.mainFeatures ? phone.mainFeatures.chipSet : "No chipset found"}</p>
    <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : "No storage found"}</p>
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : "No release date found"}</p>
   
    `
}

loadphones('apple')