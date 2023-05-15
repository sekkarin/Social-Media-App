import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from '@mui/icons-material'
import { Box, Typography, Divider, useTheme } from '@mui/material'
import UserImage from '../../components/UserImage'
import WidgetWrapper from '../../components/WidgetWrapper'
import { FlexBetween } from '../../components/FlexBetween'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { User } from '../../state/index'
import React from 'react'
import { RootState } from '../../main'
import twitter from '../../assets/twitter.png'
import linkedin from '../../assets/linkedin.png'
interface PropsType {
    userId?: string;
    picturePath?: string;
}
function UserWidget({ userId, picturePath }: PropsType) {


    const [user, setUser] = useState<User | null>(null)
    const { palette } = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state: RootState) => state.token)
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    const getUser = async () => {
        const res = await axios.get(`http://localhost:3001/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        // console.log(res.data);
        setUser(res.data.user)

    }
    useEffect(() => {
        getUser()
    }, [])
    if (!user)
        return

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user;

    return (

        <WidgetWrapper>
            <FlexBetween gap={"0.5rem"}
                pb={"1.1rem"}
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap={"1rem"}>
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant='h4'
                            color={dark}
                            fontWeight={"500"}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {user.friends.length} friends
                        </Typography>

                    </Box>

                </FlexBetween>``
                <ManageAccountsOutlined />
            </FlexBetween>
            <Divider />
            {/* SECOND ROW */}
            <Box p="1rem">
                <Box display={"flex"} alignItems={"center"} gap={"1rem"} mb={"0.5rem"}>
                    <LocationOnOutlined fontSize='large' sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>

                </Box>
                <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                    <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            {/* THIRD ROW */}
            <Box p={"1rem"}>
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight={"500"}>{impressions}</Typography>


                </FlexBetween>
            </Box>
            <Divider />
            {/* FOURTH ROW */}
            <Box p={'1rem 0'}>
                <Typography fontSize={'1rem'} color={main} fontWeight={'500'} mb={'1rem'}>
                    Social Profile
                </Typography>
                <FlexBetween gap={'1rem'} mb={'0.5rem'}>
                    <FlexBetween gap={'1rem'}>
                        <img src={twitter} alt='twiter' />
                        <Box>
                            <Typography color={main} fontWeight={'500'}>
                                Twitter
                            </Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
                <FlexBetween gap={'1rem'}>
                    <FlexBetween gap={'1rem'}>
                        <img src={linkedin} alt='linked' />
                        <Box>
                            <Typography color={main} fontWeight={'500'}>
                                Linked
                            </Typography>
                            <Typography color={medium}>Social Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>

        </WidgetWrapper>
    )
}
export default UserWidget