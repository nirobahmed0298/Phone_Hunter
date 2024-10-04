//reload 
let loadAllPhones = async (status,searchValue ="phone") => {
    document.getElementById('reload').classList.add('hidden')
    let response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    let data = await response.json();
    console.log(data.data)
    if (status) {
        displayAllPhone(data.data)
    }
    else {
        displayAllPhone(data.data.slice(0, 8))
    }
}

//Display all phones

let displayAllPhone = (phones) => {
    let phoneContainer = document.getElementById('phone_container');
    if(phones.length===0){
        phoneContainer.classList.remove('grid');
        phoneContainer.innerHTML = `
        <h1 class="text-3xl text-center font-bold text-red-500">Not Found Video!please again search</h1>
        `
    }
    else{
        phoneContainer.innerHTML = "";
        phoneContainer.classList.add('grid');

    }
    phones.forEach(phone => {
        // console.log(phone)
        let {brand,image,phone_name,slug}=phone;
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100">
            <figure>
            <img
                src=${image}
                alt="Phone's" />
            </figure>
            <div class="card-body text-center">
            <h2 class="card-title inline-block">${phone_name}</h2>
            <p>${slug}</p>
            <div class="card-actions justify-center">
                <button onclick="DetailsBtn('${slug}')"  id="details-btn" class="btn bg-green-400 text-white font-bold">Phone Details</button>
            </div>
            </div>
         </div>
        `
        phoneContainer.appendChild(div);
    });
}
//Show button
let showAllBtn = () => {
    loadAllPhones(true);
}
//details Button

let DetailsBtn = async (slug)=>{
    let response = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    let data = await response.json();
    console.log(data.data);
    let {brand,name} = data.data
    let modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML=` 
    <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
            <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 class="text-lg font-bold">${brand}</h3>
            <p class="py-4">${name}</p>
            <p class="">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
            <p class=""><span class="font-bold">Storage :</span> 128GB/256GB/1TB Storage, No card slot</p>
        </div>
    </dialog>
    ` 
    my_modal_3.showModal();

}
let handleSearch = () => {
    document.getElementById('reload').classList.remove('hidden')
    let searchValue = document.getElementById('search-box').value;
    setTimeout(function (){
        loadAllPhones(false,searchValue)
    }, 1000)
}
document.getElementById('search-box').addEventListener('keyup',function(event){
    displayAllPhone(event.target.value);
    
});
loadAllPhones();