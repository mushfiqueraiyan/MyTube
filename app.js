const categoriesUrl = "https://openapi.programming-hero.com/api/phero-tube/categories"

  fetch(categoriesUrl)
    .then((res)=> res.json())
        .then((data)=> categoryData(data.categories))

const categoryData =(categoriess)=>{
    const categoryContainer = document.getElementById("category-section");
    for(const category of categoriess) {

        let div = document.createElement("div")
        div.innerHTML = `

        <button id="btn-${category.category_id}" onclick="loadCategoryId(${category.category_id})" class="active:bg-red-400 active:text-white py-2 px-6 hover:bg-red-400 hover:text-white bg-gray-300 rounded-lg cursor-pointer">${category.category}</button>
        
        `;
        categoryContainer.appendChild(div)
    }
}

const removeActiveClass = ()=>{
    const activeButtons = document.getElementsByClassName("bg-red-400", "text-white", "py-2", "px-6")
    for(const btn of activeButtons){
        btn.classList.remove("bg-red-400", "text-white", "py-2", "px-6");
        btn.classList.add("bg-gray-300", "text-black", "py-2", "px-6");
    }

}

const loadCategoryId = (id)=>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    // console.log(url)
    fetch(url)
        .then((res)=> res.json())
            .then((data)=> {
                removeActiveClass()
                const clickedBtn = document.getElementById(`btn-${id}`)
                // console.log(clickedBtn)
                clickedBtn.classList.add(
                  "bg-red-400", "text-white", "py-2", "px-6"
                );
                videoData(data.category);
            })
}

const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    // console.log(url)
    fetch(url)
        .then((res)=> res.json())
            .then((data)=>{
                loadDetails(data.video)
            })

};

const loadDetails = (details)=>{
    // console.log(details)
    document.getElementById("video_details").showModal()
    const detailsContainer = document.getElementById("details-container");

    detailsContainer.innerHTML = `
   <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${details.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${details.title}</h2>
    <p>${details.description}</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>
  `;
}


const videoUrl =(search="")=>{
     const url = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`;
     console.log(url)
     fetch(url)
       .then((res) => res.json())
       .then((data) => {
        removeActiveClass()
        document
          .getElementById("btn-all")
          .classList.add("bg-red-400", "text-white", "py-2", "px-6");
        videoData(data.videos);
       });

}
const videoData = (videos)=>{
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = ""
    for(const video of videos){
        // console.log(video)
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
            <p class="my-1">${video.authors[0].profile_name}
            ${video.authors[0].verified ? "✅" : ""}
            </p>
            <p class="text-sm text-gray-400">${video.others.views} views</p>

            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
        `;
        videoContainer.appendChild(div)
    }


    if(videos.length === 0){
        videoContainer.innerHTML = `
        <h1 class = "text-2xl text-red-600 items-center font-bold flex justify-center">Kita tukaire kicchu nai!!!!!!!!</h1>
        `
    }

}

document.getElementById("search").addEventListener("keyup", (e)=>{
    const inputT = e.target.value;
    // console.log(inputT);
    videoUrl(inputT);
})


videoUrl()