import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import s from './linkpanel.module.scss'

export default function LinkPanel() {

  const router = useRouter()
  const user = useSelector((state:any) => state.user)
  if(user.permissions < 1) router.push('/')

  return(
    <div className={s.linkPanel}>
      {
        user.permissions > 1 ?
          <>
            <Link href="/panel/users">Пользователи</Link>
            <Link href="/panel/export">Экспортировать таблицу</Link>
            <Link href="/panel/system">Добавить систему</Link>
            <Link href="/panel/locomotive">Добавить серию локомотива</Link>
            <Link href="/panel/esystem">Изменить систему</Link>
            <Link href="/panel/ecomment">Изменить замечание</Link>
            <Link href="/panel/edecision">Изменить решение</Link>
            <Link href="/panel/ddecision">Деактивировать решение</Link>
            <Link href="/panel/stat">Статистика</Link>
            <hr/>
          </>
        : <p>{user.permissions}</p>
      }
      <Link href="/panel/comment">Добавить замечание</Link>
      <Link href="/panel/decision">Добавить решение</Link>
      <Link href="/panel/liked">Полезные решения</Link>
      <Link href="/panel/mydecision">Мои решения</Link>
    </div>
  )
}