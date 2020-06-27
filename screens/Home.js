import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, FlatList, Alert } from 'react-native';
import { Card,FAB } from 'react-native-paper';

const Home = (props) =>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    const fetchData = ()=>{
        fetch("http://192.168.43.56:3000/")
        .then(res => res.json())
        .then(data => {
            setData(data)
            setLoading(false)
        })
        .catch(err=>{
            Alert.alert("Something went wrong"+err);
        })
    }

    useEffect(()=>{
        fetchData()
    },[])


    const renderList = (item)=>{
        return (
            <Card style={styles.mycard}
             key={item._id} 
             onPress={()=>props.navigation.navigate("Profile",{item})}>
            <View style={styles.cardView}>
            <Image
            style={{width:60,height:60,borderRadius:30}}
            source={{uri:item.picture}}
            />
            <View style={{marginLeft:10}}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.position}</Text>
            </View>
            </View>
        </Card>     
        );
    }
    return (
        <View style={{flex:1}}>
            <FlatList
            data={data}
            renderItem={({item})=>{
            return renderList(item)
            }}
            keyExtractor={item=>`${item._id}`}
            refreshing={loading}
            onRefresh={()=>fetchData()}
            />
        
            
             <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors:{accent:"blue"}}}
            onPress={() => props.navigation.navigate("Create")}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    mycard:{
        margin:5,
        padding:5
    },
    cardView:{
        flexDirection:"row",
        padding:6
    },
    text:{
        fontSize:20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }
})

export default Home