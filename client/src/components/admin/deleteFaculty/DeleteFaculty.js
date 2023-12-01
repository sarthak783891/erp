import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllDepartment } from '../../../redux/actions/adminActions'
import Header from '../Header'
import Sidebar from '../Sidebar'
import Body from './Body'

const DeleteFaculty = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllDepartment())
  }, [dispatch])
  return (
    <div className='bg-[#d6d9e0] h-screen absolute w-screen top-0 -z-10 flex items-center justify-center'>
      <div className='flex flex-col  bg-[#f4f6fa] h-5/6 p-10 w-[95%] rounded-2xl shadow-2xl space-y-6 overflow-y-hidden'>
        <Header />
        <div className='flex gap-5'>
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  )
}

export default DeleteFaculty
