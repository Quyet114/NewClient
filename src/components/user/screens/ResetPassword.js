import {
    StyleSheet, Text, View,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import React, { useState } from 'react'

const ResetPassword = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                <View style={{ padding: 24 }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../../../media/imgae/Back.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 16 }}>
                        <Text style={{
                            width: 162,
                            fontSize: 32,
                            fontWeight: '700',
                            lineHeight: 48,
                            letterSpacing: 0.12,
                            color: '#4E4B66'
                        }}>Reset Password</Text>
                    </View>
                    <View style={{ marginTop: 13 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.fs14fw400lh21ls012, styles.cl4e4b66]}>New Password</Text>
                            <Text style={[styles.fs14fw400lh21ls012, styles.clc30052]}>*</Text>
                        </View>
                        <View style={{ position: 'relative' }}>
                            <TextInput
                                style={styles.textinput}
                                secureTextEntry={!showpassword} />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showpassword)}
                                style={{
                                    position: 'absolute',
                                    top: 17,
                                    end: 10
                                }}>
                                <Image
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: '#4e4b66'
                                    }}
                                    source={showpassword ? require('../../../media/imgae/Back.png') : require('../../../media/imgae/Back.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 13 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.fs14fw400lh21ls012, styles.cl4e4b66]}>Confirm new password</Text>
                            <Text style={[styles.fs14fw400lh21ls012, styles.clc30052]}>*</Text>
                        </View>
                        <View style={{ position: 'relative' }}>
                            <TextInput
                                style={styles.textinput}
                                secureTextEntry={!hidepassword} />
                            <TouchableOpacity
                                onPress={() => setHidePassword(!hidepassword)}
                                style={{
                                    position: 'absolute',
                                    top: 16,
                                    end: 10,
                                }}>
                                <Image
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: '#4e4b66'
                                    }}
                                    source={hidepassword ? require('../../../media/imgae/Back.png') : require('../../../media/imgae/Back.png')} />
                            </TouchableOpacity>
                        </View>
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
                    onPress={() => navigation.navigate('Congratulations')}
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
                    }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    clc30052: {
        color: '#c30052'
    },
    cl4e4b66: {
        color: '#4e4b66'
    },
    fs14fw400lh21ls012: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0.12
    },
    textinput: {
        borderWidth: 1,
        borderColor: '#4e4b66',
        borderRadius: 6,
        marginTop: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    }
})