const users =  document.querySelector(".users")


axios(`https://jsonplaceholder.typicode.com/users`)
.then((res) => {
    console.log(res.data)
    res.data.map((el) => (
        users.innerHTML += `<div class="user">
<img src="./img/user.png" class="card my-4 py-2 mx-2 d-flex flex-wrap nav-fill gap-2 p-1 small bg-light rounded-5 shadow-sm" style="width: 400px"" alt="">
<div class="mx-4">
<h4>${el.name}</h4>
<h5>${el.email}</h5>
</div>
</div>`
    ))
})