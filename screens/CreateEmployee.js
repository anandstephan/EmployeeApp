import React, { useState } from 'react';
import { StyleSheet, Text, Modal, View, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


const CreateEmployee = ({navigation,route}) =>{

    const getDetails = (type)=>{
        if(route.params){
           switch(type){
               case "name":
                   return route.params.name
               case "phone":
                  return route.params.phone
               case "email":
                 return route.params.email
               case "salary":
                   return route.params.salary  
               case "picture":
                   return  route.params.picture
               case "position":
                 return  route.params.position  
           }
        }
        return ""
     }

    

     const [name,setName] = useState(getDetails("name"))
     const [phone,setPhone] = useState(getDetails("phone"))
     const [email,setEmail] = useState(getDetails("email"))
     const [salary,setSalary] = useState(getDetails("salary"))
     const [picture,setPicture] = useState(getDetails("picture"))
     const [position,setPosition] = useState(getDetails("position"));
     const [modal,setModal] = useState("");
     const [enableShift,setEnableShift] = useState(false);

     const pickFromGallery = async () =>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    
        if(granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newfile = {
                    uri:data.uri,
                    type:`test/${data.uri.split(",")[1]}`,
                    name:`test.${data.uri.split(",")[1]}`
                }
                handleUpload(newfile);
            }
        }else{
            Alert.alert("Please give Permission to Work")
        }
    }
    const pickFromCamera = async () =>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newfile = {
                    uri:data.uri,
                    type:`test/${data.uri.split(",")[1]}`,
                    name:`test.${data.uri.split(",")[1]}`
                }
                handleUpload(newfile);
            }
            // console.log(data)
        }else{
            Alert.alert("Please give Permission to Work")
        }
    }
    const handleUpload = (image) =>{
    
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","employeeApp");
        data.append("cloud_name","steveprojectinstaclone")

        fetch("https://api.cloudinary.com/v1_1/steveprojectinstaclone/image/upload",{
            method:"post",
            body:data
        })
         .then(res => res.json())
         .then(data=>{
             setPicture(data.url)
             setModal(false)
         })
    }

    const submitData = () =>{
        console.log("start!!!");
        fetch("http://192.168.43.56:3000/send-data",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log("hi");
                // Alert.alert({name}+'is Saved')
                props.navigation.navigate("Home")
            })
            .catch(err => console.log(err))
        
    }

    const updateDetails = ()=>{
        fetch("http://192.168.43.56:3000/update",{
            method:"put",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:route.params._id,
                name,
                email,
                phone,
                salary,
                picture,
                position
            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is updated successfuly`)
            navigation.navigate("Home")
        })
        .catch(err=>{
          Alert.alert("someting went wrong")
      })
    }


    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShift} >
        <View>
            <TextInput
            label="Name"
            style={styles.inputStyle}
            value={name}
            onFocus={()=>setEnableShift(false)}
            mode="outlined"
            onChangeText={text => setName(text)}
            />
            <TextInput
            label="Email"
            style={styles.inputStyle}
            value={email}
            onFocus={()=>setEnableShift(false)}
            mode="outlined"
            onChangeText={text => setEmail(text)}
            />
            <TextInput
            label="Phone"
            style={styles.inputStyle}
            value={phone}
            mode="outlined"
            keyboardType="number-pad"
            onFocus={()=>setEnableShift(false)}
            onChangeText={text => setPhone(text)}
            />
         <TextInput
            label="Salary"
            style={styles.inputStyle}
            value={salary}
            mode="outlined"
            onFocus={()=>setEnableShift(false)} 
            keyboardType="decimal-pad"
            onChangeText={text => setSalary(text)}
            />
            <TextInput
            label="Position"
            style={styles.inputStyle}
            value={position}
            mode="outlined"
            onFocus={()=>setEnableShift(true)}
            onChangeText={text => setPosition(text)}
            />
            <Button 
            icon={picture==""?"upload":"check"}
            style={styles.inputStyle}
            mode="contained"
            onPress={() => setModal(true )}>
            Upload Image
            </Button>
            {route.params?
             <Button 
             style={styles.inputStyle}
             icon="content-save"
              mode="contained"
              onPress={() => updateDetails()}>
                   Update details
             </Button>
             : 
             <Button 
             style={styles.inputStyle}
             icon="content-save"
              mode="contained" 
              onPress={() => submitData()}>
                   save
             </Button>
             }
            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            >
            <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
            <Button 
            icon="camera"
            mode="contained"
            onPress={()=>pickFromCamera()}>
            Camera
            </Button>
            <Button 
            icon="image-area"
            mode="contained"
            onPress={()=>pickFromGallery()}>
            Gallery
            </Button>
            </View>
            <Button 
            onPress={() => setModal(false)}>
            Cancel
            </Button>
            </View>
        </Modal>
         </View>
         </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
        margin:5
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"#b8e6ff"
    }
})

export default CreateEmployee