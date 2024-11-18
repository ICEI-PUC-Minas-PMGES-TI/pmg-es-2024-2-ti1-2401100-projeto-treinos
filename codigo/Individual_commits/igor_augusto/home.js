
function toggleLike(button) {
    const likeIcon = button.querySelector('i');
    const likeCount = button.querySelector('span');
    let count = parseInt(likeCount.textContent);

    if (likeIcon.classList.contains('far')) {
        likeIcon.classList.remove('far');
        likeIcon.classList.add('fas');
        count++;
    } else {
        likeIcon.classList.remove('fas');
        likeIcon.classList.add('far');
        count--;
    }

    likeCount.textContent = count;
}

function loadMorePosts() {
    const feedContainer = document.getElementById('feed');
    const initialPostCount = feedContainer.children.length;
    for (let i = initialPostCount + 1; i <= initialPostCount + 3; i++) {
        const postDiv = document.createElement('div');
        postDiv.className = 'bg-gray-300 h-40 mb-4 rounded-lg p-4 flex flex-col justify-between';
        postDiv.innerHTML = `
            <p>Post ${i}</p>
            <button class="text-black" onclick="toggleLike(this)">
                <i class="far fa-thumbs-up"></i> <span>0</span> Likes
            </button>
        `;
        feedContainer.appendChild(postDiv);
    }
    adjustBoxHeight();
}

function adjustBoxHeight() {
    const box = document.getElementById('meio');
    const feedContainer = document.getElementById('feed');
    const lastPost = feedContainer.lastElementChild;
    const lastPostBottom = lastPost.getBoundingClientRect().bottom;
    const boxBottom = box.getBoundingClientRect().bottom;
    const additionalHeight = lastPostBottom - boxBottom + 20; 
    if (additionalHeight > 0) {
        box.style.height = `${box.offsetHeight + additionalHeight}px`;
    }
}

function addPost(event) {
    event.preventDefault();
    const postContent = document.getElementById('postContent').value;
    if (postContent.trim() === '') return;

    const feedContainer = document.getElementById('feed');
    const postDiv = document.createElement('div');
    postDiv.className = 'bg-gray-300 h-40 mb-4 rounded-lg p-4 flex flex-col justify-between';
    postDiv.innerHTML = `
        <p>${postContent}</p>
        <button class="text-black" onclick="toggleLike(this)">
            <i class="far fa-thumbs-up"></i> <span>0</span> Likes
        </button>
    `;
    feedContainer.insertBefore(postDiv, feedContainer.firstChild);
    document.getElementById('postContent').value = '';
    adjustBoxHeight();
    savePosts();
}

function savePosts() {
    const feedContainer = document.getElementById('feed');
    const posts = [];
    feedContainer.childNodes.forEach(postDiv => {
        const postContent = postDiv.querySelector('p').textContent;
        const likeCount = postDiv.querySelector('span').textContent;
        posts.push({ content: postContent, likes: likeCount });
    });
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const feedContainer = document.getElementById('feed');
    savedPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'bg-gray-300 h-40 mb-4 rounded-lg p-4 flex flex-col justify-between';
        postDiv.innerHTML = `
            <p>${post.content}</p>
            <button class="text-black" onclick="toggleLike(this)">
                <i class="far fa-thumbs-up"></i> <span>${post.likes}</span> Likes
            </button>
        `;
        feedContainer.appendChild(postDiv);
    });
    adjustBoxHeight();
}

document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    const postContent = document.getElementById('postContent');
    postContent.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            addPost(event);
        }
    });
});
