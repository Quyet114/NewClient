import { View, Text, SafeAreaView, StatusBar, Image, TextInput, TouchableOpacity, Dimensions, Alert, ToastAndroid, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState, useContext } from 'react'
const windowWith = Dimensions.get('window').width
import { useNavigation } from '@react-navigation/native';
const Login = (props) => {
    const  navigation = useNavigation()
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkName, setCheckName] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false)
    const handeCheckName = (text) => {
        setName(text)
        if(name.length <3){
            setCheckName(false)
        }else{
            setCheckName(true)
        }
    }
    const handeCheckEmail = (text) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setUsername(text)
        if (emailRegex.test(text)) {
            setCheckEmail(false)
        } else {
            setCheckEmail(true)
        }
    }
    const handeCheckPassword = (text) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setPassword(text)
        if (passwordRegex.test(text)) {
            setCheckPassword(false)
        } else {
            setCheckPassword(true)
        }
    }
    const handleLogin = () => {
        if (checkEmail==false && checkPassword==false && checkName===true) {
            // username === 'quyet@gmail.com' && password==='Quyet!123'
            // Đăng nhập thành công, chuyển đến màn hình Tìm kiếm
            props.navigation.navigate('Seach')
        } else {
            ToastAndroid.show('Đăng nhập không thành công', ToastAndroid.SHORT)
        }
    };
    return (
        <View style={{ width: windowWith - 20, marginStart: 10, flex: 1, height: '100%', flexDirection: 'column' }}>
            <View style={{ height: 40, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 50, height: 40, width: 40, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Image source={require('../src/media/imgae/Back.png')} style={{}} />
                </TouchableOpacity>
                <Text></Text>
                <View></View>
            </View>
            <View style={{ width: '100%', margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 500, color: 'black' }}>Create your account</Text>
            </View>
            <View style={{ marginTop: 20, justifyContent: 'space-between', height: 150 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 80, width: '100%' }}>
                    <TouchableOpacity  style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', height: 50, borderRadius: 50, backgroundColor: 'blue', flexDirection: 'row', marginBottom: 20 }}>
                        <Image source={require('../src/media/imgae/IconF.png')} style={{ margin: 5, height: 40, width: 40 }} />
                        <Text style={{ color: 'white', fontWeight: 500, }} >CONTINUTE WITH FACEBOOK</Text>
                        <View></View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', height: 50, borderRadius: 50, backgroundColor: 'white', flexDirection: 'row', borderWidth: 1, borderColor: 'gray' }}>
                        <Image source={require('../src/media/imgae/IconG.png')} style={{ margin: 5, height: 40, width: 40 }} />
                        <Text style={{ color: 'gray', fontWeight: 500, }} >CONTINUTE WITH GOOGLE</Text>
                        <View></View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 400, color: 'gray' }}>ATAU LOGIN IN DENGAN EMAIL</Text>
            </View>
            <View style={{ width: '100%', height: 220, justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', }}>
                    <TextInput onChangeText={text => handeCheckName(text)} placeholder='Enter your name' style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}></TextInput>
                    {checkName ? <Image source={require('../src/media/imgae/V.png')} style={{position: 'absolute', bottom:10, end:5 }}/> : null}
                </View>
                <View style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <TextInput onChangeText={text => handeCheckEmail(text)} placeholder='Enter your email' style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: 'gray', borderRadius: 5, alignItems:'center', justifyContent:'center' }}></TextInput>
                    {checkEmail ? <Image source={require('../src/media/imgae/X.png')} style={{position: 'absolute', bottom:10, end:5 }}/> : <Image source={require('../src/media/imgae/V.png')} style={{position: 'absolute', bottom:10, end:5 }}/>}
                </View>
                <View style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <TextInput onChangeText ={text => handeCheckPassword(text)} placeholder='Enter your password' style={{ width: '100%', height: '100%', borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}></TextInput>
                    {checkPassword ? <Image source={require('../src/media/imgae/X.png')} style={{position: 'absolute', bottom:10, end:5 }}/> : <Image source={require('../src/media/imgae/V.png')} style={{position: 'absolute', bottom:10, end:5 }}/>}
                </View>
            </View>
            <View style={{ marginTop: 20, justifyContent: 'space-between', height: 150 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 80, width: '100%' }}>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 15 }}>
                        <View style={{ width: '50%' }}>
                            <Text>I have read the</Text>
                            <TouchableOpacity style={{ position: 'absolute', end: 0 }}>
                                <Text style={{ color: 'blue' }}>Privace Police</Text>
                            </TouchableOpacity>
                        </View>
                        <Image source={require('../src/media/imgae/Home.png')} />
                    </View>
                    <TouchableOpacity onPress={handleLogin} style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 60, borderRadius: 50, backgroundColor: 'blue', marginTop: 20 }}>
                        <Text style={{ color: 'white', fontWeight: 500, }} >GET STARTED</Text>
                        <View></View>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Login
