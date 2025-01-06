import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
   Login,
   Register,
   Home,
   PhoneLogin,
   VerifyPhoneNumber,
   Infomation,
   Interests,
   Pictures,
   People,
   Chat,
   Profile,
   EditProfile,
   DevLogin,
   Setting,
} from './app/index'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import './backend/services/firebase'
import { Route } from 'expo-router/build/Route'
import { COLORS } from './constants/theme'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const HomeTab = ({ navigation }) => {
   return (
      <Tab.Navigator
         initialRouteName="People"
         screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
               let iconName
               if (route.name === 'People') {
                  iconName = focused ? 'people' : 'people-outline'
               } else if (route.name === 'Chat') {
                  iconName = focused ? 'chatbubble' : 'chatbubble-outline'
               } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline'
               }
               return <Ionicons name={iconName} size={size} color={COLORS.tertiary} />
            },
            tabBarLabelStyle: {
               color: COLORS.black,
            },
         })}
      >
         <Tab.Screen name="Profile" component={Profile} />
         <Tab.Screen name="People" component={People} />
         <Tab.Screen name="Chat" component={Chat} />
      </Tab.Navigator>
   )
}

function App() {
   return (
      <Provider store={store}>
         <SafeAreaProvider>
            <StatusBar style="dark" />
            <NavigationContainer>
               <Stack.Navigator
                  screenOptions={{
                     headerShown: false,
                     gestureEnabled: false,
                  }}
                  initialRouteName="Login"
               >
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                  <Stack.Screen name="PhoneLogin" component={DevLogin} />
                  <Stack.Screen name="VerifyPhoneNumber" component={VerifyPhoneNumber} />
                  <Stack.Screen name="Infomation" component={Infomation} />
                  <Stack.Screen name="Interests" component={Interests} />
                  <Stack.Screen name="Pictures" component={Pictures} />
                  <Stack.Screen name="HomeTab" component={HomeTab} />
                  <Stack.Screen name="EditProfile" component={EditProfile} />
                  <Stack.Screen name="Setting" component={Setting} />
               </Stack.Navigator>
            </NavigationContainer>
         </SafeAreaProvider>
      </Provider>
   )
}

export default App
