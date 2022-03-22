import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  StatusBar,
} from 'react-native';
import React,{useState, useEffect} from 'react';

import Entypo from 'react-native-vector-icons/Entypo';

import {Select,} from 'native-base'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Heading, TextArea} from 'native-base';
const windowHeight = Dimensions.get('window').height;
import { connect} from 'react-redux';
import { editList } from '../action/todo';
import moment from 'moment';
 



const EditList = ({authState,editList,route,navigation}) => {
 
  const [id, setId]=useState(null)
  const [pdate, setPdate]=useState(null)
  const [time,setTime]=useState(null)
  const [dateCheck,setdateCheck]=useState(null)
  const [name,setName]=useState(null)
  const [category,setCategory]=React.useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const changeDate=()=>{
    setId(route.params.id)
    setPdate(route.params.pdate)
    setTime(route.params.time)
    setdateCheck(route.params.dateCheck)
    setName(route.params.name)
    setCategory(route.params.category)
  }
  useEffect(() => {
    changeDate()
  }, [])
  
//===========time pick
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTime(moment(date, ['HH.mm']).format('HH:mm '));
    hideDatePicker();
  };
  //==============date pick
  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date) => {
    
  const mpick=(moment(date, ['MMM']).format('MMM'));
  const dpick=(moment(date, ['DD']).format('DD'));
  setPdate(`${dpick} ${mpick}`)
  setdateCheck(moment(date).format('l'))
    hideDatePicker1();
  };
  

 const itemcat=[
   {id:1, name:'Travel'},
   {id:1, name:'Music'},
   {id:1, name:'Work'}
 ]
  //edit
  const editData = async () => {
    if (!name || !pdate || !time || !category) {
      alert('Title Time and Data Required')
      
    }else{
      const userId=authState.user.uid
 
      editList({name,pdate,time,dateCheck,category,userId,id},navigation)
    }
    
  };
  return (
    <>
    
    <View style={styles.container}>
     
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <View style={styles.headerMiddle}>
          <Heading size="sm">Edit Task</Heading>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Entypo name="cross" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lower}>
        <View style={{height: 80}} />
        <Heading size="sm">What are you planning</Heading>
        <TextArea
         value={name}
         onChangeText={(name)=>setName(name)}
          style={styles.textArra}
          borderColor="cyan.500"
          borderWidth="0"
          borderBottomWidth="0.2"
          size="2xl"
          p="0"
          borderBottomColor="blueGray.500"
        />
        <View style={styles.listStyle}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 7,
            }}>
            <Ionicons name="notifications-outline" size={24} color="black" />
            <TouchableOpacity onPress={showDatePicker1}>
                 <Text style={{fontWeight:'bold',fontSize:15, color:'black', marginLeft:20}}>
               {pdate},
                </Text>
                 </TouchableOpacity>
               <TouchableOpacity onPress={showDatePicker}>
               <Text style={{fontWeight:'bold',fontSize:15, color:'black', marginLeft:5}}> {time}</Text>
               </TouchableOpacity>
           
          </View>
          {/* <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 7,
            }}>
            <FontAwesome name="sticky-note-o" size={24} color="black" />
            <Text style={{fontWeight:'bold',fontSize:15, color:'black', marginLeft:20}}> Add Note</Text>
          </View> */}
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 7,
            }}>
              <Ionicons name="ios-pricetag-outline" size={24} color="black" />
           
            <Text style={{fontWeight:'bold',fontSize:15, color:'black', marginLeft:20}}> Category</Text>
            <Select
                    style={{height: 100,marginLeft:10, backgroundColor:'red'}}
                    selectedValue={category}
                    variant="rounded"
                    accessibilityLabel="category"
                    placeholder="category"
                    onValueChange={itemValue => {
                      setCategory(itemValue);
                    }}
                   
                    mt={1}>
                    {itemcat &&
                      itemcat.map((item, i) => {
                        return (
                          <Select.Item
                          
                            key={i}
                            label={item.name}
                            value={item.name}
                          />
                        );
                      })}
                  </Select>
          </View>
         
        </View>
        <TouchableOpacity style={styles.createButton} onPress={editData}>
          <Text style={{color: 'white', fontWeight: '900', fontSize: 20}}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                is24Hour={true}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
    <DateTimePickerModal
                isVisible={isDatePickerVisible1}
                mode="date"
               
                onConfirm={handleConfirm1}
                onCancel={hideDatePicker1}
              />
    </>
  );
};
const mapStateToProps = state => ({
  authState: state.auth,
});

export default connect(mapStateToProps,{editList})(EditList);

const styles = StyleSheet.create({
  container: {
   
   
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  headerLeft: {
    height: '100%',
    width: '10%',
  },
  headerMiddle: {
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lower: {
    height: windowHeight - 50,
    paddingHorizontal: 20,
  },
  textArra: {
    borderBottomColor: 'white',
  },
  listStyle: {
     paddingVertical:20
  },
  createButton: {
    marginTop: 15,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6284f7',
    borderRadius: 25,
  },
});
