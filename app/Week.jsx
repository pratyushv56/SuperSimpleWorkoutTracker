import { View, Text, Button, StyleSheet} from 'react-native'
import React from 'react' 
import {Link} from 'expo-router'
import Spacer from '../components/Spacer';

import Ionicons from '@expo/vector-icons/Ionicons';

const Week = () => {
  return (
<View style = {styles.page}>
        <Text style={{color:"white",fontSize:20}}>Choose a session</Text>
        <Spacer h={10}/>
    <View style = {[styles.container,{backgroundColor:"#736281",width:"80%",border:"solid",borderColor:"gray",borderRadius:10}]}>  
      <Spacer h = {20}/>

       <Link href = "Workoutpage"><Text style = {styles.fonts2}> Push </Text></Link>
      <Spacer h = {20}/>
       <Link href = "Workoutpage"><Text style = {styles.fonts2}> Pull </Text></Link>
      <Spacer h = {20}/>
       <Link href = "Workoutpage"><Text style = {styles.fonts2}> Legs </Text></Link>
      <Spacer h = {20}/>
        <Link href = "Workoutpage"><Text style = {styles.fonts2}> Upper </Text></Link>
      <Spacer h = {20}/>
        <Link href = "Workoutpage"><Text style = {styles.fonts2}> Lower </Text></Link>
      <Spacer h = {20}/>
      <Link href = "addWorkout"><Text style = {styles.fonts3}><Ionicons name="add-circle-outline" size={20} color="black" />Add a session</Text></Link>
      <Spacer h = {20}/>
    </View>
      
</View>
   
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