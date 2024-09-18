import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, FlatList, ScrollView, Modal, ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import { UserContext } from '../UserContext';
import { getMyRead, getMylike, getPostsByUser, getPostsTodayByUser } from '../../news/newsHttp';
import { getFollowersByStatus } from '../UserHttp';
import { deleteNew } from '../../news/newsHttp';
import { getUserById } from '../UserHttp';
import Login from './Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR, FONT, formatNumber } from '../../../constain/fontFamilies';
import LikeToday from '../userNews/LikeNToday';
import ReadNAll from '../userNews/ReadNAll';
import FollowNFollower from '../userNews/FollowNFollower';
import { getToken } from '../../../helper/AsyncStorageHelper';
import { useFocusEffect } from '@react-navigation/native';
import ICON from 'react-native-vector-icons/AntDesign'
const LIKE = 'LIKE';
const READ = 'READ';
const FOLLOW = 'FOLLOW'
const windowWith = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const renderItem = (item) => {
  const { id, image, category, title } = item.item;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 8, padding: 8, justifyContent: 'flex-start' }}>
      <View>
        {image ? <Image style={{ width: 96, height: 96, borderRadius: 6, }}
          source={{ uri: image }} /> : null}
      </View>
      <View style={{ marginLeft: 8, justifyContent: 'space-between', flex: 1 }}>
        <View>
          <Text>{category}</Text>
          <Text style={{ fontSize: 16, fontWeight: '400', lineHeight: 24, letterSpacing: 0.12, color: '#000' }} numberOfLines={2}>{title}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../../media/imgae/BBC.png')} />
            <Text style={{ color: 'black', margin: 5, fontWeight: 'bold' }}>BBC New</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginStart: 10 }}>
            <Image source={require('../../../media/imgae/Watch.png')} />
            <Text style={{ color: 'black', margin: 5 }}>04:00</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const Profile = (props) => {
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(LIKE);
  const { navigation } = props
  const [readNew, setReadNew] = useState([]);
  const [likeNew, setLikeNew] = useState([]);
  const [follow, setFollow] = useState([]);
  const [modelVisible, setModelVisible] = useState(false);
  const [fontFamily, setFontFamily] = useState(FONT.primary);
  const [totalLike, setTotalLike] = useState(0);
  const [totalRead, setTotalRead] = useState(0);
  const [totalDislike, setTotalDislike] = useState(0);
  useEffect(() => {
    // Cập nhật font khi FONT.primary thay đổi
    setFontFamily(FONT.primary);
  }, [FONT.primary]);
  useEffect(() => {
    // lấy danh sách bài viết đã like
    fetchMyLike()
    // lấy danh sách follow
    fetchMyFollow()
    // lọc danh sách bài viết đã đọc
    fetchMyRead()

  }, [user])
  useFocusEffect(
    useCallback(() => {
      fetchMyLike()
      fetchMyRead()
      fetchMyFollow()
    }, [])
  )
  const fetchMyRead = async () => {
    try {
      if (user?.authenticated === false) {
        const result = await getMyRead(user._id)
        //console.log('fetchMyRead: ', result);
        setReadNew(result)
      } else {
        const result = await getPostsByUser(user._id)
        //console.log('fetchMyRead: ', result);
        setReadNew(result.user.userPost)
        //console.log('getPostsByUser', result.user.userPost);

      }

    } catch (error) {
      console.log('fetchMyRead error: ', error);

    }

  }
  const fetchMyLike = async () => {
    try {
      if (user?.authenticated === false) {

        const result = await getMylike(user._id)
        setLikeNew(result)
        //console.log('fetchMyLike: ', result);
      } else {
        const result = await getPostsTodayByUser(user._id)
        setLikeNew(result.posts)
        //console.log('setLikeNew',result);

      }

    } catch (error) {
      console.log('fetchMyLike error: ', error);
    }

  }
  const fetchMyFollow = async () => {
    const status = (user.authenticated ? 1 : 2)
    //console.log('fetchMyFollow', status, user._id);

    try {
      const result = await getFollowersByStatus(user._id, status)
      setFollow(result)
      //console.log('fetchMyFollow: ', result);
    } catch (error) {
      //console.log('fetchMyFollow error: ', error);
    }

  }
  const calculateTotals = (readNew, likeNew) => {
    const totalShortReads = readNew.reduce((total, readNew) => total + readNew?.reads, 0);
    const totalShortDislike = readNew.reduce((total, readNew) => total + readNew?.unLikes, 0);
    const totalShortLikes = readNew.reduce((total, readNew) => total + readNew?.likes?.length, 0);

    const totalPostReads = likeNew.reduce((total, likeNew) => total + likeNew?.reads, 0);
    const totalPostDislike = likeNew.reduce((total, likeNew) => total + likeNew?.unLikes, 0);
    const totalPostLikes = likeNew.reduce((total, likeNew) => total + likeNew?.likes?.length, 0);
    setTotalRead(totalShortReads + totalPostReads);
    setTotalLike(totalShortLikes + totalPostLikes)
    setTotalDislike(totalShortDislike + totalPostDislike)
  };
  useEffect(
    () => {
      calculateTotals(readNew, likeNew)
    }, [readNew, likeNew]
  )
  const OpenModal = () => {
    setModelVisible(true);
  };
  const deleteN = async (_id) => {
    try {
      const response = await deleteNew(_id);
      ToastAndroid.show('Successfuly', ToastAndroid.SHORT)
    } catch (error) {
      console.log(error);
    }
  }
  if (!user) {
    return (<View style={{ flex: 1 }}>
      <Login />
    </View>)
  }
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY === 0) {
      // Nếu người dùng scroll lên đầu trang
      // Thực hiện hàm load lại dữ liệu
      reloadUserData();
    }
  };
  const pageChange = ({ page, likeNew, readNew }) => {
    if (page == LIKE) {
      return (<LikeToday dataLike={likeNew} />)
    } else if (page == READ) {
      return (<ReadNAll dataRead={readNew} />)
    } else {
      return (<FollowNFollower dataFollow={follow} />)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFF0' }}>
      <View
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
      >
        <View style={styles.contianer}>
          <View style={styles.profile}>
            <View>
              <View style={{ justifyContent: 'center', alignItems: 'center', height: 100, marginTop: 15 }}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate('Setting')
                }}
                  style={{}}>
                  <View style={{ flexDirection: 'row', height: 100, alignItems: 'center', width: '100%', marginStart: 5 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={{ uri: user.avatar }} style={{ height: 80, width: 80, borderRadius: 240, backgroundColor: 'gray', flex: 1, marginEnd: 20 }} />
                      {/* trạng thái user */}
                      <View style={{ height: 25, width: 100, backgroundColor: COLOR.T, borderRadius: 3, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        {user.authenticated ?
                          <Text style={[{ fontFamily: FONT.primary, fontSize: 16, color: 'black' }, { fontFamily: fontFamily }]}>business account</Text>
                          :
                          <Text style={[{ fontFamily: FONT.primary, fontSize: 16, color: 'black' }, { fontFamily: fontFamily }]}>private account</Text>
                        }
                      </View>
                    </View>

                    <View style={{ justifyContent: 'space-around', flexDirection: 'column', height: 100, flex: 2, alignItems: 'flex-start', backgroundColor: '#FFFAF0', padding: 8, borderRadius: 5 }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.text, { fontFamily: fontFamily }]}>{user.name}</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.textE, { fontFamily: fontFamily }]}>{user.email}</Text>
                      </View>
                      {user.authenticated ?
                        <>
                          <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: 10 }}>
                            <Text style={[{ fontFamily: FONT.primary, color: 'black', fontSize: 16 }, { fontFamily: fontFamily }]}>Follower </Text>
                            <Text style={[{ fontFamily: FONT.primary, color: 'black', fontSize: 14, marginStart: 5 }, { fontFamily: fontFamily }]}>{formatNumber(follow?.length)}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                              <ICON name='like2' size={20} color={'black'} />
                              <Text style={[{ fontFamily: FONT.primary, color: 'gray', fontSize: 14, marginStart: 5 }, { fontFamily: fontFamily }]}>{formatNumber(totalLike)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginStart: 10 }}>
                              <ICON name='dislike2' size={20} color={'black'} />
                              <Text style={[{ fontFamily: FONT.primary, color: 'gray', fontSize: 14, marginStart: 5 }, { fontFamily: fontFamily }]}>{formatNumber(totalDislike)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginStart: 10 }}>
                              <ICON name='eyeo' size={20} color={'black'} />
                              <Text style={[{ fontFamily: FONT.primary, color: 'gray', fontSize: 14, marginStart: 5 }, { fontFamily: fontFamily }]}>{formatNumber(totalRead)}</Text>
                            </View>
                          </View>
                        </>
                        : <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }} />}
                    </View>
                    <ICON name='setting' size={22} color={'black'} style={{ position: 'absolute', end: 5, top: 0 }} />
                  </View>
                </TouchableOpacity>

              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: windowWith - 10, height: 5, borderBottomWidth: 1, borderBottomColor: 'black', marginTop: 25 }}>
              </View>

            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <NewRecentComponent page={page} setPage={setPage} user={user} fontFamily={fontFamily} />
          </View>
          <View style={{ width: '100%', height: '100%' }}>
            {pageChange({ page, likeNew, readNew })}
          </View>

        </View>

      </View>
      {user.authenticated ?
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddNew')
          }}
          style={{ position: 'absolute', height: 50, width: 50, borderRadius: 50, backgroundColor: 'white', right: 24, bottom: 24, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'black' }}>
          <Text style={{ color: 'black', fontWeight: '600', fontSize: 24 }}>+</Text>
        </TouchableOpacity>
        :
        null
      }

    </View>
  )
}
const NewRecentComponent = ({ user, page, setPage, fontFamily }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
      <TouchableOpacity style={{ marginEnd: 10, flex: 1, alignItems: 'center' }}
        onPress={() => { setPage(LIKE) }}
        disabled={page === LIKE ? true : false}
      >
        {user.authenticated ? <Text style={[styles.text, { fontFamily: fontFamily }]}>Today</Text> : <Text style={[styles.text, { fontFamily: fontFamily }]}>Like</Text>}
        {page === LIKE ?
          <>
            <View style={{ position: 'absolute', top: 25, height: 3, width: '100%', backgroundColor: 'black' }}></View>
          </>
          : null}
      </TouchableOpacity>
      <TouchableOpacity style={{ marginStart: 10, flex: 1, alignItems: 'center' }}
        onPress={() => { setPage(READ) }}
        disabled={page === READ ? true : false}

      >
        {user.authenticated ? <Text style={[styles.text, { fontFamily: fontFamily }]}>All</Text> : <Text style={[styles.text, { fontFamily: fontFamily }]}>Read</Text>}

        {page === READ ? <View style={{ position: 'absolute', bottom: 0, height: 3, width: '100%', backgroundColor: 'black' }}></View> : null}
      </TouchableOpacity>
      <TouchableOpacity style={{ marginStart: 10, flex: 1, alignItems: 'center' }}
        onPress={() => { setPage(FOLLOW) }}
        disabled={page === FOLLOW ? true : false}

      >
        {user.authenticated ? <Text style={[styles.text, { fontFamily: fontFamily }]}>Follower</Text> : <Text style={[styles.text, { fontFamily: fontFamily }]}>Follow</Text>}
        {page === FOLLOW ? <View style={{ position: 'absolute', bottom: 0, height: 3, width: '100%', backgroundColor: 'black' }}></View> : null}
      </TouchableOpacity>
    </View>

  )
}
export default Profile

const styles = StyleSheet.create({
  contianer: {
    width: windowWith - 10,
    height: '100%',
    marginStart: 5

  },
  profile: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#FFFAF0'
  },
  text: {
    color: 'black',
    fontSize: 20,
    letterSpacing: 0.12,
    lineHeight: 24,
    fontFamily: FONT.primary,
  },
  textE: {
    color: 'black',
    fontSize: 16,
    letterSpacing: 0.12,
    lineHeight: 24,
    fontFamily: FONT.primary,
  },
  textH: {
    color: 'black',
    fontSize: 24,
    letterSpacing: 0.12,
    lineHeight: 24,
    fontFamily: FONT.primary,
    padding: 8,
    marginTop: 5
  }
})

