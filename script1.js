document.addEventListener('DOMContentLoaded', function() {
    const postsDiv = document.getElementById('posts');
    const postForm = document.getElementById('postForm');
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    displayPosts();
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;

        if (title && content) {
            const post = { title, content };
            posts.push(post);
            savePosts();
            displayPosts();
            postForm.reset();
        } else {
            alert('Please enter both title and content.');
        }
    });
    function displayPosts() {
        postsDiv.innerHTML = '';
        posts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <button onclick="deletePost(${index})">Delete</button>
            `;
            postsDiv.appendChild(postDiv);
        });
    }
    function savePosts() {
        localStorage.setItem('posts', JSON.stringify(posts));
    }
    window.deletePost = function(index) {
        if (confirm('Are you sure you want to delete this post?')) {
            posts.splice(index, 1);
            savePosts();
            displayPosts();
        }
    };
});
