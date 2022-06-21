import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import config from "../../config"
import s from './decision.module.scss'

export default function Decision({type, author, uid, image, children}:any) {
  const user = useSelector((state:any) => state.user)
  const [active, setActive] = useState(false)

  useEffect(() => {
    axios.get(`${config.API}/control/decisions/getLikes?id=${uid}`).then(({data}) => {
      if(data.likes.find((e:any) => e.toString() === user.uid.toString())) {
        setActive(true)
      }
    })
    // eslint-disable-next-line
  }, [])

  const changeActive = () => {
    axios.post(`${config.API}/control/decisions/like`, {
      uid: user.uid.toString(),
      decision_id: uid.toString()
    }).then(({data}) => {
      if(data.status === "success") {
        data.move === 'add' ? setActive(true) : setActive(false)
      }
    })
  }

  const onEdit = () => {
    const msg = window.prompt('Введите новый текст замечания', children)
    if(msg) {
      axios.post(`${config.API}/control/decisions/edit`, {decision_id: uid, decision: msg}).then(({data}) => {
        alert(data.message)
      })
    }
  }

  const onDelete = () => {
    const conf = window.confirm('Вы уверены, что хотите удалить замечание?')
    if(conf) {
      axios.get(`${config.API}/control/decisions/delete?uid=${uid}&user_token=1`,).then(({data}) => {
        alert(data.message)
      })
    }
  }


  if(!type) {
    return(
      <>
        <div className={s.decision}>
          <div className={s.content}>
            <p>{children} - <i>{author}</i></p>
            {image && <img src={`${config.API}/${image}`} alt={image} onClick={() => window.open(`${config.API}/${image}`)} />}
          </div>
          
          {
            user.login ? 
            // @ts-ignore
            <button className={active ? s.active : null} onClick={changeActive}>Полезно</button>
            : null
          }
        </div>
      </>
    )
  }
}