import React from 'react'
import { Typography, useTheme } from '@mui/material'
import { FlexBetween } from '../../components/FlexBetween'
import WidgetWrapper from '../../components/WidgetWrapper'
const AdvertWidget = () => {
    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant='h5' fontWeight={'500'}>
                    sponsored
                </Typography>
                <Typography color={medium}>Create</Typography>
            </FlexBetween>
            <img
                width={'100%'}
                height={'auto'}
                alt='advert'
                src='http://localhost:3001/assets/info4.jpeg'
                style={{ borderRadius: '0.75rem', margin: '0.75rem 0', }}
            />
            <FlexBetween>
                <Typography color={main}>MikaCosetics</Typography>
                <Typography color={medium}>mikacosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m={'0.5rem 0'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit accusantium expedita perferendis! Velit vitae cum accusantium,
                 in nostrum optio temporibus rem est voluptatem numquam, delectus et laborum facilis beatae ut.
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget