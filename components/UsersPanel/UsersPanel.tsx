import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import config from '../../config'
import User from './User/User'
import s from './userspanel.module.scss'

export default function UsersPanel() {

  const router = useRouter()
  const user = useSelector((state:any) => state.user)
  if(user.permissions < 2) router.push('/')

  const [users, setUsers]:any = useState()
  
  useEffect(() => {
    axios.get(`${config.API}/user/g_a`).then(({data}) => {
      setUsers(data)
    })
  }, [])

  return(
    <div className={s.usersPanel}>
      <h1>Информация о пользователях</h1>
      {
        users && <p className={s.users}>Всего пользователей: {users.length}</p>
      }
      {
        users && users.map((e:any) => <User user={e} key={e.uid} />)
      }
    </div>
  )
}