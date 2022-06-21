import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import config from '../../config'
import s from './mainblock.module.scss'

export default function MainBlock() {

  const [systems, setSystems] = useState();
  const [system, setSystem] = useState(0);
  const [comments, setComments] = useState();
  const [comment, setComment] = useState(0);
  const [decisions, setDecisions] = useState();
  const [comment_text, setCommentText] = useState('')

  const user = useSelector((state: any) => state.user)

  useEffect(() => {
    axios.get(`${config.API}/control/systems/getAll`).then(({ data }) => {
      data.sort((a: any, b: any) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      })
      setSystems(data)
    })
  }, [])

  useEffect(() => {
    if (system !== 0) {
      axios.get(`${config.API}/control/comments/getBySystem?id=${system}`).then(({ data }) => {
        data.sort((a: any, b: any) => {
          if (a.comment.toLowerCase() < b.comment.toLowerCase()) {
            return -1;
          }
          if (a.comment.toLowerCase() > b.comment.toLowerCase()) {
            return 1;
          }
          return 0;
        })
        setComments(data)
      })
    }
  }, [system])

  useEffect(() => {
    if (comment !== 0) {
      axios.get(`${config.API}/control/decisions/getByComment?id=${comment}`).then(({ data }) => {
        setDecisions(data)
      })
      axios.get(`${config.API}/control/comments/getById?id=${comment}`).then(({ data }) => {
        if (data.train !== '') {
          setCommentText(`${data.comment} для локомотива ${data.train}`)
        } else {
          setCommentText(`${data.comment}`)
        }
      })
    }
  }, [comment])

  return (
    <>
      <div className={s.mainBlock}>
        <div className={s.upLinks}>
          <a target="_blank" rel="noreferrer" href="https://chat.whatsapp.com/LVS4gxkE85HDwCHAA77AJ3" className={s.whatsapp}>Техническая поддержка в WhatsApp</a>
          <Link href="/search" style={{ marginBottom: 20 }}><a href="/search" className={`${s.searchLink}`}>Поиск неисправностей</a></Link>
        </div>
        <h1>Помощник поиска неисправностей</h1>
        <p>Система</p>
        <select onChange={(e: any) => setSystem(e.target.value)}>
          <option value="0">Выберите из списка</option>
          {
            // @ts-ignore
            systems ? systems.map(e => <option value={e.uid} key={e.uid}>{e.name}</option>) : null
          }
        </select>
        {
          user.permissions > 1 ? <Link href="/panel/system">Добавить систему</Link> : null
        }
        <p>Замечание</p>
        <select onChange={({ target }: any) => setComment(target.value)}>
          <option value="0">Выберите из списка</option>
          {
            // @ts-ignore
            comments ? comments.map(e => <option value={e.uid} key={e.uid}>{e.comment}</option>) : null
          }
        </select>
        {
          user.permissions > 1 ? <Link href="/panel/comment">Добавить замечание</Link> : null
        }
      </div>
    </>
  )
}