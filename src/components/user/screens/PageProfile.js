import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, FlatList, ScrollView, Modal, ToastAndroid, Alert } from 'react-native'
import React, { useState, useContext, useEffect, useCallback } from 'react'
import { UserContext } from '../UserContext';
import { getMyRead, getMylike } from '../../news/newsHttp';
import { getFollowersByStatus } from '../UserHttp';
import { deleteNew } from '../../news/newsHttp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR, FONT, formatNumber } from '../../../constain/fontFamilies';
import Posts from '../userNews/Posts';
import ShortList from '../userNews/Shorts';
import { useFocusEffect } from '@react-navigation/native';
import ICON from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { followPage, unFollowPage, getPostAndShort } from '../UserHttp'
const POST = 'POST';
const SHORT = 'SHORT';
const windowWith = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PageProfile = (data) => {
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(POST);
  const navigation = useNavigation();
  const [modelVisible, setModelVisible] = useState(false);
  const [fontFamily, setFontFamily] = useState(FONT.primary);
  const userData = data.route.params.item.followeeId;
  const [checkFollow, setCheckFollow] = useState(false);
  const [totalLike, setTotalLike] = useState(0);
  const [totalRead, setTotalRead] = useState(0);
  const [totalDislike, setTotalDislike] = useState(0);
  const [posts, setPosts] = useState([]);
  const [shorts, setShorts] = useState([]);
  //console.log('đây',user);

  // Cập nhật font khi FONT.primary thay đổi
  useEffect(() => {
    setFontFamily(FONT.primary);
  }, [FONT.primary]);
  useFocusEffect(
    useCallback(() => {
      if (userData?.authenticated === false) {

      }
    }, [])
  );
  useEffect(() => {
    for (const follower of user.follower) {
      if (follower.followeeId == userData._id) {
        setCheckFollow(true);
        break; // Dừng vòng lặp khi tìm thấy
      }
    }
    fetchPostAndShort(userData._id);
  }, []);
  const calculateTotals = (shorts, posts) => {
    if (shorts || posts) {
      const totalShortReads = shorts?.reduce((total, short) => total + short.reads, 0);
      const totalShortDislike = shorts?.reduce((total, short) => total + short.unLikes, 0);
      const totalShortLikes = shorts?.reduce((total, short) => total + short.likes.length, 0);

      const totalPostReads = posts.reduce((total, post) => total + post.reads, 0);
      const totalPostDislike = posts.reduce((total, post) => total + post.unLikes, 0);
      const totalPostLikes = posts.reduce((total, post) => total + post.likes.length, 0);
      setTotalRead(totalShortReads + totalPostReads);
      setTotalLike(totalShortLikes + totalPostLikes)
      setTotalDislike(totalShortDislike + totalPostDislike)
    }

  };
  useEffect(
    () => {
      calculateTotals(shorts, posts)
    }, [posts, shorts]
  )
  const fetchPostAndShort = async (id) => {
    try {
      const result = await getPostAndShort(id);
      if (result.status === 1) {
        setShorts(result.shorts);
        setPosts(result.posts);
      }
    } catch (error) {
      console.log('fetchMyRead error: ', error);

    }
  };
  const OpenModal = () => {
    setModelVisible(true);
  };
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY === 0) {
      // Nếu người dùng scroll lên đầu trang
      // Thực hiện hàm load lại dữ liệu
      reloadUserData();
    }
  };
  const pageChange = ({ page, posts, shorts }) => {
    if (page == POST) {
      return (<Posts dataLike={posts} />)
    } else if (page == SHORT) {
      return (<ShortList dataShort={shorts} />)
    }
  };
  const unFollow = async (name, followeeId) => {
    Alert.alert(
      'Unfollow',
      `Do you want to unfollow ${name}?`,
      [
        {
          text: "Cancel", // Nút hủy
          style: "cancel"
        },
        {
          text: "Confirm", // Nút xác nhận
          onPress: async () => {
            const result = await unFollowPage(followeeId)
            if (result.status === 1) {
              setCheckFollow(false)
            }
          }
        }
      ],
      { cancelable: false }
    )

  };
  const addFollow = async (followeeId) => {
    const result = await followPage(followeeId)
    if (result.status === 1) {
      setCheckFollow(true)
    }
  };
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
                <TouchableOpacity
                  style={{}}>
                  <View style={{ flexDirection: 'row', height: 100, alignItems: 'center', width: '100%', marginStart: 5 }}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={{ uri: userData.avatar }} style={{ height: 70, width: 70, borderRadius: 80, backgroundColor: 'gray', flex: 1, marginEnd: 20 }} />
                      {/* trạng thái userData */}
                      <View style={{ height: 25, width: 100, backgroundColor: COLOR.T, borderRadius: 3, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                        {checkFollow ?
                          <TouchableOpacity style={{ backgroundColor: 'white', padding: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { unFollow(userData.name, userData._id) }}
                          >
                            <Text style={{ fontFamily: FONT.primary, fontSize: 18, color: 'black' }}>Followed</Text>
                          </TouchableOpacity>
                          :

                          <TouchableOpacity style={{ backgroundColor: 'white', padding: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { addFollow(userData._id) }}
                          >
                            <Text style={{ fontFamily: FONT.primary, fontSize: 18, color: 'black' }}>Follow</Text>
                          </TouchableOpacity>
                        }
                      </View>
                    </View>

                    <View style={{ justifyContent: 'space-around', flexDirection: 'column', height: 100, flex: 2, alignItems: 'flex-start', backgroundColor: '#FFFAF0', padding: 8, borderRadius: 5 }}>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.text, { fontFamily: fontFamily }]}>{userData.name}</Text>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.textE, { fontFamily: fontFamily }]}>{userData.email}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: 10 }}>
                        <Text style={[{ fontFamily: FONT.primary, color: 'black', fontSize: 16 }, { fontFamily: fontFamily }]}>Follower </Text>
                        <Text style={[{ fontFamily: FONT.primary, color: 'black', fontSize: 14, marginStart: 5 }, { fontFamily: fontFamily }]}>{formatNumber(userData.follower.length)}</Text>
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
            <NewRecentComponent page={page} setPage={setPage} userData={userData} fontFamily={fontFamily} />
          </View>
          <View style={{ width: '100%', height: '100%' }}>
            {pageChange({ page, posts, shorts })}
          </View>

        </View>

      </View>
    </View>
  )
}
const NewRecentComponent = ({ userData, page, setPage, fontFamily }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
      <TouchableOpacity style={{ marginEnd: 10, flex: 1, alignItems: 'center' }}
        onPress={() => { setPage(POST) }}
        disabled={page === POST ? true : false}
      >
        <Text style={[styles.text, { fontFamily: fontFamily }]}>News</Text>
        {page === POST ?
          <>
            <View style={{ position: 'absolute', top: 25, height: 3, width: '100%', backgroundColor: 'black' }}></View>
          </>
          : null}
      </TouchableOpacity>
      <TouchableOpacity style={{ marginStart: 10, flex: 1, alignItems: 'center' }}
        onPress={() => { setPage(SHORT) }}
        disabled={page === SHORT ? true : false}

      >
        <Text style={[styles.text, { fontFamily: fontFamily }]}>Shorts</Text>

        {page === SHORT ? <View style={{ position: 'absolute', bottom: 0, height: 3, width: '100%', backgroundColor: 'black' }}></View> : null}
      </TouchableOpacity>
    </View>

  )
}
export default PageProfile

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

