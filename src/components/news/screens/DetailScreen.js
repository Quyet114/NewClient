import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getNewDetail } from '../newsHttp'
const DetailScreen = (props) => {
    const { navigation, route: { params: { id } } } = props
    const [newsDetail, setNewsDetail] = useState({});
    const timeAt = new Date(newsDetail.createdAt);
    const currentTime = new Date();
    const timeDifference = currentTime - timeAt;
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;
                const result = await getNewDetail(id);
                setNewsDetail(result);
                console.log(result);
            } catch (error) {
                console.log('>>>>>fetch data: ', error);
            }
        }
        fetchData();
    }, [])
    function formatTimeDifference(timeDifference) {
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        if (days > 0) {
            return `${days} ngày`;
        } else if (hours > 0) {
            return `${hours} giờ`;
        } else {
            return `${minutes} phút`;
        }
    }
    const formattedTimeDifference = formatTimeDifference(timeDifference);
    return (
        <View style={{ backgroundColor: '#FFFFFF', height: '100%', width: '100%', alignItems: 'center' }}>
            <View style={{ height: 120, width: '90%', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
                <View style={{ height: '50%', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../../media/imgae/Back.png')} style={{ marginStart: 10 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Image source={require('../../../media/imgae/Share.png')} style={{ marginEnd: 10, }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../../../media/imgae/ThreeDot.png')} style={{ marginEnd: 5 }} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ height: 60, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ height: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={{ marginStart: 10 }}>
                            <Image source={require('../../../media/imgae/BIGBBC.png')} style={{ width: 50, marginEnd: 10, height: 50, borderRadius: 10 }} />
                        </TouchableOpacity>
                        <View style={{ marginStart: 10, height: '70%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>BBC News</Text>
                            <Text>{formattedTimeDifference}</Text>
                        </View>

                    </View>
                    <TouchableOpacity style={{ height: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', width: 100, borderRadius: 8 }} >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Following</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ width: '90%', }} showsVerticalScrollIndicator={false}>
                <View style={{ height: 260, width: '100%', justifyContent: 'space-between' }}>
                    {newsDetail.picture? <Image source={{ uri: newsDetail.picture }} style={{ width: '100%', marginEnd: 10, height: 240, borderRadius: 10 }} />: null}
                    <Text>Eroupe</Text>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Text style={{ fontSize: 24, color: 'black', fontFamily: 'Poppins', fontWeight: 'normal' }}>{newsDetail.name}</Text>
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins', fontWeight: 400, letterSpacing: 0.12, lineHeight: 24 }}>{newsDetail.about}</Text>
                </View>

            </ScrollView>
            <View style={{ height: 60, width: '100%', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.4, borderBlockColor: 'gray', flexDirection: 'row' }}>
                <View style={{ height: 60, width: 100, alignItems: 'center', flexDirection: 'row', marginStart: 20 }}>
                    <Image source={require('../../../media/imgae/Heart.png')} style={{ width: 24, marginEnd: 10, height: 24, borderRadius: 10 }} />
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins', fontWeight: 'normal' }}>100K</Text>
                </View>
                <View style={{ height: 60, width: 100, alignItems: 'center', flexDirection: 'row', marginStart: -100 }}>
                    <Image source={require('../../../media/imgae/Comment.png')} style={{ width: 24, marginEnd: 10, height: 24, borderRadius: 10 }} />
                    <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins', fontWeight: 'normal' }}>100K</Text>
                </View>
                <View style={{ height: 60, alignItems: 'center', flexDirection: 'row', marginEnd: 10 }}>
                    <Image source={require('../../../media/imgae/BookmarkBlue.png')} style={{ width: 24, marginEnd: 10, height: 24, borderRadius: 10 }} />
                </View>
            </View>
        

        </View>
    )
}

export default DetailScreen