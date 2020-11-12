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

const loginElem = document.querySelector('.login')
const loginForm = document.querySelector('.login-form')
const emailInput = document.querySelector('.login-email')
const passwordInput = document.querySelector('.login-password')
const loginSignUp = document.querySelector('.login-signup')

const userElem = document.querySelector('.user')
const userNameElement = document.querySelector('.user-name')


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
  logIn(email, password){
    const user = this.getUser(email)
    if(user && user.password === password){
      this.authorizedUser(user)
    }else{
      alert('Пользователь с такими данными не найден')
    }
  },
  // выход
  logOut(){
    console.log('выход')
  },
  //регистрация
  signUp(email, password, handler){
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
  }
}


const toggleAuthDom = ()=>{
  const user = setUsers.user;
  console.log('user: ', user)

  if(user){
    loginElem.style.display = 'none'
    userElem.style.display = ''
    userNameElement.textContent = user.displayName
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

toggleAuthDom()














