import { View, StyleSheet, Text, Pressable, TouchableOpacity, Switch } from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import AlertModal from '@/components/AlertModal'

function Setting({ navigation }: { navigation: any }) {
   const [popup, setPopup] = useState(false)

   const handleLogout = async () => {
      await AsyncStorage.removeItem('filters')
      await AsyncStorage.removeItem('userId')
      navigation.navigate('Login')
   }

   return (
      <View style={styles.container}>
         <LinearGradient
            colors={[COLORS.white, `${COLORS.primary}20`]}
            style={StyleSheet.absoluteFillObject}
         />

         <View style={styles.header}>
            <TouchableOpacity
               style={styles.backButton}
               onPress={() => navigation.goBack()}
            >
               <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Settings</Text>
         </View>

         <View style={styles.content}>
            <TouchableOpacity
               style={styles.menuItem}
               onPress={() => navigation.navigate('EditProfile')}
            >
               <Ionicons name="lock-closed-outline" size={24} color={COLORS.primary} />
               <Text style={styles.menuText}>Privacy and Security</Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={styles.menuItem}
               onPress={() => navigation.navigate('ManagePhotos')}
            >
               <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color={COLORS.primary}
               />
               <Text style={styles.menuText}> Our information</Text>
            </TouchableOpacity>
            <View style={styles.menuItem}>
               <Ionicons name="color-palette-outline" size={24} color={COLORS.primary} />
               <Text style={styles.menuText}>Change Theme</Text>
               <Switch
                  onValueChange={() => setPopup(true)}
                  trackColor={{ false: COLORS.border, true: `${COLORS.primary}50` }}
                  thumbColor={COLORS.primary}
               />
            </View>

            <TouchableOpacity
               style={[styles.menuItem, styles.logoutButton]}
               onPress={handleLogout}
            >
               <Ionicons name="log-out-outline" size={24} color={COLORS.alertFail} />
               <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
         </View>

         <AlertModal
            visible={popup}
            onClose={() => setPopup(false)}
            title="Oops!"
            message="We are working on this feature, please wait for the update"
            iconName="sad"
            color={COLORS.primary}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingTop: 30,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SIZES.medium,
      paddingVertical: SIZES.xSmall,
      borderBottomWidth: 1,
      borderBottomColor: `${COLORS.textColor}20`,
   },
   backButton: {
      padding: 8,
   },
   headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.primary,
      marginLeft: 12,
   },
   content: {
      flex: 1,
      padding: 20,
   },
   menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.white,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
   },
   menuText: {
      flex: 1,
      fontSize: 16,
      color: COLORS.textColor,
      marginLeft: 12,
      fontWeight: 500,
   },
   logoutButton: {
      marginTop: 'auto',
      backgroundColor: COLORS.white,
      borderWidth: 1,
      borderColor: COLORS.alertFail,
   },
   logoutText: {
      color: COLORS.alertFail,
   },
})

export default Setting
