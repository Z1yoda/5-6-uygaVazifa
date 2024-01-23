import { getData } from "../index.js";

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

document.addEventListener('DOMContentLoaded', function () {

    let data = getData()

    name.value = data[0].name
    price.value = data[0].price
    year.value = data[0].year
    color.value = data[0].color
    type.value = data[0].type
    desc.value = data[0].desc
    img.value = data[0].img
})

button && button.addEventListener('click', function () {
    // let domain = window.location.href.substring(0, window.location.href.search('update'));
    // window.location.assign(`${domain}about.html?id=${id}`);
    // console.log(domain)
    console.log(window.location.href);
})