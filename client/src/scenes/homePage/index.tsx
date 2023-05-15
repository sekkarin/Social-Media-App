import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import Navbar from '../navbar'
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import { useSelector } from 'react-redux'
import { User } from '../../state'
import FriendListWidget from '../widgets/FriendListWidget'
import PostsWidget from '../widgets/PostsWidget'
import { RootState } from '../../main'
import AdvertWidget from '../widgets/AdvertWidget'
// import 
function HomePage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
  const { _id, picturePath } = useSelector((state: RootState) => state.user)
  return (
    <Box>
      <Navbar />
      <Box
        width={'100%'}
        padding={'2rem 6%'}
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap={'0.5ren'}
        justifyContent={'space-between'}
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? 'undefined' : '2rem'}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} isProfile={false} />
        </Box>
        {isNonMobileScreens && (<Box flexBasis={'26%'}>
          <AdvertWidget />
          <Box m={'2rem 0'} />
          <FriendListWidget userId={_id} />
        </Box>)}
      </Box>
    </Box >
  )
}

export default HomePage