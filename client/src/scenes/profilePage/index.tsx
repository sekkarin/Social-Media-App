import React, { useEffect, useState } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { useParams } from 'react-router-dom'
import Navbar from '../navbar'
import FriendListWidget from '../widgets/FriendListWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'
import { useSelector } from 'react-redux'
import { RootState } from '../../main'
import axios from 'axios'
import MyPostWidget from '../widgets/MyPostWidget'
import AdvertWidget from '../widgets/AdvertWidget'

function ProfilePage() {
  const [user, setUser] = useState<object | null>(null)
  const { userId } = useParams()
  const token = useSelector((state: RootState) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')
  const getUser = async () => {
    const res = await axios(`http://localhost:3001/user/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    )
    // console.log("res.data",res.data.user);
    
    setUser(res.data.user)
  }
  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!user) {
    return null
  }
  return (
    <Box>
      <Navbar />
      <Box
        width={'100%'}
        padding={'2rem 6%'}
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap={'2rem'}
        justifyContent={'center'}
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m={'2rem 0'} />
          <FriendListWidget userId={userId} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? 'undefined' : '2rem'}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m={'2rem 0'} />
          <PostsWidget userId={userId} isProfile={true} />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage