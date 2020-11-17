// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdgKTo3nGsgLmgxRUJDi7k5_c_W_dutbM",
  authDomain: "pikadu-5839e.firebaseapp.com",
  databaseURL: "https://pikadu-5839e.firebaseio.com",
  projectId: "pikadu-5839e",
  storageBucket: "pikadu-5839e.appspot.com",
  messagingSenderId: "394524754809",
  appId: "1:394524754809:web:0c3bd7c87f2d1c3399a5a8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/

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



const setPosts = {
  allPosts: [],

  addPost(title,text,tags,handler){
    const user = firebase.auth().currentUser
    this.allPosts.unshift({
      id: `postID${(+new Date()).toString(16)}-${user.uid}`,
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photoURL
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    })
  firebase.database().ref('post').set(this.allPosts)
  .then(() => this.getPosts(handler))
  },
  getPosts(handler) {
    firebase.database().ref('post').on('value', snapshot => {
      this.allPosts = snapshot.val() || []
      handler()
    })
  }
}

const setUsers = {
  user: null,
  
  initUser(handler){
   
   
   
    // firebase.auth().onAuthStateChanged(user => {
    //   if(user) {
    //     this.user = user
    //   } else {
    //     this.user = null
    //   }


      if(handler) {
        handler()
      }
    

  },
  
  logIn(email, password, handler){
    const request = new XMLHttpRequest();
    request.responseType =	"json";    
    let user = {
      email: email,
      password: password
    }
    request.open("POST", logInUrl, true);
    request.setRequestHeader("Content-type", "application/json");
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
          let obj = request.response;   
    }
      });
 
  request.send(JSON.stringify(user))
  console.log('user: ', user);
  console.log(typeof(user));
  },

  logOut(){
    firebase.auth().signOut()
  },
  
  signUp(email, password){const request = new XMLHttpRequest();
    request.responseType =	"json";    
    let user = {
      email: email,
      password: password
    }
    request.open("POST", registrationUrl, true);
    request.setRequestHeader("Content-type", "application/json");
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
          let obj = request.response;   
    }
      });
 
  request.send(JSON.stringify(user))
  console.log('user: ', user);
  console.log(typeof(user));
  },

//TODO:переделать чтобы св-во фото не вызывалось, если не передано
  editUser(displayName, photoURL, handler){
    const user = firebase.auth().currentUser
    if(displayName){
      if(photoURL){
        user.updateProfile({
          displayName,
          photoURL
        }).then(handler)
      } else{
      user.updateProfile({
        displayName
      }).then(handler)
    }
  }
  }, 

  sendForget(email){
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Письмо отправлено')
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const loginForget = document.querySelector('.login-forget')

loginForget.addEventListener('click', event =>{
  event.preventDefault()

  setUsers.sendForget(emailInput.value)
  emailInput.value = ''
})


const toggleAuthDom = ()=>{
  const user = setUsers.user;
  console.log('user: ', user)

  if(user){
    loginElem.style.display = 'none'
    userElem.style.display = ''
    userNameElement.textContent = user.displayName
    userAvatarElem.src = user.photoURL || default_photo
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
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom)
  loginForm.reset()
})

loginSignUp.addEventListener('click', (event) => {
  event.preventDefault()
  setUsers.signUp(emailInput.value, passwordInput.value)
})
// loginSignUp.addEventListener('click', (event) => {
//   event.preventDefault()
//   setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom)
//   loginForm.reset()
// })

exitElem.addEventListener('click',event=>{
  event.preventDefault()
  setUsers.logOut()
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
  if(text.value.length<50){
    alert('Добавьте символы в текст')
    return
  }
 
 setPosts.addPost(title.value, text.value, tags.value, showAddPost)

 addPostElem.classList.remove('visible')
 addPostElem.reset()
})
setPosts.getPosts(showAllPosts)
setUsers.initUser(toggleAuthDom)
}

document.addEventListener('DOMContentLoaded', init)
