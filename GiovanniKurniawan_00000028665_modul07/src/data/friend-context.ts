import React from 'react';
export interface Friend {
    id: string,
    name: string,
    avatar: string
}

interface Context {
    friends: Friend[];
    addFriend: (friendName: string, friendAvatar: string) => void,
    updateFriend: () => void,
    deleteFriend: () => void
}

const FriendsContext = React.createContext<Context>({
    friends: [],
    addFriend: () => {},
    updateFriend: () => {},
    deleteFriend: () => {}
});

export default FriendsContext;
