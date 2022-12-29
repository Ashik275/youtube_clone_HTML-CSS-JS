const videoCardContainer = document.querySelector('.video-container');

// AIzaSyBrBAnrJoSocJanvJty9luzjrsffRmqv-E
let api_key="AIzaSyBrBAnrJoSocJanvJty9luzjrsffRmqv-E";
let video_http="https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}


const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video">
        <a href="javascript:void(0)"  onclick="shoeYT('${data.id}')">
        <img src="${data.snippet.thumbnails.high.url}"  class="thumbnail" alt="">
        </a>
        
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}
const shoeYT=(id)=>{
 let html=`<iframe class="responsive-iframe"  style="border:none; margin-left:260px;" width="1000" height="600" src="https://www.youtube.com/embed/${id}?autoplay=1" title="Build and Deploy a Fully Responsive Website with Modern UI/UX in React JS with Tailwind" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
 document.getElementById('show-youtube').innerHTML=html;
}



const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})