const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")
const row = document.querySelector(".row")
const slSort =  document.querySelector(".select-sort")
const rgSort =  document.querySelector(".select-reg")

axios(`https://restcountries.com/v2/all`)
.then((task) => {
    console.log(task.data)
    task.data.map((el) => {
        row.innerHTML += `<div class="card my-4 py-4 px-4 mx-2 d-flex flex-wrap nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm" style="width: 400px">
<img src="${el.flags.svg}"  alt="">
<h1>${el.name}</h1>
<h2>${el.capital}</h2>
<h2>${el.area}<sup>2</sup></h2>
<h2>${el.region}</h2>
<h2>${el.population}</h2>
</div>`
    })
})

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        task(`name/${searchInput.value}`)
    }
})
searchInput.addEventListener("input", (e) => [
    task(`name/${e.target.value}`)
])
searchBtn.addEventListener("click", () => {
    task(`name/${searchInput.value}`)
})

function task(API) {
    axios(`https://restcountries.com/v3.1/${API}`)
.then((res) => {
        all = res.data
        get(res.data)
    })
}
task("all")
function get(data) {
    window.scroll(0,0)
    row.innerHTML = ""
    data.map((el) => {
        row.innerHTML += `<div class="card my-4 py-2 mx-2 d-flex flex-wrap nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm" style="width: 400px">
<img src="${el.flags.svg}" alt="">
<h1>${el.name.common}</h1>
<h2>${el.capital}</h2>
<h2>${el.area}<sup>2</sup></h2>
<h2>${el.region}</h2>
<h2>${el.population}</h2>
</div>`
    })
}

let all = null

slSort.addEventListener("change", (e) => {
    const value = e.target.value
    if (value === "population") {
        const result =  all.sort((a,b) => {
            return  b.population - a.population
        })
        get(result)
    } else if (value === "area") {
        const result =  all.sort((a,b) => {
            return  b.area - a.area
        })
        get(result)
    } else if (value === "A-Z") {
        const result =  all.sort((a,b) => {
            if (b.name.common[0] > a.name.common[0]){
                return -1
            } else if (b.name.common[0] < a.name.common[0]) {
                return 1
            }
        })
        get(result)
    } else if (value === "Z-A") {
        const result =  all.sort((a,b) => {
            if (b.name.common[0] > a.name.common[0]){
                return 1
            } else if (b.name.common[0] < a.name.common[0]) {
                return -1
            }
        })
        get(result)
    }
})


rgSort.addEventListener("change", (e) => {
    const slValue = e.target.value
    if (slValue === "europe") {
        const res = all.filter((el) => {
            return el.region === "Europe"
        })
        get(res)
    }  else if (slValue === "asia") {
        const res = all.filter((el) => {
            return el.region === "Asia"
        })
        get(res)
    } else if (slValue === "oceania") {
        const res = all.filter((el) => {
            return el.region === "Oceania"
        })
        get(res)
    } else if (slValue === "africa") {
        const res = all.filter((el) => {
            return el.region === "Africa"
        })
        get(res)
    }
})

