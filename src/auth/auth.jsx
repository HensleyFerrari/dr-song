import React, { useState } from 'react'
//import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login, signup } from './authActions'

function Auth(props) {
    const [loginMode, setLoginMode] = useState(true)
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm_password: '' })

    const changeMode = () => {
        setLoginMode(!loginMode)
    }

    const onSubmit = (values) => {
        values.preventDefault()
        const { login, signup } = props

        if (loginMode) {
            const loginForm = {email : form.email, password : form.password}
            login(loginForm)
        } else {
            signup(form)
        }        
    }

    const changeForm = (e) => {
        const { name, value } = e.target

        setForm({ ...form, [name]: value })
    }

    return (
        <div className='flex bg-gradient-to-r from-violet-500 to-fuchsia-500 h-screen'>
            {/* <form onSubmit={ handleSubmit (v => onSubmit(v))}> */}
            <div className='flex flex-col justify-center m-auto bg-white w-96 rounded-lg p-10'>
                <div className=' text-center pt-2 p-5'>
                    <span className='font-bold text-4xl text-purple-600'>Dr.Song</span>
                </div>
                <form className='flex flex-col gap-5 w-52 self-center' onSubmit={onSubmit}>
                    <input className={`${loginMode ? 'hidden' : ''} p-2 rounded-md`} name="name" type="input" placeholder="Nome" onChange={changeForm} />
                    <input className='p-2 rounded-md' name="email" type="email" placeholder="E-mail" onChange={changeForm} />
                    <input className='p-2 rounded-md' name="password" type="password" placeholder="Senha" onChange={changeForm} />
                    <input className={`${loginMode ? 'hidden' : ''} p-2 rounded-md`} name="confirm_password" type="password" placeholder="Confirmar Senha" onChange={changeForm} />
                    <button type='submit' className='px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-xl'>{loginMode ? 'Entrar' : 'Registrar'}</button>
                </form>
                <button onClick={() => changeMode()} className='p-5 pb-1'>
                    {loginMode ? 'Não possui usuário? Registre-se!' : 'Já possui usuário? Entre!'}
                </button>
            </div>
        </div>
    )
}

// Auth = reduxForm({ form: 'authForm' })(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)