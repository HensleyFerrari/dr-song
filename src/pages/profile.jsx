import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { validateToken } from '../auth/authActions'

import consts from '../consts'
import CardProfile from '../common/card/CardProfile'
import Loading from '../common/msg/Loading'

function Profile({ auth }) {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    axios.get(`${consts.API_URL}/info`, {
      headers: {
        Authorization: auth.user.token,
      }
    }).then(resp => {
      setLoading(true)
      setInfo(resp.data)
    })
  }

  return (
    <div className='dark:bg-zinc-800 min-h-[891px]'>
      {!loading && <Loading />}
      <div className={`container mx-auto pt-5 pb-5 ${loading ? '' : 'hidden'}`}>
        <div className="sm:pb-4 dark:text-white font-bold text-3xl p-5 sm:p-0">
          Olá, <span className='text-purple-600'>{auth.user.name}</span>
        </div>
        <div className="flex mb-5 gap-5 pl-5 pr-5 sm:p-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={searchTerm} placeholder='Quero escutar...' className='w-full outline outline-offset-1 outline-purple-500 rounded-md p-2' onChange={e => { setSearchTerm(e.target.value) }} />
          <button onClick={e => { setSearchTerm("") }} className='px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-200'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5 sm:p-0">
          {/* <div className="flex flex-col gap-4 p-5 sm:p-0">          */}
          {info && info.filter(val => {
            if (val.createdBy.name.toLowerCase().includes(auth.user.name.toLowerCase())) {
              if(val.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.anime.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.tag.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
              }
            }
          }).map(info => {
            return (
              <>
                <CardProfile song={info} name={auth.user._id} admin={auth.user.admin} />
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Profile)