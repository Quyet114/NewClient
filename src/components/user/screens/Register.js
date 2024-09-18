import {
    StyleSheet, Text, View,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,
    ToastAndroid,
    KeyboardAvoidingView,
    ScrollView, Dimensions
} from 'react-native'
import React, { useState, useContext } from 'react';
import { register, login } from '../UserHttp';
import { FONT } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const windowWith = Dimensions.get('window').width;
const Register = (props) => {
    const navigatetion = useNavigation()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pasHident, SetPasHident] = useState(true);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);

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
    const handeRegister = async () => {
        try {
            console.log(username, email, password);
            const result = await register(username, email, password);
            console.log(result);
            ToastAndroid.show("Create User Succesfuly", ToastAndroid.SHORT)
            setTimeout(() => {
                navigatetion.goBack();
            }, 2000);
        } catch (error) {
            console.log(error)
            ToastAndroid.show("Failed", ToastAndroid.SHORT)
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
            <View style={{ height: '100%', width: '100%' }}>
                <Text style={{ fontFamily: 'Arial', fontSize: 20, color: 'black',fontFamily: FONT.primary, marginStart: 30, marginTop: 20 }}>Create Your Account!</Text>
                <View style={{ width: windowWith - 60, marginStart: 30, backgroundColor: 'white', height: 42, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                <ICON name='person-circle-outline' size={18} color={'black'} />
                <TextInput value={username} onChangeText={text => handeCheckUser(text)} placeholder='User name' style={{ width: '80%', marginStart: 10,fontFamily: FONT.primary }} />
                    {checkEmail ? <Text style={{ color: 'red', position: 'absolute', bottom: -18 ,fontFamily: FONT.primary}}>Wrong format username</Text> : null}
                </View>
                <View style={{ width: windowWith - 60, marginStart: 30, backgroundColor: 'white', height: 42, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                <ICON name='mail-outline' size={18} color={'black'} />
                <TextInput value={email} onChangeText={text => handeCheckEmail(text)} placeholder='Email' style={{ width: '80%', marginStart: 10 ,fontFamily: FONT.primary}} />
                    {checkEmail ? <Text style={{ color: 'red', position: 'absolute', bottom: -18,fontFamily: FONT.primary }}>Wrong format email</Text> : null}
                </View>
                <View style={{ width: windowWith - 60, marginStart: 30, backgroundColor: 'white', height: 42, marginTop: 20, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                <ICON name='lock-closed-outline' size={18} color={'black'} />
                <TextInput value={password} onChangeText={text => handeCheckPassword(text)} placeholder='Fill Your Password' style={{ width: '75%', marginStart: 10 ,fontFamily: FONT.primary}}
                        secureTextEntry={pasHident ? true : false} />
                    <TouchableOpacity style={{ height: '100%', width: '15%', alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => SetPasHident(!pasHident)}
                    >
                        {!pasHident ? <ICON name='eye-outline' size={18} color={'black'} /> : <ICON name='eye-off-outline' size={18} color={'black'} />}
                        </TouchableOpacity>
                    {checkPassword ? <Text style={{ color: 'red', position: 'absolute', bottom: -18,fontFamily: FONT.primary }}>Wrong format Password</Text> : null}
                </View>

                <View style={{ width: windowWith - 60, marginStart: 30, height: 50, alignItems: 'center', marginTop: 20 }}>
                    <TouchableOpacity onPress={handeRegister} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', borderRadius: 10 }}
                    >
                        <Text style={{ color: 'white', fontFamily: FONT.primary}}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: '30%', width: '100%', backgroundColor: '#F5F5F5' }}>
                <View style={{ height: '100%', width: '100%', flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', margin: 1 }}>
                        <Text style={{}}>or continue with</Text>
                    </View>
                    <View style={{ flexDirection: 'row', height: 50, width: windowWith - 60, marginStart: 30, justifyContent: 'space-between' }}>
                        <TouchableOpacity style={{ height: '100%', width: '40%', alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#EEF1F4', flexDirection: 'row' }}
                        >
                            <Image source={require('../../../media/imgae/IconF.png')}></Image>
                            <Text style={{ color: '#667080', fontWeight: 'bold', marginStart: 10 }}>FaceBook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: '100%', width: '40%', alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#EEF1F4', flexDirection: 'row' }}
                        >
                            <Image source={require('../../../media/imgae/IconG.png')}></Image>
                            <Text style={{ color: '#667080', fontWeight: 'bold', marginStart: 10 }}>Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>

    );
}
export default Register