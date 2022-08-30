const loadphones = (searchPhone) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container')
    phones = phones.slice(0, 10)
    const noFound = document.getElementById('no-found-msg')
    if (phones.length === 0) {
        noFound.classList.remove('d-none')
    }
    else {
        noFound.classList.add('d-none')
    }
    phonesContainer.innerText = ''
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top w-80" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>
        </div>
    </div>
        `
        phonesContainer.appendChild(phoneDiv)
        console.log(phone)
    })
    // console.log(phones)
}

document.getElementById('search-btn').addEventListener('click', function () {
    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value
    loadphones(searchValue)
})

loadphones()