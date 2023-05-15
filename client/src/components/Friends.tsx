import React from 'react'
import { PersonAddOutlined, PersonRemoveAlt1Outlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { FlexBetween } from './FlexBetween'
import UserImage from './UserImage'
import { useNavigate } from 'react-router-dom'
import { setFriends } from '../state'
import axios from 'axios'
import { RootState } from '../main'



const Friends = ({ friendId, name, subTitle, userPicturePath }) => {
    
    
    const { palette } = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { _id } = useSelector((state: RootState) => state.user)
    const token = useSelector((state: RootState) => state.token)
    const friends = useSelector((state: RootState) => state.user.friends)

    const primaryLight = palette.primary.light
    const primaryDark = palette.primary.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    const isFriend = friends.find((friend) => friend._id === friendId)

    const patchFriend = async () => {
        const res = await axios.patch(`http://localhost:3001/user/${_id}/${friendId}`,
            {},
            {
                headers: { 'Authorization': `Bearer ${token}` },
            })
        dispatch(setFriends({ friends: res.data }));
    }
    return (
        <FlexBetween >
            <FlexBetween gap={'1rem'}>
                <UserImage image={userPicturePath} />
                <Box
                    onClick={() => navigate(`/profile/${friendId}`)}
                >
                    <Typography
                        color={main}
                        variant='h5'
                        fontSize={'500'}
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: 'pointer'
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium}>{subTitle}</Typography>
                </Box>
            </FlexBetween>
            <IconButton onClick={() => patchFriend()}
                sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
            >
                {isFriend ? (
                    <PersonRemoveAlt1Outlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>
        </FlexBetween>
    )
}

export default Friends