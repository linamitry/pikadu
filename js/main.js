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




const listUsers = [
  {
    id: '01',
    email: 'maks@mail.com',
    password: '12345',
    displayName: 'MaksJS'
  },
  {
    id: '02',
    email: 'lina@mail.com',
    password: '123456',
    displayName: 'LinaJS'
  },
];


const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: [
        'свежее', 'новое', 'горячее', 'мое', 'случайность',
      ],
      author: {displayName: 'maks', photo: ''},
      date: '11.11.2020, 20:54:00',
      like: 34,
      comments: 54
    },
    {
      title: 'Заголовок поста 2',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: [
        'свежее', 'новое', 'мое', 'случайность',
      ],
      author: {displayName: 'lina', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQt86sQ9Ya33SIwiA1tc4FGlpq1jqhimI_XVw&usqp=CAU'},
      date: '10.11.2020, 20:54:00',
      like: 42,
      comments: 24
    }
  ],
  addPost(title,text,tags,handler){
    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    })

    if(handler){
      hsndler()
    }
  }
}



//setUsers.logIn()
const setUsers = {
  user: null,
  // вход
  logIn(email, password, handler){

    if(!regExpValidEmail.test(email)) return alert('email не валиден')
    const user = this.getUser(email)    
    if(user && user.password === password){
      this.authorizedUser(user)
      handler()
    }else    {
      alert('Пользователь с такими данными не найден')
    }
  },

  // выход
  logOut(handler){

    console.log('выход')
    this.user = null
    handler()
  },

  //регистрация
  signUp(email, password, handler){

    if(!regExpValidEmail.test(email)) return alert('email не валиден')
    if(!email.trim() || !password.trim()){
      return alert('Введите данные')
    }
    if(!this.getUser(email)){
      const user = {email,password, displayName: email.substring(0, email.indexOf('@'))}
      listUsers.push(user)
      this.authorizedUser(user)
      handler()
    } else {
      alert('Пользователь с таким email уже зарегистрирован')
    }
  },




  getUser(email){

    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user){

    this.user = user
  },
  editUser(userName, userPhoto, handler){

    if(userName){
      this.user.displayName = userName
    }
    if(userPhoto){
      this.user.photo = userPhoto
    }
    handler()
  }
}




const toggleAuthDom = ()=>{
  const user = setUsers.user;
  console.log('user: ', user)

  if(user){
    loginElem.style.display = 'none'
    userElem.style.display = ''
    userNameElement.textContent = user.displayName
    userAvatarElem.src = user.photo || userAvatarElem.src
    buttonNewPost.classList.add('visible')

  } else {
    loginElem.style.display = ''
    userElem.style.display = 'none'
    buttonNewPost.classList.remove('visible')
    addPostElem.classList.remove('visible')
    postsWrapper.classList.add('visible')
    //todo удалить
    addPostElem.classList.add('visible')
    postsWrapper.classList.remove('visible')
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
//события на форме(войти и enter) и на регистрации
//addEventListener вместо onclick (отменять removeEventListener)
//submit type
loginForm.addEventListener('submit', (event) => {
  event.preventDefault()//изменить поведение браузера по умолчанию
  setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom)
  loginForm.reset()
})

loginSignUp.addEventListener('click', (event) => {
  event.preventDefault()
  setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom)
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

// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault()
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible')
})

buttonNewPost.addEventListener('click', event => {
  event.preventDefault()
  showAddPost()

})

addPostElem.addEventListener('submit', event => {
  event.preventDefault()
  const {title,text,tags} = addPostElem.elements

  if(title.value.length<6){
    alert('Добавьте символы в заголовок')
    return
  }
  if(text.value.length<50){
    alert('Добавьте символы в текст')
    return
  }

setPosts.addPost(title.value, text.value, tags.value, showAddPost())
addPostElem.classList.remove('visible')



})



  showAllPosts()
  toggleAuthDom()
}

document.addEventListener('DOMContentLoaded', init)















