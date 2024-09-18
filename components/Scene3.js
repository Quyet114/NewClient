import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Scene3 = () => {
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View style={styles.view1}></View>
                <View style={styles.view2}></View>
            </View>
            <View style={{
                alignItems:'center',
            }}>
                <View style={styles.view5}>
            </View>
            
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View style={styles.view3}></View>
                <View style={styles.view4}></View>
            </View>


        </View>
    )
}

export default Scene3
const styles = StyleSheet.create({
    view1: {
        width: 50,
        height: 50,
        backgroundColor: 'red'
    },
    view2: {
        width: 50,
        height: 50,
        backgroundColor: 'black'
    },
    view3: {
        width: 50,
        height: 50,
        backgroundColor: 'yellow'
    },
    view4: {
        width: 50,
        height: 50,
        backgroundColor: 'pink'
    },
    view5:{
        borderRadius:50,
        width: 50,
        height: 50,
        backgroundColor: 'pink'
    },
    container: {
    
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
        flexDirection: 'column', // default
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
})