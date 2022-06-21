import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Logo from '../../assets/logo'
import s from './header.module.scss'

export default function Header() {

  const router = useRouter()

  const user = useSelector((state:any) => state.user)

  return(
    <header className={s.header}>
      <Link href="/" className={"linkDownline"}><a href="/" className={"linkDownline"}>На главную</a></Link>
      <Logo className={s.logo} />
      <Link href={`/${user.login ? 'panel' : 'join'}`}><a href={`/${user.login ? 'panel' : 'join'}`} className={"linkDownline"}>{user.login ? 'Панель управления' : 'Вход'}</a></Link>
    </header>
  )
}