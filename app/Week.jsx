import { View, Text, Button, StyleSheet, FlatList, Pressable} from 'react-native'
import React, { useState } from 'react' 
import {Link} from 'expo-router'
import Spacer from '../components/Spacer';
import { useRouter } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Week = () => {
  const [workouts, setWorkouts] = useState(["Push", "Pull", "Legs", "Upper", "Lower","+"]);
  const router = useRouter();
  
  const chooseWorkout = (workoutName)=>{
    router.push({
      pathname:"/workoutScreen",
      params:{workoutName},
    })
    
  }

  return (
<SafeAreaView style = {styles.page}>
        <Text style={{color:"white",fontSize:20}}>Choose a session</Text>
        <Spacer h={10}/>
        <FlatList style={{width:"70%" }} 
                  data = {workouts} 
                  contentContainerStyle={{}}
                  renderItem={({item})=>(<Pressable style={{flex:1,alignItems:"center",padding:10,marginVertical:5,justifyContent: "center",borderRadius:10,backgroundColor:"#EEA727", color:"black"}}
                                                    onPress={()=>chooseWorkout(item)}><Text>{item}</Text></Pressable>)}/>
    
      
</SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
    page:{
      
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"#1a021d",
      fontColor: "white",
    },

    fonts2:{
        backgroundColor:"#736281",
        
        border:"solid",
        
        borderColor:"black",
        borderRadius:10,

        padding:5,
      
      color:"black",
      fontSize:20,
      fontWeight:"bold",
      
    },
    fonts3:{
        fontSize:18,
    },
    container:{
        justifyContent:"center",
        alignItems:"center",
    }
})
export default Week