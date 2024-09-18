import {
    StyleSheet, Text, View,
    ToastAndroid,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import React, { useState } from 'react'
import { sendMail } from '../UserHttp';
import { FONT } from '../../../constain/fontFamilies';
const ForgotPassword = (props) => {
    const { navigation } = props;
    const [user, setUser] = useState('');
    const handeSendMail = async () => {
        try {
            await sendMail(user);
            ToastAndroid.show("Send mail Succesfuly", ToastAndroid.SHORT)
            setTimeout(() => {
                navigation.navigate('Login');
            }, 2000);
        } catch (error) {
            console.log(error)
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        }
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <View style={{ padding: 24 }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            {/* <Image source={require('../../../media/pictures/back.png')} /> */}
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={{
                            width: 186,
                            fontSize: 32,
                            fontFamily:FONT.primary,
                            lineHeight: 48,
                            letterSpacing: 0.12,
                            color: '#4e4b66'
                        }}>Forgot Password ?</Text>
                        <Text style={{
                            width: 325,
                            fontSize: 16,
                            fontFamily:FONT.primary,
                            lineHeight: 24,
                            letterSpacing: 0.12,
                            color: '#4e4b66',
                            marginTop:20
                        }}>Don’t worry! it happens. Please enter the
                            address associated with your account.</Text>
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={{
                            fontSize: 14,
                            fontFamily:FONT.primary,
                            lineHeight: 21,
                            letterSpacing: 0.12,
                            color: '#4e4b66'
                        }}>Email</Text>
                        <TextInput
                            onChangeText={setUser}
                            style={{
                                borderWidth: 1,
                                marginTop: 4,
                                borderRadius: 6,
                                backgroundColor: '#fff',
                                color: '#4e4b66',
                                padding: 10,
                                fontFamily:FONT.primary,
                                
                            }} />
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    height: 130,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.05)',
                    paddingHorizontal: 24,
                    paddingVertical: 40
                }}>
                <TouchableOpacity
                    onPress={() => handeSendMail()}
                    style={{
                        height: 50,
                        backgroundColor: '#1877f2',
                        borderRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{
                        fontSize: 16,
                        fontFamily:FONT.primary,
                        lineHeight: 24,
                        letterSpacing: 0.12,
                        color: '#fff'
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    }
})