import {
    Image, StyleSheet, Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    ToastAndroid,
    KeyboardAvoidingView,
    ScrollView,
    Pressable, Dimensions, Keyboard
} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Register, login } from '../UserHttp';
import { UserContext } from '../UserContext';
import { getToken, setToken } from '../../../helper/AsyncStorageHelper';
import { AppConstanst } from '../../../helper/AppConstanst';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FONT } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWith = Dimensions.get('window').width;

const Login = (props) => {
    const  navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const [pasHident, SetPasHident] = useState(true);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // Bàn phím xuất hiện, đặt biến thành true
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // Bàn phím ẩn đi, đặt biến thành false
            }
        );

        // Cleanup khi component bị unmount
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    // validate email
    const handeCheckEmail = (text) => {
        //const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const emailRegex = /.*/;
        setUsername(text)
        if (emailRegex.test(text)) {
            setCheckEmail(false)
        } else {
            setCheckEmail(true)
        }
    }
    // validate Password
    const handeCheckPassword = (text) => {
        //const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const passwordRegex = /.*/;
        setPassword(text)
        if (passwordRegex.test(text)) {
            setCheckPassword(false)
        } else {
            setCheckPassword(true)
        }
    }

    const handeLogin = async () => {
        try {
            const result = await login(username, password);
            if(result.status ==1){
                console.log('token', result.body.token);
                await setToken(AppConstanst.TOKEN, result.body.token)
                await AsyncStorage.setItem('character', JSON.stringify(result.body));
                setUser(result.body)
                setTimeout(() => {
                    navigation.navigate("Profile")
                }, 1000);
            }

        } catch (error) {
            ToastAndroid.show('Login Failed', ToastAndroid.SHORT)
            console.log(error);
        }
    }

    return (
        <KeyboardAvoidingView style={{ height: '100%', width: '100%' }}>
            <View style={{ height: '25%', width: '100%', justifyContent: 'space-between', flexDirection: 'column', marginStart: 10 }}>
                <View style={{ height: '100%', width: '100%' }}>
                    {/* logo */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../media/imgae/new.png')} style={{ height: 140, width: 150 }} />
                        <Text style={{ fontSize: 18, color: 'black', position: 'absolute', start: 20, bottom: 10, fontFamily: FONT.primary }}>
                            <Text style={{ fontSize: 48, color: 'white', fontFamily: FONT.primary }}>N</Text>
                            <Text style={{ fontSize: 38, color: 'black', fontFamily: FONT.primary }}>EWSPANB</Text>
                        </Text>

                    </View>

                </View>
            </View>
            <View style={{ height: '50%', width: '100%', backgroundColor: '#F5F5F5' }}>
                {isKeyboardVisible? null :                 <View style={{ height: '12%', width: '100%', alignItems: 'center', }}>
                    <View style={{ height: '100%', width: '100%', justifyContent: 'center', }}>
                        <Text style={{ fontFamily: 'Arial', fontSize: 40, color: 'blue', fontFamily: FONT.primary, marginStart: 30, }}>Wellcome!</Text>
                    </View>
                </View> }

                <View style={{ height: '100%', width: '100%' }}>
                    <Text style={{ fontFamily: 'Arial', fontSize: 24, color: 'black', marginStart: 30, marginTop: 20, fontFamily: FONT.primary }}>Login In Your Account!</Text>
                    <View style={{ width: windowWith - 60, marginStart: 30, backgroundColor: 'white', height: 42, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <ICON name='person-circle-outline' size={18} color={'black'} />
                        <TextInput value={username} onChangeText={text => handeCheckEmail(text)} placeholder='Email' style={{ width: '80%', marginStart: 10, fontFamily: FONT.primary }} />
                        {checkEmail ? <Text style={{ color: 'red', position: 'absolute', bottom: -18, fontFamily: FONT.primary }}>Wrong format email</Text> : null}
                    </View>
                    <View style={{ width: windowWith - 60, marginStart: 30, backgroundColor: 'white', height: 42, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <ICON name='lock-closed-outline' size={18} color={'black'} />
                        {/* onChangeText ={text => handeCheckPassword(text)} */}
                        <TextInput value={password} onChangeText={setPassword} placeholder='Password' style={{ width: '75%', marginStart: 10, fontFamily: FONT.primary }}
                            secureTextEntry={pasHident ? true : false} />
                        <TouchableOpacity style={{ height: '100%', width: '15%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => SetPasHident(!pasHident)}
                        >
                            {!pasHident ? <ICON name='eye-outline' size={18} color={'black'} /> : <ICON name='eye-off-outline' size={18} color={'black'} />}
                        </TouchableOpacity>
                        {checkPassword ? <Text style={{ color: 'red', position: 'absolute', bottom: -18, fontFamily: FONT.primary }}>Wrong format Password</Text> : null}

                    </View>
                    <View style={{ width: windowWith - 60, marginStart: 30, height: 42, marginTop: 20, alignItems: 'flex-end', flexDirection: 'row' }}>
                        <TouchableOpacity style={{ height: '100%', width: '50%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('Register')
                            }
                        >
                            <Text style={{ color: 'blue', fontFamily: FONT.primary }}>Create new account!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: '100%', width: '50%', alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => navigation.navigate('ForgotPassword')
                            }
                        >
                            <Text style={{ color: 'red', fontFamily: FONT.primary }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: windowWith - 60, marginStart: 30, height: 50, alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => handeLogin()} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', borderRadius: 10 }}
                        >
                            <Text style={{ color: 'white', fontFamily: FONT.primary }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {isKeyboardVisible ? null :
                <View style={{ height: '20%', width: '100%', backgroundColor: '#F5F5F5' }}>
                    <View style={{ height: '100%', width: '100%', flexDirection: 'column' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 1 }}>
                            <Text style={{ fontFamily: FONT.primary }}>or continue with</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 50, width: windowWith - 60, marginStart: 30, justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ height: '100%', width: '40%', alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#EEF1F4', flexDirection: 'row' }}
                            >
                                <Image source={require('../../../media/imgae/IconF.png')}></Image>
                                <Text style={{ color: '#667080', marginStart: 10, fontFamily: FONT.primary }}>FaceBook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: '100%', width: '40%', alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#EEF1F4', flexDirection: 'row' }}
                            >
                                <Image source={require('../../../media/imgae/IconG.png')}></Image>
                                <Text style={{ color: '#667080', marginStart: 10, fontFamily: FONT.primary }}>Google</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }



        </KeyboardAvoidingView>
    );
}
// Create new user
const ThreeComponent = () => {
    const [page, setPage] = useState(SIGN_IN);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pasHident, SetPasHident] = useState(true);
    const { setUser } = useContext(UserContext);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false)
    // validate user
    const handeCheckUser = (text) => {
        //const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const emailRegex = /.*/;
        setUsername(text)
        if (emailRegex.test(text)) {
            setCheckEmail(false)
        } else {
            setCheckEmail(true)
        }
    }
    // validate email
    const handeCheckEmail = (text) => {
        //const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const emailRegex = /.*/;
        setEmail(text)
        if (emailRegex.test(text)) {
            setCheckEmail(false)
        } else {
            setCheckEmail(true)
        }
    }
    // validate Password
    const handeCheckPassword = (text) => {
        //const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const passwordRegex = /.*/;
        setPassword(text)
        if (passwordRegex.test(text)) {
            setCheckPassword(false)
        } else {
            setCheckPassword(true)
        }
    }
    // đăng kí mới
    const handeRegister = async () => {
        try {
            const result = await Register(username, email, password);
            console.log(result);
            ToastAndroid.show("Create User Succesfuly", ToastAndroid.SHORT)
            setPage(SIGN_IN);
        } catch (error) {
            console.log(error)
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        }
    }
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <Text style={{ fontFamily: 'Arial', fontSize: 20, color: 'black', marginStart: 30, marginTop: 20 }}>Create Your Account!</Text>
            <View style={{ width: windowWith - 60, marginStart: 30, backgroundColor: 'white', height: 42, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../media/imgae/Icon.png')} style={{ marginStart: 5 }}></Image>
                <TextInput value={username} onChangeText={text => handeCheckUser(text)} placeholder='User name' style={{ width: '80%', marginStart: 10 }} />
                {checkEmail ? <Text style={{ color: 'red', position: 'absolute', bottom: -18 }}>Wrong format username</Text> : null}
            </View>
            <View style={{ width: windowWith - 60, marginStart: 30, backgroundColor: 'white', height: 42, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../media/imgae/Icon.png')} style={{ marginStart: 5 }}></Image>
                <TextInput value={email} onChangeText={text => handeCheckEmail(text)} placeholder='Email' style={{ width: '80%', marginStart: 10 }} />
                {checkEmail ? <Text style={{ color: 'red', position: 'absolute', bottom: -18 }}>Wrong format email</Text> : null}
            </View>
            <View style={{ width: windowWith - 60, marginStart: 30, backgroundColor: 'white', height: 42, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../../media/imgae/Icon.png')} style={{ marginStart: 5 }}></Image>
                <TextInput value={password} onChangeText={text => handeCheckPassword(text)} placeholder='Fill Your Password' style={{ width: '75%', marginStart: 10 }}
                    secureTextEntry={pasHident ? true : false} />
                <TouchableOpacity style={{ height: '100%', width: '15%', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => SetPasHident(!pasHident)}
                >
                    <Image source={require('../../../media/imgae/Icon.png')} style={{ height: '60%', width: '60%' }}></Image>
                </TouchableOpacity>
                {checkPassword ? <Text style={{ color: 'red', position: 'absolute', bottom: -18 }}>Wrong format Password</Text> : null}
            </View>

            <View style={{ width: windowWith - 60, marginStart: 30, height: 50, alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={handeRegister} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', borderRadius: 10 }}
                >
                    <Text style={{ color: 'white', fontFamily: FONT.primary }}>Create</Text>
                </TouchableOpacity>
            </View>



        </View>
    );
}

export default Login