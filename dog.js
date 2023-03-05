const breeds = document.querySelector(".breeds")
const breedsImg = document.querySelector(".breed-img")
const btn = document.querySelector(".search-btn")
const select = document.querySelector(".select-dog")
const input = document.querySelector(".search-input")


function fetchAll(){
    axios.get(`https://dog.ceo/api/breeds/list/all`)
        .then((res)=> {
            Object.keys(res.data.message).map(el => {
                // breeds.innerHTML += `<button class="breed-btn btn btn-primary m-1">${el}</button>`
                select.innerHTML += `<option value="${el}">${el}</option>`
            })

        })
        .then(() => getBtn())
}
fetchAll()

function getBtn(){
    const buttons = document.querySelectorAll(".breed-btn")
    buttons.forEach(btn => {
        btn.addEventListener("click",() => {
            fetchImg(btn.innerHTML)
        })
    })
}

function fetchImg(API){
    axios(`https://dog.ceo/api/breed/${API}/images/random`)
        .then(res => {
            breedsImg.innerHTML = `<img src="${res.data.message}" alt="" class="card" style="width: auto;margin: 0 auto">`
        })
}

btn.addEventListener("click", () => {
    fetchImg(`${input.value.trim()}`)
})

select.addEventListener("change", (e) => {
    fetchImg(e.target.value.trim())
})

input.addEventListener("keydown",(e) => {
    if (e.key === "Enter"){
        fetchImg(e.target.value.trim())
    }
})

// input.addEventListener("input",(e) => {
//     fetchImg(e.target.value.trim())
// })