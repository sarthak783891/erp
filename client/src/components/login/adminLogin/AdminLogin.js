import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { adminSignIn } from '../../../redux/actions/adminActions'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Spinner from '../../../utils/Spinner'

const AdminLogin = () => {
  const [translate, setTranslate] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const store = useSelector((state) => state)
  const [error, setError] = useState({})
  useEffect(() => {
    setTimeout(() => {
      setTranslate(true)
    }, 1000)
  }, [])

  useEffect(() => {
    if (store.errors) {
      setError(store.errors)
    }
  }, [store.errors])

  const login = (e) => {
    e.preventDefault()
    setLoading(true)
    dispatch(adminSignIn({ username: username, password: password }, navigate))
  }

  useEffect(() => {
    if (store.errors) {
      setLoading(false)
      setUsername('')
      setPassword('')
    }
  }, [store.errors])
  return (
    <div className='bg-[#04bd7d] min-h-screen w-screen top-0 -z-10 absolute flex items-center justify-center'>
      <div className='grid grid-cols-2 p-12 shadow-2xl bg-slate-200 rounded-3xl'>
        <div
          className={`h-96 w-96 bg-slate-200 flex items-center justify-center 
         transition-all `}
        >
          <h1 className='text-[3rem]  font-bold text-center'>
            Admin
            <br />
            Login
          </h1>
        </div>
        <form
          onSubmit={login}
          className={`${
            loading ? 'h-[27rem]' : 'h-96'
          } w-96 bg-[#2c2f35] flex flex-col items-center justify-center 
          transition-all space-y-6 rounded-3xl shadow-2xl`}
        >
          <h1 className='text-3xl font-semibold text-white'>Admin</h1>
          <div className='space-y-1'>
            <p className='text-[#515966] font-bold text-sm'>Username</p>
            <div className='bg-[#515966] rounded-lg w-[14rem] flex  items-center'>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type='text'
                required
                className='bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm'
                placeholder='Username'
              />
            </div>
          </div>
          <div className='space-y-1'>
            <p className='text-[#515966] font-bold text-sm'>Password</p>
            <div className='bg-[#515966] rounded-lg px-2 flex  items-center'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                type={showPassword ? 'text' : 'password'}
                className=' bg-[#515966] text-white rounded-lg outline-none py-2  placeholder:text-sm'
                placeholder='Password'
              />
              {showPassword ? (
                <VisibilityIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className='cursor-pointer'
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className='cursor-pointer'
                />
              )}
            </div>
          </div>
          <button
            type='submit'
            className='w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]'
          >
            Login
          </button>
          {loading && (
            <Spinner
              message='Logging In'
              height={30}
              width={150}
              color='#ffffff'
              messageColor='#fff'
            />
          )}
          {(error.usernameError || error.passwordError) && (
            <p className='text-red-500'>
              {error.usernameError || error.passwordError}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
