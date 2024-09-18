
import React, { useContext, createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserById} from '../user/UserHttp'
export const UserContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null); // user is null by default
  // console.log(user)
  const reloadUserData = async (id) => {
    try {
      const result = await getUserById(id);
      console.log('update user: ', result?.email);
      if(result){
        setUser(result);
        await AsyncStorage.setItem('character', JSON.stringify(result));
      }

    } catch (error) {
      console.log('update user failed: ' ,error)
    }

  };
  useEffect(() => {
    const checkUser = async () => {
      try {
        const U = await AsyncStorage.getItem('character');
        if (U) {
          const userData = JSON.parse(U); // Chuyển đổi chuỗi JSON thành đối tượng
          setUser(userData);
          AsyncStorage.setItem('token',userData.token)
          console.log('User: ', userData);
          
        }
      } catch (error) {
        console.log('Error retrieving user from storage:', error);
      }
    };

    checkUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, reloadUserData }}>
      {children}
    </UserContext.Provider>

  )
};
