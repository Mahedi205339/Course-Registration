handleCategory = async () => {
    const response = await fetch(" https://openapi.programming-hero.com/api/videos/categories")
    const data = await response.json()

    const tabContainer = document.getElementById("tab-container")
    const trimedData = data.data
    trimedData.forEach((category) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <a onclick="handleLoadVideos(${category.category_id})" class="tab bg-red-600 text-white hover:bg-white hover:text-red-600 font-semibold ">${category.category}</a
        `
        tabContainer.appendChild(div)

    })

}

const handleLoadVideos = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json()
    console.log(data.status)
    if (data.status !== false) {
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = ""

        data.data.forEach((videos) => {
            const div = document.createElement('div')
            div.classList.add('grid')

            const publishTime = videos.others?.posted_date
            function times(seconds) {
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const Seconds = seconds % 60;

                return {
                    hours: hours,
                    minutes: minutes,
                    seconds: Seconds
                };
            }
            const time = times(publishTime)

            div.innerHTML = `
        <div class="card md:w-72 lg:w-96 
        bg-base-100 ">
            <figure><img src="${videos.thumbnail}"/></figure>

            <p class="text-white bg-gray-700 w-48 ml-20 -mt-10">
        ${`hrs: ${time.hours},min: ${time.minutes}, sec: ${time.seconds}`}
            </p>
            <div class="card-body">
              <div class="flex  gap-4">
                <img class="w-12 rounded-full" src="${videos?.authors[0].profile_picture}" alt="">
                <h2 class="card-title">${videos.title}</h2>
              </div>
              <div class="text-gray-500">
                <p>${videos?.authors[0].profile_name}
                </p>
                <p>${videos.others?.views} views</p>
              </div>

            </div>
        `
            cardContainer.appendChild(div)
        })
    }
    else {
        const noCardContainer = document.getElementById('card-container')
        noCardContainer.innerHTML = ""
        const div = document.createElement('div')
        div.classList.add('flex')
        div.classList.add('flex-col')
        div.classList.add('justify-center')
        div.classList.add('items-center')
        div.classList.add('mt-20')

        div.innerHTML = `
        <img class=" my-5 l" src="logos/icon.png"/>
        <h1 class="text-center text-xl md:text-3xl lg:text-5x">Oops!! Sorry, There is no content here</h1>
    `
        noCardContainer.appendChild(div)
    }


}
handleLoadVideos("1000")
handleCategory()

handleBlogAns =()=>{
    window.location.href='blog.html'
}