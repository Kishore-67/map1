import { View,Text,StyleSheet} from 'react-native'
import React,{ useState,useEffect} from 'react'
import {db} from './Bottom/config'
import {ref,onValue}from 'firebase/database'
import { Button } from 'react-native';

const FetchData = () => {
    const [todoData,setTodoData]= useState([])
    
    useEffect(()=> {
        const starCountRef =ref(db,'main/');
        onValue(starCountRef,(snapshot)=>{
            const data=snapshot.val();
            const newPosts =Object.keys(data).map(key=> ({
                id:key,
                ...data[key]
            }));
            console.log(newPosts);
            setTodoData(newPosts);
        });
    },[])
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Realtime DB & Expo</Text>
            <Text style={styles.header}>we are going to learn</Text>
            <Button title="Click here" onPress={() => alert('You pressed the button!')} />
            <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
            {
                todoData.map((item,index)=>{
                    return(
                        <View key={index}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Text style={styles.text}>{item.body}</Text>
                        </View>
                            
                    )
                })
            }
        </View>
    )
}
export default FetchData
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
    header:{
        fontSize:30,
        textAlign:'center',
        marginTop:100,
        fontWeight:'bold'
    },
    text:{
        fontSize:20,
        textAlign:'center',
        marginTop:20
    }
  });