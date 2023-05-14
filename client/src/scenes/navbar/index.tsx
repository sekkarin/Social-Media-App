import {
    Box, IconButton,
    MenuItem, Select,
    useTheme, useMediaQuery, Typography, InputBase, InputLabel, FormControl
} from "@mui/material"
import { useState } from "react"
import { Search, Message, DarkMode, Light, Notifications, Help, Menu, Close, LightMode } from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout, User, IInitialState } from "../../state"
import { FlexBetween } from "../../components/FlexBetween"
import { useNavigate } from "react-router-dom"
import React from "react"
// FormControl %

const Navbar = () => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
    const user = useSelector((state: IInitialState) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    

    const fullName = `${user.firstName} ${user.lastName}`;
    // console.log("123",_fullName);

    // const fullName = "Ken";
    return (
        <FlexBetween padding={"1rem 6%"} bgcolor={alt}>
            <FlexBetween gap={"1.75rem"}>
                <Typography
                    fontWeight={"bold"}
                    fontSize={"Clamp(1rem,2rem,2.25rem)"}
                    onClick={() => navigate('/home')}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                            cursor: 'pointer'
                        }
                    }}>
                    Ken-Social
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween bgcolor={neutralLight} borderRadius={"9px"} gap={"3rem"} padding={"0.5rem 1.5rem"}>
                        <InputBase placeholder="Search.." />
                        <IconButton>
                            <Search></Search>
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>
            {/* DESKTOP NAV */}
            {isNonMobileScreens ?
                (<FlexBetween gap={"2rem"}>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl variant="standard" >
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())} >Log Out</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>)
                :
                (<IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>)}
            {/* MOBIE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box position={"fixed"}
                    right={"0"}
                    bottom={"0"}
                    height={"100%"}
                    zIndex={"10"}
                    maxWidth={"500px"}
                    minWidth={"300px"}
                    bgcolor={background}
                >
                    {/* CLOsE ICON */}
                    <Box
                        display={"flex"}
                        justifyContent={"flex-end"}
                        p={"1rem"}
                    >
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                    {/* MENU ITEMs */}
                    <FlexBetween display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={"2rem"}>
                        <IconButton sx={{ fontSize: "25px" }} onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === 'dark' ?
                                (<DarkMode sx={{ fontSize: "25px" }} />)
                                :
                                (<LightMode sx={{ color: dark, fontSize: "2px" }} />)}
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl variant={"standard"}>
                            <Select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLight,
                                    width: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root:": {
                                        pr: "0.25rem",
                                        width: '3rem',
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLight
                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())} >Log Out</MenuItem>
                            </Select>
                        </FormControl>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>)
}
export default Navbar