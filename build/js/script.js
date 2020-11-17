//const { reset } = require("browser-sync");

let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

//const regExpValidEmail = /^\w+@\w+\.\w{2,}$/

const loginElem = document.querySelector('.login')
const loginForm = document.querySelector('.login-form')
const emailInput = document.querySelector('.login-email')
const passwordInput = document.querySelector('.login-password')
const loginSignUp = document.querySelector('.login-signup')
const userElem = document.querySelector('.user')
const userNameElement = document.querySelector('.user-name')
const exitElem = document.querySelector('.exit')
const editElem = document.querySelector('.edit')
const editContainer = document.querySelector('.edit-container')
const editUsername = document.querySelector('.edit-username')
const editPhotoURL = document.querySelector('.edit-photo')
const userAvatarElem = document.querySelector('.user-avatar')
const postsWrapper = document.querySelector('.posts')
const buttonNewPost = document.querySelector('.button-new-post')
const addPostElem = document.querySelector('.add-post')
const default_photo = userAvatarElem.src


const registrationUrl = "http://localhost:8080/api/v1/user/registration";
const logInUrl = 'http://localhost:8080/api/v1/user/login'
const editURL = 'http://localhost:8080/api/v1/user'
const createPostUrl = 'http://localhost:8080/api/v1/post'
const getPostsUrl = 'http://localhost:8080/api/v1/post?pageNo=0&pageSize=10&sortBy=id'



//const URL = 'https://jsonplaceholder.typicode.com/users'




function sendRequest(method, url, body) {
  const headers ={
    'Content-Type': 'application/json'
  }
  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers
  }).then(response => {
    if(response.ok){
      return response.json()
    }else 
    alert('Позьзователь с такими данными не найден')
    return response.json().then(error => {
      const e = new Error('Что-то пошло не так')
      e.data = error
      throw e
    })
  })
}

function sendRequest(method, url) {
  return fetch(url).then(response => {
    return response.json()
  })
}

const setPosts = {
  allPosts: [],

  addPost(title,text,tags,handler){
    const post = {
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        id: setUsers.user.id,
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    }
    this.allPosts.unshift(post)
     sendRequest('POST', createPostUrl, post)
      .then((data) =>{ 
        showAllPosts()
        

      console.log(data)
        //allPosts.unshift(data)
      })
      .catch(err => console.log(err))

  
  },
  getPosts(){
    sendRequest('GET', getPostsUrl)
      .then(data => {
        this.allPosts = data.content
        console.log(this.allPosts)
        console.log(data.content)
        showAllPosts()

      })
      .catch(err => console.log(err))

  }
  // getPosts(handler) {
  //   firebase.database().ref('post').on('value', snapshot => {
  //     this.allPosts = snapshot.val() || []
  //     handler()
  //   })
  // }
}



const setUsers = {
  user: null,

  logIn(user, handler){
    sendRequest('POST', logInUrl, user)
      .then(data => {
        this.user = data
        if(handler){
          handler()
        }
      })
      .catch(err => console.log(err))
      
  },

  logOut(handler){
    this.user = null
    if(handler){
      handler()
    }
  },
  signUp(email, password){
    const user = {
      email: email,
      password: password
    }
    sendRequest('POST', registrationUrl, user)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  },

  editUser(displayName, photo, handler){
    this.user.displayName=displayName;
    this.user.photo=photo;
    console.log(this.user);      
    sendRequest('PUT', editURL, this.user)
      .then(data => {
      console.log(data)
      this.user = data
      if(handler){
        handler()
      }})
      .catch(err => console.log(err))
  }
}

const toggleAuthDom = ()=>{
  const user = setUsers.user;
  console.log('user: ', user)

  if(user){
    loginElem.style.display = 'none'
    userElem.style.display = ''
    userNameElement.textContent = user.displayName
    userAvatarElem.src = user.photo || default_photo
    buttonNewPost.classList.add('visible')

  } else {
    loginElem.style.display = ''
    userElem.style.display = 'none'
    buttonNewPost.classList.remove('visible')
    addPostElem.classList.remove('visible')
    postsWrapper.classList.add('visible')
  }
}

const showAddPost = () => {
  addPostElem.classList.add('visible')
  postsWrapper.classList.remove('visible')
}

const showAllPosts = () => {
  let postsHTML = ''
  setPosts.allPosts.forEach(({title, text, tags, author, date, like, comments})=>{    
    postsHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>
      <div class="tags">
      ${tags.map(tag =>`<a href="#" class="tag">#${tag}</a>`).join('')}
      </div>
    </div>
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${like}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${author.displayName}</a>
          <span class="post-time">${date}</span>
        </div>
        <a href="#" class="author-link"><img src= ${author.photo || "img/avatar.png"}  alt="avatar" class="author-avatar"></a>
      </div>
    </div>
  </section> 
    `
  })
  postsWrapper.innerHTML = postsHTML

  addPostElem.classList.remove('visible')
  postsWrapper.classList.add('visible')
}


const init = () => {

loginForm.addEventListener('submit', (event) => {
  event.preventDefault()//изменить поведение браузера по умолчанию
  const user = {
    email: emailInput.value,
    password: passwordInput.value
  }
  setUsers.logIn(user, toggleAuthDom)
  loginForm.reset()
})

loginSignUp.addEventListener('click', (event) => {
  event.preventDefault()
  setUsers.signUp(emailInput.value, passwordInput.value)
  loginForm.reset()
})

exitElem.addEventListener('click',event=>{
  event.preventDefault()
  setUsers.logOut(toggleAuthDom)
})

editElem.addEventListener('click', event =>{
  event.preventDefault()
  editContainer.classList.toggle('visible')
  editUsername.value = setUsers.user.displayName
})

editContainer.addEventListener('submit', event =>{
  event.preventDefault()
  setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom)
  editContainer.classList.remove('visible')
})

menuToggle.addEventListener('click', function (event) {
  event.preventDefault()
  menu.classList.toggle('visible')
})

buttonNewPost.addEventListener('click', event => {
  event.preventDefault()
  showAddPost()
})

addPostElem.addEventListener('submit', event => {
  event.preventDefault()
  console.dir(addPostElem)
  const { title, text, tags } = addPostElem.elements
  console.log(title.value);

  if(title.value.length<6){
    alert('Добавьте символы в заголовок')
    return
  }
  if(text.value.length<6){
    alert('Добавьте символы в текст')
    return
  }
 
 setPosts.addPost(title.value, text.value, tags.value, showAddPost)

 addPostElem.classList.remove('visible')
 addPostElem.reset()
})

toggleAuthDom()
showAllPosts()

}

document.addEventListener('DOMContentLoaded', init)