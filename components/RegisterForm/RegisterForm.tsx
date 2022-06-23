import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import config from '../../config'
import s from './registerform.module.scss'

export default function RegisterForm() {

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [phone, setPhone] = useState('')
  const [login, setLogin] = useState('')
  const [work, setWork] = useState('')
  const [road, setRoad] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [result, setResult] = useState({status: '', message: ''})

  const router = useRouter()
  const user = useSelector((state: any) => state.user)

  if (user.login) {
    router.push('/')
  }

  const sendData = () => {
    if(name.trim() === '') return setResult({status: 'error', message: 'Укажите имя'})
    if(surname.trim() === '') return setResult({status: 'error', message: 'Укажите фамилию'})
    if(phone.trim() === '') return setResult({status: 'error', message: 'Укажите телефон'})
    if(login.trim() === '') return setResult({status: 'error', message: 'Укажите логин'})
    if(road.trim() === '0') return setResult({status: 'error', message: 'Укажите дорогу'})
    if(work.trim() === '') return setResult({status: 'error', message: 'Укажите предприятие'})
    if(password.trim() === '') return setResult({status: 'error', message: 'Укажите пароль'})
    if(passwordRepeat.trim() === '') return setResult({status: 'error', message: 'Укажите повтор пароля'})
    if(password !== passwordRepeat) return setResult({status: 'error', message: 'Пароли не совпадают'})
    axios.post(`${config.API}/user/auth/registration`, {
      name, surname, login, work, contact:phone, road, password
    }).then(({data}) => {
      if(data.status === "500") {
        return setResult({status: 'error', message: data.message})
      }
      localStorage.token = data.user.token
      router.push('/')
      window.location.reload()
    })
  }

  return (
    <div className={s.joinForm}>
      <h1>Регистрация</h1>
      <input type="text" placeholder="Имя" onChange={({ target }) => setName(target.value)} value={name} />
      <input type="text" placeholder="Фамилия" onChange={({ target }) => setSurname(target.value)} value={surname} />
      <input type="text" placeholder="Телефон" onChange={({ target }) => setPhone(target.value)} value={phone} />
      <input type="text" placeholder="Логин" onChange={({ target }) => setLogin(target.value)} value={login} />
      <select onChange={({ target }) => setRoad(target.value)} defaultValue="0" value={road}>
        <option value="0">Выберите дорогу</option>
        <option value="Восточно-Сибирская железная дорога">Восточно-Сибирская железная дорога</option>
        <option value="Горьковская железная дорога">Горьковская железная дорога</option>
        <option value="Дальневосточная железная дорога">Дальневосточная железная дорога</option>
        <option value="Забайкальская железная дорога">Забайкальская железная дорога</option>
        <option value="Западно-Сибирская железная дорога">Западно-Сибирская железная дорога</option>
        <option value="Калининградская железная дорога">Калининградская железная дорога</option>
        <option value="Куйбышевская железная дорога">Куйбышевская железная дорога</option>
        <option value="Московская железная дорога">Московская железная дорога</option>
        <option value="Октябрьская железная дорога">Октябрьская железная дорога</option>
        <option value="Приволжская железная дорога">Приволжская железная дорога</option>
        <option value="Сахалинская железная дорога">Сахалинская железная дорога</option>
        <option value="Свердловская железная дорога">Свердловская железная дорога</option>
        <option value="Северная железная дорога">Северная железная дорога</option>
        <option value="Северо-Кавказская железная дорога">Северо-Кавказская железная дорога</option>
        <option value="Юго-Восточная железная дорога">Юго-Восточная железная дорога</option>
        <option value="Южно-Уральская железная дорога">Южно-Уральская железная дорога</option>
      </select>
      <input type="text" placeholder="Предприятие" onChange={({ target }) => setWork(target.value)} value={work} />
      <input type="password" placeholder="Пароль" onChange={({ target }) => setPassword(target.value)} value={password} />
      <input type="password" placeholder="Повтор пароля" onChange={({target}) => setPasswordRepeat(target.value)} value={passwordRepeat} />
      <div className={s.btnLine}>
        <button onClick={sendData}>Зарегистрироваться</button>
        <Link href="/join">Вход</Link>
      </div>
      <p className={`${s.result} ${s[result.status]}`}>{result.message}</p>
    </div>
  )
}