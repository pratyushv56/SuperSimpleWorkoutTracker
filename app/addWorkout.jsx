import { StyleSheet,Text, View,Image,} from "react-native";
import {Link} from 'expo-router'
import Logo from "../assets/Homepage.png";
import Spacer from "../components/Spacer";
import Progress from "../assets/Progress.png"

export default function Index() {
  return (
    <View
      style={pageStyle.page}
    >
        

    </View>
  );
}

const pageStyle = StyleSheet.create(
  {
    page:{
    
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"#1a021d",
      
    },

    fonts:{
      
      color:"white",
      fontSize:20,
      fontWeight:"bold",
      
    },
  }
)

