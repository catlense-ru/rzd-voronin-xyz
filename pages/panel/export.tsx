import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import config from '../../config'
import MainLayout from '../../layouts/MainLayout'

export default function Export() {

  const [result, setResult] = useState('')
  const [resultDecision, setResultDecision] = useState('')

  const exportData = () => {
    axios.get(`${config.API}/control/db/export`).then(({ data }) => {
      if (data.toString().toLowerCase() === "ok") {
        setResult('Таблица пользователей скоро появится на почте e_voronin@mail.ru')
      }
    })
  }

  const exportDecision = () => {
    axios.get(`${config.API}/control/db/exportdecisions`).then(({ data }) => {
      if (data.toString().toLowerCase() === "ok") {
        setResultDecision('Таблица решений скоро появится на почте e_voronin@mail.ru')
      }
    })
  }

  const router = useRouter()
  const user = useSelector((state:any) => state.user)
  if(user.permissions < 1) router.push('/')


  const dispatch = useDispatch()
  useEffect(() => {
    if(window.localStorage.token) {
      axios.get(`${config.API}/user/get?token=${localStorage.token}`).then(({data}) => {
        dispatch({type: "JOIN_USER", payload: data})
      })
    } else {
      router.push('/')
    }
  }, [])

  const styles = {
    p: {
      color: 'white'
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    button: {
      padding: '20px 30px',
      borderRadius: 10,
      background: 'rgb(0, 100, 200)',
      color: 'white',
      border: 'none',
      fontFamily: 'var(--common-font)',
      fontSize: 16
    }
  }

  return (
    <>
      <Head>
        <title>Панель управления</title>
      </Head>
      <MainLayout>
        <div style={styles.container}>
          <div>
            <p style={styles.p}>Таблица пользователей</p>
            <button onClick={exportData} style={styles.button}>Экспортировать</button>
            <p style={styles.p}>{result}</p>
          </div>
          <div>
            <p style={styles.p}>Таблица решений</p>
            <button onClick={exportDecision} style={styles.button}>Экспортировать</button>
            <p style={styles.p}>{resultDecision}</p>
          </div>
        </div>
      </MainLayout>
    </>
  )
}