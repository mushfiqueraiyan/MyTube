const categoriesUrl = "https://openapi.programming-hero.com/api/phero-tube/categories"

  fetch(categoriesUrl)
    .then((res)=> res.json())
        .then((data)=> categoryData(data.categories))

const categoryData =(categoriess)=>{
    const categoryContainer = document.getElementById("category-section");
    for(const category of categoriess) {

        let div = document.createElement("div")
        div.innerHTML = `

        <button onclick="loadCategoryId(${category.category_id})" class="active:bg-red-400 active:text-white py-2 px-6 hover:bg-red-400 hover:text-white bg-gray-300 rounded-lg cursor-pointer">${category.category}</button>
        
        `;
        categoryContainer.appendChild(div)
    }
}

const loadCategoryId = (id)=>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url)
    fetch(url)
        .then((res)=> res.json())
            .then((data)=> videoData(data.category))
}


const videoUrl =()=>{
     const url = "https://openapi.programming-hero.com/api/phero-tube/videos";
     fetch(url)
       .then((res) => res.json())
       .then((data) => videoData(data.videos));

}
const videoData = (videos)=>{
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = ""
    for(const video of videos){
        
        const div = document.createElement("div")
        div.classList.add("w-80")
        div.innerHTML = `
            <figure class="relative">
                <img src="${video.thumbnail}" class=" rounded-md w-full h-[150px] object-cover"/>
                <span class="bg-black text-sm text-white p-1 absolute right-3 top-28 rounded-full">3hrs 56min ago</span>
            </figure>
            <div class="flex gap-2 items-center mt-2">
            <img src ="${video.authors[0].profile_picture}" class="w-7 h-7 rounded-full "/>
            <h1 class="text-xl font-sans font-bold">${video.title}</h1>
            </div>
            <p class="my-1">${video.authors[0].profile_name}</p>
            <p class="text-sm text-gray-400">${video.others.views} views</p>


        `;
        videoContainer.appendChild(div)
    }

    if(videos.length === 0){
        videoContainer.innerHTML = `
        <h1 class = "text-2xl text-red-600 items-center font-bold flex justify-center">Kita tukaire kicchu nai!!!!!!!!</h1>
        `
    }


}

videoUrl()