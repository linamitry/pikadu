// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})
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
    }else{
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
      const user = {email,password, displayName: email.split('@')[0]}

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
  } else {
    loginElem.style.display = ''
    userElem.style.display = 'none'
  }
}


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
})

editContainer.addEventListener('click', event =>{
  event.preventDefault()

  setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom)
})

toggleAuthDom()














