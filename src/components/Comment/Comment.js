import { ScrollView, StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useMemo, useRef, useEffect, useState, useContext } from 'react';
const { height } = Dimensions.get('window');
import { FONT, DateOfTimePost } from '../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/AntDesign';
import AddComment from './AddComment';
import { UserContext } from '../user/UserContext';
const Comment = ({creator, show, setShow, data, postId, shortId, setResetC, onPressClose }) => {
  const [fontFamily, setFontFamily] = useState(FONT.primary);
  const [repliesVisibility, setRepliesVisibility] = useState({});
  const [cmtParent, setCmtParent] = useState('');
  const [cmtParentName, setCmtParentName] = useState('');
  const user = useContext(UserContext);
  const userId = user?.user?._id
  const toggleReplies = (id) => {
    setRepliesVisibility(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  useEffect(() => {
    // Cập nhật font khi FONT.primary thay đổi
    setFontFamily(FONT.primary);
  }, [FONT.primary]);
  const repComment = (id, name) => {
    setCmtParent(id);
    setCmtParentName(name);
    console.log('id', id, 'name', name);

  }
 
  const renderItem = useCallback(
    (item) => {
      const showReplies = repliesVisibility[item._id]; 
      const checkCreator = creator === item.user._id; 
      return (
        <View key={item._id} style={styles.itemContainer}>
          <View style={{ flex: 1, alignItems: 'center', marginEnd: 5 }}>
            <Image source={{ uri: item.user.avatar }} style={{ height: 40, width: 40, borderRadius: 40 }} />
          </View>
          <View style={{ flex: 9 }}>
            <Text style={[{ color: 'gray', fontFamily: FONT.primary }, { fontFamily: fontFamily }]}>{item.user.name} {checkCreator && '( author )'} </Text>
            <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily }]}>{item.content}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily, flex: 1.5, fontSize: 12 }]}>{DateOfTimePost(item.createdAt)}</Text>
              <TouchableOpacity style={{ height: 20, width: 40 }}
                onPress={() => { repComment(item._id, item.user.name) }}
              >
                <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily, flex: 1, fontSize: 12 }]}>Reply</Text>
              </TouchableOpacity>
              <View style={{ flex: 3 }}>

              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <ICON name={'hearto'} size={14} color={'black'} />
                  <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily, flex: 1, fontSize: 12, marginStart: 2 }]}>0</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <ICON name={'dislike2'} size={14} color={'black'} />
                  <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily, flex: 1, fontSize: 12, marginStart: 2 }]}>0</Text>
                </View>
              </View>
            </View>
            {item.replies.length > 0 ?
              <View style={{ marginTop: 0 }}

              >
                {!showReplies ?
                  <TouchableOpacity
                    onPress={() => toggleReplies(item._id)}
                  >
                    <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily, flex: 1, fontSize: 12, marginStart: 2 }]}>Show replies</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => toggleReplies(item._id)}
                  >
                    <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily, flex: 1, fontSize: 12, marginStart: 2 }]}>Hidden replies</Text>
                  </TouchableOpacity>

                }

              </View>
              :
              null
            }

            {showReplies ? (

              item.replies.map((reply) => (
                <View key={reply._id} style={styles.itemContainerR}>
                  <View style={{ flex: 1, alignItems: 'center', marginEnd: 5 }}>
                    <Image source={{ uri: reply.user.avatar }} style={{ height: 30, width: 30, borderRadius: 40 }} />
                  </View>
                  <View style={{ flex: 9 }}>
                    <Text style={[{ color: 'gray', fontFamily: FONT.primary, fontSize: 12 }, { fontFamily: fontFamily }]}>{reply.user.name}</Text>
                    <Text style={[{ color: 'black', fontFamily: FONT.primary, fontSize: 12 }, { fontFamily: fontFamily }]}>{reply.content}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily, flex: 1.5, fontSize: 10 }]}>{DateOfTimePost(item.createdAt)}</Text>
                      <TouchableOpacity style={{ height: 15, width: 30 }}
                        onPress={() => { repComment(item._id, reply.user.name) }}
                      >
                        <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily, flex: 1, fontSize: 10 }]}>Reply</Text>
                      </TouchableOpacity>
                      <View style={{ flex: 3 }}>

                      </View>
                      <View style={{ flex: 2, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          <ICON name={'hearto'} size={10} color={'black'} />
                          <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily, flex: 1, fontSize: 10, marginStart: 2 }]}>0</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          <ICON name={'dislike2'} size={10} color={'black'} />
                          <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily, flex: 1, fontSize: 10, marginStart: 2 }]}>0</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                </View>
              ))
            ) : null}
          </View>

        </View>
      )


    },
    [repliesVisibility]
  );
  return (
    <Modal
      transparent={true} // Modal sẽ hiển thị trong suốt trên nền màn hình chính
      animationType="slide" // Tùy chọn hoạt ảnh khi Modal xuất hiện
      visible={show} // Bạn có thể thay đổi điều này dựa trên trạng thái
      onRequestClose={onPressClose}
    >
      <TouchableWithoutFeedback onPress={onPressClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={[{ color: 'black', fontFamily: FONT.primary, fontSize: 18 }, { fontFamily: fontFamily }]}>Comment</Text>
                </View>

                <TouchableOpacity
                  onPress={() => { setShow(false) }}
                  style={{ height: 40, alignItems: 'center', justifyContent: 'center', flex: 1 }}
                >
                  <Text style={[{ color: 'black', fontFamily: FONT.primary }, { fontFamily: fontFamily }]}>Close</Text>
                </TouchableOpacity>
              </View>
              {!data ?

                < View style={styles.container}>
                  <Text style={[{ color: 'black', fontFamily: FONT.primary, marginStart: 10 }, { fontFamily: fontFamily }]}>There are currently no comments for this news.</Text>
                </View>

                :
                <ScrollView style={styles.container}>
                  {data.map(renderItem)}
                </ScrollView>
              }

              <AddComment cmtParent={cmtParent} postId={postId} shortId={shortId} setResetC={setResetC} cmtParentName={cmtParentName} setCmtParentName={setCmtParentName} setCmtParent={setCmtParent} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal >

  );
}

export default Comment

const styles = StyleSheet.create({
  modalContainer: {
    height: height * 0.6,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#FFF'
  },
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 3,
    margin: 2,
    marginHorizontal: 5,
    backgroundColor: '#FFFFF0',
    flexDirection: 'row'
  },
  itemContainerR: {
    paddingVertical: 2,
    backgroundColor: '#FFFFF0',
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: 'white'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
// const data = [{
//   "id":"123",
//   "content": "This is a great analysis of Yamal's potential. Barca's future looks promising with young talents like him!",
//   "user": {
//     "_id": {
//       "$oid": "66b0d30596f7a142d0dcd151"
//     },
//     "name": "vanquyet",
//     "email": "tquyet1996@gmail.com",
//     "avatar": "https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-zalo-50-29-15-13-16.jpg"
//   },
//   "post": {
//     "_id": {
//       "$oid": "66b0d81a18e16f9011040d37"
//     },
//     "title": "Barcelona bet on young star Yamal to defeat Real Madrid",
//     "text": "Yamal turned 17 the day before Spain beat England in the Euro 2024 final in Berlin last month. The powerful winger terrorised defences throughout the tournament and has raised hopes of a brighter future for struggling Barca. Last season was a tumultuous one for Barca, who finished second in the table and 10 points behind champions Real Madrid. The team also controversially sacked club legend Xavi Hernandez. The Catalans then appointed Flick, 59, as head coach, tasking the former Germany and Bayern Munich coach with getting the best out of a squad that combines promising youngsters with seasoned veterans like Robert Lewandowski and Ilkay Gundogan. Flick, who has not coached since being sacked by Germany in September 2023, must now revive a team that failed to win a trophy in Xavi’s final season.",
//     "images": [
//       "https://photo.znews.vn/w960/Uploaded/qfsyy/2024_08_05/z5701917481866_fe2620b2a0227585054a8e326269910b.jpg"
//     ]
//   },
//   "parentComment": null,
//   "replies": [ {
//     "id":"1234",
//     "content": "This is a great analysis of Yamal's potential. Barca's future looks promising with young talents like him!",
//     "user": {
//       "_id": {
//         "$oid": "66b0d30596f7a142d0dcd151"
//       },
//       "name": "vanquyet",
//       "email": "tquyet1996@gmail.com",
//       "avatar": "https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-zalo-50-29-15-13-16.jpg"
//     },
//     "post": {
//       "_id": {
//         "$oid": "66b0d81a18e16f9011040d37"
//       },
//       "title": "Barcelona bet on young star Yamal to defeat Real Madrid",
//       "text": "Yamal turned 17 the day before Spain beat England in the Euro 2024 final in Berlin last month. The powerful winger terrorised defences throughout the tournament and has raised hopes of a brighter future for struggling Barca. Last season was a tumultuous one for Barca, who finished second in the table and 10 points behind champions Real Madrid. The team also controversially sacked club legend Xavi Hernandez. The Catalans then appointed Flick, 59, as head coach, tasking the former Germany and Bayern Munich coach with getting the best out of a squad that combines promising youngsters with seasoned veterans like Robert Lewandowski and Ilkay Gundogan. Flick, who has not coached since being sacked by Germany in September 2023, must now revive a team that failed to win a trophy in Xavi’s final season.",
//       "images": [
//         "https://photo.znews.vn/w960/Uploaded/qfsyy/2024_08_05/z5701917481866_fe2620b2a0227585054a8e326269910b.jpg"
//       ]
//     },
//     "parentComment": null,
//     "replies": [],
//     "createdAt": "2024-08-24T10:15:00Z"
//   }],
//   "createdAt": "2024-08-24T10:15:00Z"
// },
// {
//   "id":"1243",
//   "content": "This is a great analysis of Yamal's potential. Barca's future looks promising with young talents like him!",
//   "user": {
//     "_id": {
//       "$oid": "66b0d30596f7a142d0dcd151"
//     },
//     "name": "vanquyet",
//     "email": "tquyet1996@gmail.com",
//     "avatar": "https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-zalo-50-29-15-13-16.jpg"
//   },
//   "post": {
//     "_id": {
//       "$oid": "66b0d81a18e16f9011040d37"
//     },
//     "title": "Barcelona bet on young star Yamal to defeat Real Madrid",
//     "text": "Yamal turned 17 the day before Spain beat England in the Euro 2024 final in Berlin last month. The powerful winger terrorised defences throughout the tournament and has raised hopes of a brighter future for struggling Barca. Last season was a tumultuous one for Barca, who finished second in the table and 10 points behind champions Real Madrid. The team also controversially sacked club legend Xavi Hernandez. The Catalans then appointed Flick, 59, as head coach, tasking the former Germany and Bayern Munich coach with getting the best out of a squad that combines promising youngsters with seasoned veterans like Robert Lewandowski and Ilkay Gundogan. Flick, who has not coached since being sacked by Germany in September 2023, must now revive a team that failed to win a trophy in Xavi’s final season.",
//     "images": [
//       "https://photo.znews.vn/w960/Uploaded/qfsyy/2024_08_05/z5701917481866_fe2620b2a0227585054a8e326269910b.jpg"
//     ]
//   },
//   "parentComment": null,
//   "replies": [
//     {
//       "id":"1223",
//       "content": "This is a great analysis of Yamal's potential. Barca's future looks promising with young talents like him!",
//       "user": {
//         "_id": {
//           "$oid": "66b0d30596f7a142d0dcd151"
//         },
//         "name": "vanquyet",
//         "email": "tquyet1996@gmail.com",
//         "avatar": "https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-zalo-50-29-15-13-16.jpg"
//       },
//       "post": {
//         "_id": {
//           "$oid": "66b0d81a18e16f9011040d37"
//         },
//         "title": "Barcelona bet on young star Yamal to defeat Real Madrid",
//         "text": "Yamal turned 17 the day before Spain beat England in the Euro 2024 final in Berlin last month. The powerful winger terrorised defences throughout the tournament and has raised hopes of a brighter future for struggling Barca. Last season was a tumultuous one for Barca, who finished second in the table and 10 points behind champions Real Madrid. The team also controversially sacked club legend Xavi Hernandez. The Catalans then appointed Flick, 59, as head coach, tasking the former Germany and Bayern Munich coach with getting the best out of a squad that combines promising youngsters with seasoned veterans like Robert Lewandowski and Ilkay Gundogan. Flick, who has not coached since being sacked by Germany in September 2023, must now revive a team that failed to win a trophy in Xavi’s final season.",
//         "images": [
//           "https://photo.znews.vn/w960/Uploaded/qfsyy/2024_08_05/z5701917481866_fe2620b2a0227585054a8e326269910b.jpg"
//         ]
//       },
//       "parentComment": null,
//       "replies": [],
//       "createdAt": "2024-08-24T10:15:00Z"
//     }
//   ],
//   "createdAt": "2024-08-24T10:15:00Z"
// }
// ]
