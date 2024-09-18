import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../news/screens/Home';
import WorldNew from '../news/screens/WorldNew';
import EntertaimentNew from '../news/screens/EntertaimentNew';
import SportNew from '../news/screens/SportNew';
import RuleNew from '../news/screens/RuleNew';
import MealNew from '../news/screens/MealNew';
import ScurityNew from '../news/screens/ScurityNew';
import HomeDrawerHeader from './HomeDrawerHeader';
import HomeDrawerContent from './HomeDrawerContent';
import { FONT } from '../../constain/fontFamilies';
import { COLOR } from '../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/Ionicons'

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
    return (
        <Drawer.Navigator drawerPosition="right"
        drawerContent={(props) => <HomeDrawerContent {...props} />}
        screenOptions={{
            header: ({ navigation }) => (
                <HomeDrawerHeader navigation={navigation} />
            ),
            drawerLabelStyle: {
                fontFamily: FONT.primary,
                fontSize:20,
                color:'black'
            },
        }}
        >
            <Drawer.Screen name="Home" component={Home}
            options={{
                drawerIcon: ({ color, size }) => (
                    <ICON name="home-outline" color={COLOR.D} size={18} />
                ),
            }}
            />
            <Drawer.Screen name="World" component={WorldNew} 
             options={{
                drawerIcon: ({ color, size }) => (
                    <ICON name="earth-outline" color={COLOR.D} size={18} />
                ),
            }}/>
            <Drawer.Screen name="Showbiz" component={EntertaimentNew} 
             options={{
                drawerIcon: ({ color, size }) => (
                    <ICON name="musical-notes-outline" color={COLOR.D} size={18} />
                ),
            }}/>
            <Drawer.Screen name="Sport" component={SportNew} 
             options={{
                drawerIcon: ({ color, size }) => (
                    <ICON name="football-outline" color={COLOR.D} size={18} />
                ),
            }}/>
            <Drawer.Screen name="Law" component={RuleNew} 
             options={{
                drawerIcon: ({ color, size }) => (
                    <ICON name="school-outline" color={COLOR.D} size={18} />
                ),
            }}/>
            <Drawer.Screen name="Cooking" component={MealNew} 
             options={{
                drawerIcon: ({ color, size }) => (
                    <ICON name="restaurant-outline" color={COLOR.D} size={18} />
                ),
            }}/>
            <Drawer.Screen name="Security" component={ScurityNew} 
             options={{
                drawerIcon: ({ color, size }) => (
                    <ICON name="shield-outline" color={COLOR.D} size={18} />
                ),
            }}/>
        </Drawer.Navigator>
    );
};

export default HomeDrawer;
