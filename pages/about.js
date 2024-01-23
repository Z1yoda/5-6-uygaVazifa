import { getData } from "../index.js"

const name = document.getElementById('name')
const price = document.getElementById('price')
const color = document.getElementById('color')
const year = document.getElementById('year')
const desc = document.getElementById('desc')
const type = document.getElementById('type')
const img = document.getElementById('img')
const del = document.getElementById('delete')
const edit = document.getElementById('edit')


let elId
document.addEventListener('DOMContentLoaded', function () {
    let urlIndex = window.location.href.search('id=')
    if (urlIndex > 0) {
        elId = window.location.href.substring(urlIndex + 3)
        if (elId) {
            let data = getData()
            let car = data.find(el => {
                return el.id == elId
            })

            name.innerHTML = car.name
            price.innerHTML = car.price
            year.innerHTML = car.year
            desc.innerHTML = car.desc
            type.innerHTML = car.type
            color.innerHTML = car.color
            img.setAttribute('src', car.img) = car.img

            console.log(car);
        } else {
            window.location.assign("file:///C:/Users/ACER/Desktop/5-6-uygaVazifa/index.html")
        }
    }

})

del && del.addEventListener('click', function () {
    let isDelete = confirm('Are you sure?')

    if (isDelete) {
        let data = getData()
        data = data.filter(car => {
            return car.id != elId
        })
        localStorage.setItem('cars', JSON.stringify(data))
        window.location.assign('http://127.0.0.1:5500/index.html')
    }

})



edit && edit.addEventListener('click', function () {
    let isUpdate = confirm('Are you sure')

    // let id = window.location.href.search('id=')

    if (isUpdate) {
        let domain = window.location.href.substring(0, window.location.href.search('about'));
        window.location.assign(`${domain}update.html`);

    }
})