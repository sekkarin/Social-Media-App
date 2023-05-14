import { Box, Typography, useTheme } from "@mui/material";
import Friends from "../../components/Friends";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import { RootState } from "../../main";
import React from "react";
import axios from "axios";

const FriendListWidget = ({ userId }) => {
    // console.log("Heloooooooo");

    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state: RootState) => state.token);
    const friends = useSelector((state: RootState) => state.user.friends);

    const getFriends = async () => {
        // http://localhost:3001/users/${userId}/friends
        const res = await axios.get(`http://localhost:3001/user/${userId}/friends`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        dispatch(setFriends({ friends: res.data }));
    };

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // console.log("friends",friends);
    
    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friends
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subTitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;