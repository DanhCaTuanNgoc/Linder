import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   StyleSheet,
   Alert,
   Platform,
} from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch, useSelector } from 'react-redux'
import { initialUserInfo } from '../../store/user/userAction'
import { AlertModal } from '../../components'
import { COLORS } from '../../constants/theme'
import { UpdateUserFilters } from '../../store/matching/matchAction'

function Infomation({ navigation }: { navigation: any }) {
   const [name, setName] = useState('')
   const [birthDate, setBirthDate] = useState(new Date())
   const [gender, setGender] = useState('')
   const dispatch: any = useDispatch()
   const { userId } = useSelector((state: any) => state.userState)
   const [showAlert, setShowAlert] = useState(false)
   const [showDatePicker, setShowDatePicker] = useState(false)

   const handleDateChange = (event: any, selectedDate?: Date) => {
      if (Platform.OS === 'android') {
         setShowDatePicker(false)
      }

      if (selectedDate) {
         setBirthDate(selectedDate)
      }
   }

   const handleContinue = async () => {
      console.log(name, gender, birthDate)
      if (
         name.trim() !== '' &&
         gender.trim() !== '' &&
         birthDate.toString().trim() !== ''
      ) {
         if (
            birthDate.getTime() > new Date().getTime() ||
            new Date().getFullYear() - birthDate.getFullYear() < 18
         ) {
            setShowAlert(true)
         } else {
            let isNewUser = true
            await dispatch(initialUserInfo(userId, name, gender, birthDate))
            await UpdateUserFilters(null, userId, isNewUser)(dispatch)
            navigation.navigate('Interests')
         }
      } else {
         setShowAlert(true)
      }
   }

   const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-GB', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      })
   }

   return (
      <SafeAreaView style={styles.container}>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>

         <View style={styles.header}>
            <Text style={styles.headerTitle}>Complete Your Profile</Text>
            <Text style={styles.headerSubtitle}>
               Please provide your basic information
            </Text>
         </View>

         <View style={styles.inputContainer}>
            <TextInput
               style={styles.input}
               value={name}
               onChangeText={setName}
               placeholder="Enter your name"
               placeholderTextColor="#999"
            />

            <View style={styles.dateInputContainer}>
               {Platform.OS === 'ios' ? (
                  <>
                     <TextInput
                        style={styles.dateInput}
                        value={formatDate(birthDate)}
                        editable={false}
                        placeholder="DD/MM/YYYY"
                        placeholderTextColor="#999"
                     />
                     <DateTimePicker
                        value={birthDate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                        style={styles.iosDatePicker}
                        themeVariant="light"
                     />
                  </>
               ) : (
                  <>
                     <TextInput
                        style={styles.dateInput}
                        value={formatDate(birthDate)}
                        editable={false}
                        placeholder="DD/MM/YYYY"
                        placeholderTextColor="#999"
                     />
                     <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDatePicker(true)}
                     >
                        <Ionicons
                           name="calendar-outline"
                           size={24}
                           color={COLORS.tertiary}
                        />
                     </TouchableOpacity>

                     {showDatePicker && (
                        <DateTimePicker
                           value={birthDate}
                           mode="date"
                           display="default"
                           onChange={handleDateChange}
                           maximumDate={new Date()}
                        />
                     )}
                  </>
               )}
            </View>

            <View style={styles.genderContainer}>
               <TouchableOpacity
                  style={[
                     styles.genderButton,
                     gender === 'male' && styles.selectedGender,
                  ]}
                  onPress={() => setGender('male')}
               >
                  <Text
                     style={[
                        styles.genderText,
                        gender === 'male' && styles.selectedGenderText,
                     ]}
                  >
                     Male
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={[
                     styles.genderButton,
                     gender === 'female' && styles.selectedGender,
                  ]}
                  onPress={() => setGender('female')}
               >
                  <Text
                     style={[
                        styles.genderText,
                        gender === 'female' && styles.selectedGenderText,
                     ]}
                  >
                     Female
                  </Text>
               </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
               <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
         </View>
         <AlertModal
            visible={showAlert}
            title="Oops!"
            message="Please fill in all the fields"
            onClose={() => setShowAlert(false)}
            iconName="alert-circle"
            color="#FF6B6B"
         />
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingHorizontal: 24,
      paddingVertical: 20,
   },
   backButton: {
      marginBottom: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
   },
   header: {
      marginBottom: 30,
   },
   headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      marginBottom: 10,
      color: COLORS.textColor,
   },
   headerSubtitle: {
      fontSize: 16,
      color: '#666',
      lineHeight: 24,
   },
   inputContainer: {
      width: '100%',
   },
   input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      paddingHorizontal: 15,
      marginBottom: 20,
      fontSize: 16,
      backgroundColor: COLORS.white,
   },
   dateInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
   },
   dateInput: {
      flex: 1,
      height: 50,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      paddingHorizontal: 15,
      fontSize: 16,
      backgroundColor: COLORS.white,
   },
   calendarButton: {
      position: 'absolute',
      right: 12,
      paddingHorizontal: 8,
   },
   dateText: {
      fontSize: 16,
      paddingTop: 12,
      color: COLORS.textColor,
   },
   genderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
   },
   genderButton: {
      width: '48%',
      height: 50,
      borderWidth: 1,
      borderColor: COLORS.border,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
   },
   selectedGender: {
      width: '48%',
      height: 50,
      borderWidth: 1,
      borderColor: COLORS.primary,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
   },
   genderText: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.textColor,
   },
   selectedGenderText: {
      color: COLORS.textColor,
      fontSize: 16,
      fontWeight: '700',
   },
   continueButton: {
      width: '100%',
      height: 50,
      backgroundColor: COLORS.primary,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: COLORS.primary,
      shadowOffset: {
         width: 0,
         height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
   },
   continueButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
   },
   dateButton: {
      padding: 10,
      position: 'absolute',
      right: 10,
   },
   iosDatePicker: {
      position: 'absolute',
      right: 10,
      width: '100%',
      height: 120,
      marginTop: 10,
   },
})

export default Infomation
