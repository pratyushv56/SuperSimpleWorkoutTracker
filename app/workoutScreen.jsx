import { SafeAreaView } from 'react-native-safe-area-context'
import {commonStyles} from '../styles/commonStyles'
import { Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
const workoutScreen = ()=>{

   const {workoutName} = useLocalSearchParams();

    return(<SafeAreaView style = {commonStyles.page}>
        
        <Text style = {commonStyles.fonts}>Workout Screen for {workoutName}</Text>
           </SafeAreaView>)
}

export default workoutScreen