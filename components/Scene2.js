import { View, Text, Button } from 'react-native'
import React, { useState, useContext, createContext } from 'react'

const MyContext = createContext();

const AppContext = (props)=>{
    const [input, setInput] = useState();
    return (
        <MyContext.Provider value={{ input, setInput }}>
            {props.children}
        </MyContext.Provider>

    )
}
const ManHinh7_3 = () => {
    const {input} = useContext(MyContext);
    return (
        <View>
            <Text style={{ fontSize: 30 }}>{input}</Text>
        </View>
    )
}
const ManHinh7_4 = () => {
    const {setInput} = useContext(MyContext);
    return (
        <View>
            <Button title='OK' onPress={()=>setInput('Hello')}
            style={{fontSize:30}}
            />
        </View>
    )
}

const Scene2 = (props) => {
    return (
        <AppContext>
            <ManHinh7_3/>
            <ManHinh7_4/>
        </AppContext>
    )
}

export default Scene2