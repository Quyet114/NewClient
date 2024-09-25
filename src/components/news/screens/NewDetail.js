import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native'
import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { FONT, DateOfTimePost, formatNumber, getDateAndDay } from '../../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/AntDesign'
import { UserContext } from '../../user/UserContext';
import { updateRead, updateReadWithowUser, getCmt } from '../newsHttp';
import { updateLike, updateunLike, followPage, unFollowPage } from '../../user/UserHttp'
import Comment from '../../Comment/Comment';
const windowWith = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const NewDetail = () => {
  const route = useRoute();
  const { data } = route.params;
  const [scrollY, setScrollY] = useState(0);
  const [show, setShow] = useState(false)
  const user = useContext(UserContext);
  const { reloadUserData } = useContext(UserContext);
  const [cmtData, setCmtData] = useState();
  const [resetC, setResetC] = useState(false);
  const postId = data._id;
  const userId = user?.user?._id;
  const [checkFollow, setCheckFollow] = useState(false);
  const [checkLike, setCheckLike] = useState(false);
  const [numLike, setNumLike] = useState(data?.likes?.length)
  //console.log('user:',user.user.likeHistory);

  useEffect(() => {
    const userId = user?.user?._id;

    const timer = setTimeout(() => {
      if (userId) {
        console.log("updateRead: ", postId, userId);

        updateRead(postId, userId);

      } else {
        updateReadWithowUser(postId);
      }
    }, 60000); // 1 phút = 60,000 milliseconds

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [user, postId]);
  //console.log('user:', user.user, 'post: ', data);
  useEffect(() => {
    if (user?.user?.likeHistory) {
      for (const likeHistory of user?.user?.likeHistory) {
        if (likeHistory == data._id) {
          setCheckLike(true);
          break; // Dừng vòng lặp khi tìm thấy
        }
        console.log(likeHistory);
      }
    }

  }, [])
  useEffect(() => {
    if (user?.user?.follower) {
      for (const follower of user.user.follower) {
        if (follower.followeeId == data.creator._id) {
          setCheckFollow(true);
          break; // Dừng vòng lặp khi tìm thấy
        }
      }
    }

  }, [])

  useEffect(() => {
    getComment(postId)
  }, [resetC])
  const getComment = async (id) => {
    const result = await getCmt(id)
    if (result) {
      setCmtData(result)
      //console.log('cmt: ', result);

    }
  }
  const unFollow = async (name, followeeId) => {
    console.log(followeeId);
    
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
  }
  const addFollow = async (followeeId) => {
    if (user?.user) {
      const result = await followPage(followeeId)
      if (result.status === 1) {
        setCheckFollow(true)
      }
    } else {
      Alert.alert('You are guest ', 'Login to send acctions')
    }

  }
  const dislike = async (postId, userId) => {
    try {
      const result = await updateunLike(postId, userId);
      if (result.status === 1) {
        setCheckLike(false);
        await reloadUserData(userId);
        setResetC(pre => !pre)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const like = async () => {
    try {
      if (user?.user) {
        const result = await updateLike(postId, userId);
        if (result.status === 1) {
          setCheckLike(true);
          await reloadUserData(userId);
          setResetC(pre => !pre)
          setNumLike(pre => pre + 1)
        }
      } else {
        Alert.alert('You are guest ', 'Login to send acctions')
      }

    } catch (error) {
      console.log('like failed: ', error);
    }
  }
  useFocusEffect(
    useCallback(() => {
      if (user.user) {
        const fetchUser = async () => {
          await reloadUserData(userId);
        }
        fetchUser()
      }

    }, [])
  );
  //console.log(data);

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 80 }}>
          <View style={{ flex: 1, marginStart: 2 }}>
            <View style={{ flex: 1.5 }}>
              <Text style={{ fontFamily: FONT.primary, fontSize: 14, color: 'black', marginTop: 10 }}>
                {data.categories[0].name}</Text>
              <Text style={{ fontFamily: FONT.primary, fontSize: 10, color: 'black' }}>{getDateAndDay(data.createdAt)}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                {checkLike ?
                  <TouchableOpacity
                    onPress={() => { dislike() }}
                  >
                    <ICON name='heart' color={'red'} size={18} />
                  </TouchableOpacity>

                  :
                  <TouchableOpacity
                    onPress={() => { like() }}
                  >
                    <ICON name='hearto' color={'black'} size={18} />
                  </TouchableOpacity>

                }
                <Text style={{ marginStart: 3, fontSize: 13, fontFamily: FONT.primary }}>{formatNumber(numLike)}</Text>
              </View>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ICON name='eyeo' color={'black'} size={18} style={{ flex: 1 }} />
                <Text style={{ marginStart: 3, fontSize: 13, flex: 2, fontFamily: FONT.primary }}>{formatNumber(data?.reads)}</Text>
              </View>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ICON name='message1' color={'black'} size={18} style={{ flex: 1 }} />
                <Text style={{ marginStart: 3, fontSize: 13, flex: 2, fontFamily: FONT.primary }}>{data?.comments?.length}</Text>
              </View>
            </View>
          </View >
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={{ uri: data.creator.avatar }} style={{ height: 30, width: 30, borderRadius: 40, borderWidth: 1, borderColor: 'gray' }} />
              <Text style={{ marginStart: 8, fontFamily: FONT.primary, fontSize: 18, width: 160, color: 'black' }}>{data?.creator?.name}</Text>
            </View>
            <View style={{ width: '80%', marginTop: 10 }}>
              {checkFollow ?
                <TouchableOpacity style={{ backgroundColor: 'white', padding: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => { unFollow(data.creator.name, data.creator._id) }}
                >
                  <Text style={{ fontFamily: FONT.primary, fontSize: 18, color: 'black' }}>Followed</Text>
                </TouchableOpacity>
                :

                <TouchableOpacity style={{ backgroundColor: 'white', padding: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => { addFollow(data.creator._id) }}
                >
                  <Text style={{ fontFamily: FONT.primary, fontSize: 18, color: 'black' }}>Follow</Text>
                </TouchableOpacity>
              }

            </View>
          </View>

        </View>

      </View>

      <ScrollView style={styles.scrollView}
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={{ fontFamily: FONT.primary, fontSize: 16, color: 'black', textAlign: 'justify', width: windowWith - 20,  }} numberOfLines={3}>{data.title}</Text>
          </View>
          <Image source={{ uri: data.images[0] }} style={{ height: 250, width: '100%', borderRadius: 2, marginBottom: 10 }} />
          <Text style={{ fontFamily: FONT.primary, fontSize: 18, color: 'black', textAlign: 'justify' }} >{data.text}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => { setShow(true) }}
        style={{ height: 40, width: '100%', alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderColor: 'gray', borderTopStartRadius: 15, borderTopEndRadius: 15 }}
      >
        <Text style={[{ color: 'black', fontFamily: FONT.primary, fontSize: 16 }, {}]}>Comment</Text>
      </TouchableOpacity>
      <Comment creator={data?.creator?._id} show={show} setShow={setShow} data={cmtData} postId={postId} setResetC={setResetC}
        onPressClose={() => setShow(false)}
      />
    </View>
  )
}

export default NewDetail

const styles = StyleSheet.create({
  container: {
    width: windowWith, height: '100%',
    backgroundColor: '#FFFFF0',
  },
  title: {
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  body: {
    marginHorizontal: 12,
  },
  header: {
    width: windowWith,
    height: 85,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: "center",
    borderBottomWidth: 1, borderColor: 'black', marginBottom: 5,
    marginHorizontal: 12,
  },
  scrollView: {
    marginBottom: 0
  }
})