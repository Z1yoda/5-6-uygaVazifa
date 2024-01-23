
// Selecting DOM elements
const button = document.getElementById('button');
const name = document.getElementById('name');
const price = document.getElementById('price');
const year = document.getElementById('year');
const color = document.getElementById('color');
const type = document.getElementById('type');
const desc = document.getElementById('desc');
const img = document.getElementById('img');
const form = document.getElementById('form');
const dataWrapper = document.querySelector('#datawrapper');

// Function to get data from localStorage
export function getData() {
    let data = [];

    if (localStorage.getItem('cars')) {
        data = JSON.parse(localStorage.getItem('cars'));
    }

    return data;
}

// Function to check if a string is a valid URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

function validate() {
    if (!name.value) {
        alert("Nomi kiritilishi shart!")
        name.focus()
        return false
    }
    if (name.value.trim().length < 3) {
        alert("Nomi kamida 4 ta belgidan iborat bo'lishi kerak!")
        name.focus()
        return false
    }

    if (!img.value) {
        alert("Rasmi kiritilishi shart!")
        img.focus()
        return false
    }

    if (!isValidUrl(img.value)) {
        alert("Rasm noto'g'ri kiritildi!")
        img.focus()
        return false
    }

    if (!price.value) {
        alert("Narxi kiritilishi shart!")
        price.focus()
        return false
    }

    if (price.value < 100) {
        alert("Narxi kam kiritildi!")
        price.focus()
        return false
    }

    if (!Number(price.value)) {
        alert("Narxi raqamda kiritilishi shart!")
        price.focus()
        return false
    }

    if (!type.value || type.value == "Choose car type...") {
        alert("Turi kiritilishi shart!")
        type.focus()
        return false
    }

    if (!color.value || color.value === "Choose car color...") {
        alert("Rangi kiritilishi shart!")
        color.focus()
        return false
    }

    return true
}


// Function to create a card HTML based on car data
function createCard(car) {
    return `
        <div class="card p-2 text-center" style="width: 18rem;">
            <div class=""><img src="${car.img}" class="card-img-top" style="width: 250px; height: 250px;"></div>
            <div class="card-body text-center">
                <h3 class="card-title">${car.name}</h3>
                <h6 class="card-text">${car.price}$</h6>
                <h6 class="card-text">${car.color}</h6>
                <h6 class="card-text">${car.year}</h6>
                <h6 class="card-text">${car.type}</h6>
                <p>${car.desc}</p>
                <button data-id="data_${car.id}" class="btn btn-info more">Batafsil</button>
            </div>
        </div>`;
}

// Event listener for the form submission
button && button.addEventListener('click', function (e) {
    e.preventDefault();
    if (validate()) {
        let car = {
            name: name.value,
            price: price.value,
            year: year.value,
            color: color.value,
            img: img.value,
            desc: desc.value,
            type: type.value,
            status: 'active',
            id: Date.now()
        };

        let data = getData();
        data.push(car);
        localStorage.setItem('cars', JSON.stringify(data));

        let card = createCard(car);
        dataWrapper.innerHTML += card;

        form.reset();

    } else {
        console.log("Validation failed");
    }
});

// Event listener for the page load
document.addEventListener('DOMContentLoaded', function () {
    let cars = getData();
    cars.length && cars.forEach(car => {
        let card = createCard(car);
        dataWrapper.innerHTML += card;
    });

    let moreButtons = document.querySelectorAll('button.more');
    moreButtons.length && moreButtons.forEach(more => {
        more && more.addEventListener('click', function () {
            let id = this.getAttribute('data-id').substring(5);
            if (id) {
                let domain = window.location.href.substring(0, window.location.href.search('index'));
                window.location.assign(`${domain}pages/about.html?id=${id}`);
            }
        });
    });
});
