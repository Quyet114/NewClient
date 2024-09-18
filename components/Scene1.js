import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import Scene2 from './Scene2';
import Scene3 from './Scene3';
// props dữ liệu truyền từ components cha sang components con
const Scene1 = (props) => {
    const { Children, ho_Ten } = props;
    const [names, setNames ] = useState(["Nguyen Van A","Nguyen Van B", "Nguyen Van C", "Tran Van D"]);
    const [name,setName] = useState(null);
    const {setNum1,setNum2,setNum3} = props;
    // const [luckyIndex,setLuckyIndex] = useState(-1);
    const [cart, setCart] = useState([
        { id: 1, name: 'Phone', price: 2000, quatity: 1 },
        { id: 2, name: 'Phone1', price: 20000, quatity: 1 },
        { id: 3, name: 'Phone2', price: 20000, quatity: 1 },
        { id: 4, name: 'Phone3', price: 20000, quatity: 1 }
    ]);
    const onButtonPress = () =>{
        const newValue = Math.floor(Math.random() * names.length)
        const newName = names[newValue];
        setName(newName)
    }
    const QuaySoMayMan = () =>{
        const newNum1 = Math.floor(Math.random() * 90)+1;
        const newNum2 = Math.floor(Math.random() * 90)+1;
        const newNum3 = Math.floor(Math.random() * 90)+1;
        setNum1==newNum1;
        setNum2==newNum2;
        setNum3==newNum3;
        if(setNum1==heSoA && setNum2 == heSoB & setNum3==heSoC){
            return setKetQua("ban da trung thuong")
        }else{
            setKetQua("Ban da khong trung thuong")
            console.log(newNum1,newNum2,newNum3);
        }
    }
    const total = () => {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].quatity
        }
        return total;
    }
    const [number, setNumber] = useState(0);
    const [heSoA, setHeSoA] = useState(undefined);
    const [heSoB, setHeSoB] = useState(undefined);
    const [heSoC, setHeSoC] = useState(undefined);
    const [ketQua, setKetQua] = useState(undefined);
    const GiaiPTBac2 = () => {
        console.log("ok");
        const delta = heSoB * heSoB - 4 * heSoA * heSoC;
        if (delta > 0) {
            // Phương trình có 2 nghiệm
            const x1 = (-heSoB + Math.sqrt(delta)) / (2 * heSoA);
            const x2 = (-heSoB - Math.sqrt(delta)) / (2 * heSoA);
            setKetQua("Phương trình có 2 nghiệm: "+ x1 + "," +x2);
        } else if (delta === 0) {
            // Phương trình có nghiệm kép
            const x = -heSoB / (2 * heSoA);
            setKetQua("Phương trình có nghiệm kép: "+ x);
        } else {
            // Phương trình vô nghiệm
            setKetQua("Phương trình vô nghiệm");
        }

    }
    return (
        <View style={{ backgroundColor: 'yellow', width: '100%', height: '100%' }}>
            <Text>{ho_Ten}</Text>
            {/* <Text>{name}</Text>
            
            <Text>List Name:</Text>
            {
                names.map((item, index) => {
                    return <Text style={{fontSize : luckyIndex == index ? 30  : 15}} 
                    key = {index}>{item}</Text>
                })
            }
            */}
            <Button title='Press' onPress={onButtonPress}/> 

            {
                cart.map((item, index) => {
                    const { name, price, quatity } = item
                    return (
                        <Text key={index}>
                            {name}-{price}-{quatity}
                        </Text>
                    )
                })
            }
            <Text>Tổng tiền: {total()}</Text>
            <Scene2 number={number} ketQua={ketQua} name={name}/>
            <Button
                title="Tăng"
                onPress={() => {
                    setNumber(number + 1)
                }}
            />
            <TextInput
                style={{ height: 40, backgroundColor: 'white' }}
                onChangeText={text => setHeSoA(text)}
                value={heSoA}
                placeholder="Nhập hệ số A"
                keyboardType="numeric"
            /><TextInput
                style={{ height: 40, backgroundColor: 'white' }}
                onChangeText={text => setHeSoB(text)}
                value={heSoB}
                placeholder="Nhập hệ số B"
                keyboardType="numeric"
            />
            <TextInput
                style={{ height: 40, backgroundColor: 'white' }}
                onChangeText={text => setHeSoC(text)}
                value={heSoC}
                placeholder="Nhập hệ số C"
                keyboardType="numeric"
            />
            <Button
                title="Giải PT"
                onPress={GiaiPTBac2}
            />
            <Button
                title="XoXo"
                onPress={QuaySoMayMan}
            />
            <Text style={{ fontSize: 20 }}>{ketQua}</Text>
            
            <Scene3/>

        </View>

    )
}

export default Scene1