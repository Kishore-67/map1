import React from 'react';
import { FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dbfirestore } from '../config';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';


const listData = [
  {
    title: 'Namakkal',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Salem',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Erode',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Tirunelvelli',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Coimbatore',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Chennai',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Dindigul',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Karur',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Cuddalore',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Trichy',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Vellore',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Thanjavur',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
  {
    title: 'Madurai',
    subtitle: 'MainBustand',
    avatar: require('./image/man.jpg'),
    icon: require('./image/arrow.png'),
  },
];



const ListItem = ({ item }) => {
    const navigation =useNavigation();

    const handlePress= async(title,subtitle)=>{
        console.log(`clicked on ${title} (${subtitle})`);
        try {
          const querySnapshot = await getDocs(collection(dbfirestore, title));
          if (querySnapshot.empty) {
              console.log('No documents found in the collection');
          } else {
              const data =[];
              querySnapshot.forEach((doc) => {
                  data.push({ id: doc.id, ...doc.data() });
                  console.log('Document ID:', doc.id);
                  console.log('Document Data:', doc.data());
              });
              navigation.navigate('BusTimings',{data});
          }
      } 
        catch(error)
        {
          console.log('Error fetching document: ',error);
        }
    }

    return(
  <TouchableOpacity activeOpacity={0.8}>
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <Image source={item.avatar} style={{ width: 50, height: 50, borderRadius: 25 }} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ fontSize: 14, color: '#666' }}>{item.subtitle}</Text>
      </View>
      <TouchableOpacity onPress={()=>handlePress(item.title,item.subtitle)}>
        <Image source={item.icon} style={{ width: 20, height: 20, marginLeft: 170 }} />
      </TouchableOpacity>

    </View>
    <View style={{ height: 1, backgroundColor: '#ccc', marginLeft: 60, marginRight: 30 }} />

  </TouchableOpacity>
);
};

const Busstand = () => {
  return (
    <FlatList
      data={listData}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Busstand;



