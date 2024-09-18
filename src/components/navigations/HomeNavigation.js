import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
import 'react-native-gesture-handler';
import Home from '../news/screens/Home';
import Explore from '../news/screens/Explore';
import Bookmark from '../news/screens/Bookmark';
import DetailScreen from '../news/screens/DetailScreen';
import AddNew from '../news/screens/AddNew';
import EditProfile from '../user/screens/EditProfile';
import Setting from '../user/screens/Setting';
import Login from '../user/screens/Login';
import ForgotPassword from '../user/screens/ForgotPassword';
import ResetPassword from '../user/screens/ResetPassword';
import Verification from '../user/screens/Verification';
import HomeDrawer from '../stack/HomeDrawer';
import { FONT } from '../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/Ionicons';
import ProfileStack from '../stack/ProfileStack';
import Register from '../user/screens/Register';
import NewDetail from '../news/screens/NewDetail';
import Shorts from '../Short/screens/Shorts';
import HomeWeather from '../Weather/Screens/HomeWeather';
import AddNewShort from '../Short/screens/AddNewShort';
import PageProfile from '../user/screens/PageProfile';
import ShortsOfUser from '../user/screens/ShortsOfUser';
import Songs from '../Short/screens/Songs';
const HomeStack = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}
        >
            <Tab.Screen name="Home" component={HomeDrawer} />
            <Tab.Screen name="Shorts" component={Shorts} />
            <Tab.Screen name="Weather" component={HomeWeather} />
            <Tab.Screen name="Personal" component={ProfileStack} />
        </Tab.Navigator>
    );
};
const screenOptions = ({ route }) => ({
    headerShown: false,
    headerTitleStyle: {
        fontFamily: FONT.primary,
    },
    tabBarLabelStyle: {
        fontFamily: FONT.primary,
    },
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: {
            fontFamily: FONT.primary,
        },
    },
    tabBarIcon: ({ focused }) => {
        if (focused) {
            if (route.name === 'Home') {
                return <ICON name='earth' size={24} color={'black'}/>
            } else if (route.name === 'Shorts') {
                return <ICON name='caret-forward-circle' size={24} color={'black'}/>
            } else if (route.name == 'Weather') {
                return <ICON name='cloudy-night' size={24} color={'black'}/>
            } else if (route.name == 'Personal') {
                return <ICON name='person' size={24} color={'black'}/>
            }
        }
        else {
            if (route.name === 'Home') {
                return <ICON name='earth-outline' size={24} color={'black'}/>
            } else if (route.name === 'Shorts') {
                return <ICON name='caret-forward-circle-outline' size={24} color={'black'}/>
            } else if (route.name == 'Weather') {
                return <ICON name='cloudy-night-outline' size={24} color={'black'}/>
            } else if (route.name === 'Personal') {
                return <ICON name='person-outline' size={24} color={'black'}/>
            }
        }
    },
    tabBarLabel: ({ focused, color, size }) => {
        if (focused) {
            if (route.name === 'Home') {
                return <Text style={{ color: 'black', fontSize: 14, marginBottom: 7 ,fontFamily:FONT.primary}}>Home</Text>
            } else if (route.name === 'Shorts') {
                return <Text style={{ color: 'black', fontSize: 14, marginBottom: 7 ,fontFamily:FONT.primary}}>Shorts</Text>
            } else if (route.name == 'Weather') {
                return <Text style={{ color: 'black', fontSize: 14, marginBottom: 7 ,fontFamily:FONT.primary}}>Weather</Text>
            }
            else if (route.name == 'Personal') {
                return <Text style={{ color: 'black', fontSize: 14, marginBottom: 7 ,fontFamily:FONT.primary}}>Personal</Text>
            }
        }
        else {
            if (route.name === 'Home') {
                return <Text style={{ color: '#555555', fontSize: 14, marginBottom: 7,fontFamily:FONT.primary }}>Home</Text>
            } else if (route.name === 'Shorts') {
                return <Text style={{ color: '#555555', fontSize: 14, marginBottom: 7 ,fontFamily:FONT.primary}}>Shorts</Text>
            } else if (route.name == 'Weather') {
                return <Text style={{ color: '#555555', fontSize: 14, marginBottom: 7 ,fontFamily:FONT.primary}}>Weather</Text>
            } else if (route.name == 'Personal') {
                return <Text style={{ color: '#555555', fontSize: 14, marginBottom: 7 ,fontFamily:FONT.primary}}>Personal</Text>
            }
        }
    }
});
const HomeNavigation = () => {
    return (
        <View style={{ backgroundColor: 'black', height: '100%', width: '100%' }}>

            <Stack.Navigator initialRouteName='Home' screenOptions={{

                headerShown: false
            }} >
                <Stack.Screen name="HomeStack" component={HomeStack} />
                <Stack.Screen name="DetailScreen" component={DetailScreen} />
                <Stack.Screen name="Short" component={Shorts}/>
                <Stack.Screen name="Profile" component={ProfileStack} />
                <Stack.Screen name="AddNew" component={AddNew} options={{ headerShown: true, headerTitleStyle:{fontFamily:FONT.primary, fontSize:22} }} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
                <Stack.Screen name="Bookmark" component={Bookmark} options={{ headerShown: true, title:'Search news', headerTitleStyle:{fontFamily:FONT.primary, fontSize:22} }}/>
                <Stack.Screen name="NewDetail" component={NewDetail} options={{ headerShown: true, title:'News', headerTitleStyle:{fontFamily:FONT.primary, fontSize:22} }} />
                <Stack.Screen name="HomeWeather" component={HomeWeather} />
                <Stack.Screen name="AddNewShort" component={AddNewShort} options={{ headerShown: true,title:'Create news', headerTitleStyle:{fontFamily:FONT.primary, fontSize:22} }}/>
                <Stack.Screen name="PageProfile" component={PageProfile} options={{ headerShown: true,title:'Page', headerTitleStyle:{fontFamily:FONT.primary, fontSize:22} }}/>
                <Stack.Screen name="ShortsOfUser" component={ShortsOfUser} options={{ headerShown: true, title:'Shorts', headerTitleStyle:{fontFamily:FONT.primary, fontSize:22} }}/>
                <Stack.Screen name="Songs" component={Songs} options={{ headerShown: true,title:'Music', headerTitleStyle:{fontFamily:FONT.primary, fontSize:22} }}/>
            </Stack.Navigator>

        </View>
    )
}

export default HomeNavigation