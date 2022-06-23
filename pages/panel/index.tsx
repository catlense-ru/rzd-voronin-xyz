import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LinkPanel from '../../components/LinkPanel/LinkPanel'
import config from '../../config'
import MainLayout from '../../layouts/MainLayout'

const Join: NextPage = () => {

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

  return (
    <>
      <Head>
        <title>Панель управления</title>
      </Head>
      <MainLayout>
        <LinkPanel />
      </MainLayout>
    
    </>
  )
}

export default Join
