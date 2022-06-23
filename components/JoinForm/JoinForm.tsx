import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import config from '../../config'
import s from './joinform.module.scss'

export default function JoinForm() {
  
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState({status: 'error', message: ''})

  const router = useRouter()
  const user = useSelector((state:any) => state.user)

  if(user.login) {
    router.push('/')
  }

  const sendData = () => {
    if(login.trim() === '') return setResult({status: 'error', message: 'Укажите логин'})
    if(password.trim() === '') return setResult({status: 'error', message: 'Укажите пароль'})
    axios.post(
      `${config.API}/user/auth/login`, {
        login, password
      }
    ).then(({data}) => {
      if(data.status === 500) {
        setResult({status: 'error', message: data.message})
      } else {
        localStorage.token = data.token
        setResult({status: 'success', message: 'Вы успешно вошли!'})
        window.location.reload()
        router.push('/')
      }
    })
  }
  
  return(
    <div className={s.joinForm}>
      <h1>Вход</h1>
      <input placeholder="Логин" onChange={({target}) => setLogin(target.value)} value={login} />
      <input type="password" placeholder="Пароль" onChange={({target}) => setPassword(target.value)} value={password} />
      <div className={s.btnLine}>
        <button onClick={sendData}>Войти</button>
        <Link href="/register">Регистрация</Link>
      </div>
      <p className={`${s.result} ${s[result.status]}`}>{result.message}</p>
    </div>
  )
}