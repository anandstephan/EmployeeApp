import React, { useState } from 'react';
import { StyleSheet, Text, View, Image,Linking, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card,Button } from 'react-native-paper';
import { MaterialIcons,Entypo } from '@expo/vector-icons';

const Profile = (props) =>{
    
   const {_id,name,picture,phone,salary,position} = props.route.params.item
    const item = props.route.params.item;
    const email = item.email
    const OpenDial = () =>{
        if(Platform.OS == 'android'){
            Linking.openURL("tel:"+item.phone)
        }else{
            Linking.openURL("telprompt:0987654321")
        }
    }
    const fireEmployee = (id) =>{
        fetch('http://192.168.43.56:3000/delete',{
            method:"delete",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id
            })
        })
        .then(res=>res.json())
        .then(data =>{
            if(data){
                Alert.alert(`${data.name} is deleted`);
                props.navigation.replace("Home")
            }
        } )
        .catch(err=>console.log(err))
    }

    return (
        <View style={styles.root}>
        <LinearGradient
          colors={['#0033ff', '#6bc1ff']}
          style={{height:'20%'}}
        />
        <View style={{alignItems:"center"}}>
        <Image
        style={{width:140,height:140,borderRadius:70,marginTop:-50}}
        source={{uri:item.picture}}
        />
        </View>
        <View style={{alignItems:"center",margin:15}}>
        <Title>{item.name}</Title>
        <Text style={styles.mytext}> {item.position}</Text>
        </View>
        <Card style={styles.myCard} onPress={()=>Linking.openURL('mailto:'+email)}>
        <View style={styles.cardContent}>
        <MaterialIcons name="email" size={32} color="#006aff" />
        <Text style={styles.mytext}>{item.email}</Text>
        </View>
        </Card>
        <Card style={styles.myCard} onPress={()=>OpenDial()}>
        <View style={styles.cardContent}>
        <Entypo name="phone" size={32} color="#006aff" />
        <Text style={styles.mytext}> {item.phone}</Text>
        </View>
        </Card>
        <Card style={styles.myCard}>
        <View style={styles.cardContent}>
        <MaterialIcons name="attach-money" size={32} color="#006aff" />
        <Text style={styles.mytext}> {item.salary} LPA</Text>
        </View>
        </Card>
        <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}>
        <Button 
            icon="account-edit"
            mode="contained"
            onPress={() => {
                props.navigation.navigate("Create",
                {_id,name,picture,phone,salary,email,position}
                ) 
             }}
            >
            Edit
            </Button>
            <Button 
            icon="delete"
            mode="contained"
            onPress={()=>fireEmployee(item._id)}
            >
            Fire Employee
            </Button>
        </View>
        </View>

    );
    
}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
    myCard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row",
        padding:8
    },
    mytext:{
       fontSize:18,
       marginLeft:5,
       marginTop:3
    }
})

export default Profile