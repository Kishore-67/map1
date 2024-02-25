import { Text, View } from 'react-native';
import FetchData from './src';

export const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Text>Home</Text>
      <FetchData />
    </View>
  );
};
