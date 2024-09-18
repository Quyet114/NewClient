import {     StyleSheet, Text, View,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput } from 'react-native'
import React from 'react'

const Verification = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ padding: 24 }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            {/* <Image
                                source={require('../../../media/pictures/back.png')} /> */}
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 27, alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 32,
                            fontWeight: '700',
                            lineHeight: 48,
                            letterSpacing: 0.12,
                            color: '#4e4b66'
                        }}>OTP Verifation</Text>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            lineHeight: 24,
                            letterSpacing: 0.12,
                            color: '#4e4b66',
                            marginTop: 8
                        }}>Enter the OTP sent to +67-1234-5678-9</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: 27 }}>
                        <TextInput
                            maxLength={1}
                            keyboardType='numeric'
                            style={styles.textinput} />
                        <TextInput
                            maxLength={1}
                            keyboardType='numeric'
                            style={styles.textinput} />
                        <TextInput
                            style={styles.textinput}
                            maxLength={1}
                            keyboardType='numeric' />
                        <TextInput
                            style={styles.textinput}
                            maxLength={1}
                            keyboardType='numeric' />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                lineHeight: 21,
                                letterSpacing: 0.12,
                                color: '#4e4b66'
                            }}>Resend conde in </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                lineHeight: 21,
                                letterSpacing: 0.12,
                                color: "#C30052"
                            }}>56s</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{
                height: 130,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.05)',
                paddingHorizontal: 24,
                paddingVertical: 40
            }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPassword')}
                    style={{
                        height: 50,
                        backgroundColor: '#1877f2',
                        borderRadius: 6,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        lineHeight: 24,
                        letterSpacing: 0.12,
                        color: '#fff'
                    }}>Verify</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Verification

const styles = StyleSheet.create({
    textinput: {
        width: 64,
        height: 64,
        borderWidth: 1,
        borderColor: '#4e4b66',
        borderRadius: 6,
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 48,
        letterSpacing: 0.12,
        color: '#050505'
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    }
})