import { StyleSheet, Text, TextInput, TouchableOpacity,Alert, View } from 'react-native'
import React, { useState, useEffect, useContext, } from 'react'
import { FONT } from '../../constain/fontFamilies';
import ICON from 'react-native-vector-icons/Feather';
import { sendComment } from '../news/newsHttp';
import { UserContext } from './../user/UserContext'
const AddComment = ({ cmtParent, setCmtParent, postId, shortId,setResetC, cmtParentName, setCmtParentName }) => {
  const [fontFamily, setFontFamily] = useState(FONT.primary);
  const [text, setText] = useState('');
  const { user } = useContext(UserContext);
  const creator = user?._id;
  useEffect(() => {
    setFontFamily(FONT.primary);
  }, [FONT.primary]);
  const postComment = async () => {
    const commentData = {
      content: cmtParentName ? `${cmtParentName}: ${text}` : text,
      userId: creator,
      postId: postId,
      shortId: shortId,
      parentCommentId: cmtParent || null
    };
    if(!user?._id){
      Alert.alert('You are guest ', 'Login to send comment') 
      console.log(user.user);
    }else if(text.length <=0) {
      Alert.alert('Empty content', 'Type something to send comment')
    }else{
        try {
        console.log('text: ', text, 'creator: ', creator, 'postId: ', postId, 'parent: ', cmtParent);
        const response = await sendComment(commentData);
        clear()
        console.log('Comment sent successfully:', response);
      } catch (error) {
        console.error('Failed to send comment:', error);
      }
    }

  };
  const clear = () => {
    setText('');
    setResetC(pre => !pre);
    closeRep()
  }
  const closeRep = () => {
    setCmtParentName('');
    setCmtParent('');
  }
  return (
    <View style={styles.container}>
      {cmtParentName ?
        <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
          <Text style={[styles.texx, { fontFamily: fontFamily }]}>Reply: {cmtParentName}</Text>
          <TouchableOpacity style={{ marginStart: 20 }}
            onPress={() => { closeRep() }}
          >
            <ICON name='x' color={'black'} size={20} />
          </TouchableOpacity>
        </View>
        :
        null
      }
      <TextInput
        style={[styles.input, { fontFamily: fontFamily }]}
        onChangeText={setText}
        value={text}
        placeholder="Type something..."
        placeholderTextColor="#999"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={{
        height: 35, width: 40, backgroundColor: '#FFFFF0'
        , alignItems: 'center', justifyContent: 'center', position: 'absolute', end: 5, bottom: 10, borderRadius: 5
      }}
        onPress={() => { postComment() }}
      >
        <ICON name='send' color={'black'} size={20} />
      </TouchableOpacity>
    </View>
  )
}

export default AddComment

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFF0',
    paddingVertical: 5,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  },
  input: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  },
  texx: {
    marginStart: 10,
    color: 'black'
  }
})