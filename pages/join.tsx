import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import JoinForm from '../components/JoinForm/JoinForm'
import config from '../config'
import MainLayout from '../layouts/MainLayout'

const Join: NextPage = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    if(window.localStorage.token) {
      axios.get(`${config.API}/user/get?token=${localStorage.token}`).then(({data}) => {
        dispatch({type: "JOIN_USER", payload: data})
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Вход</title>
      </Head>
      <MainLayout>
        <JoinForm />
      </MainLayout>
    
    </>
  )
}

export default Join
