import { StyleSheet, Text, View } from 'react-native';

import Status from './components/Status';

export default function App() {
  return (
    <View style={styles.container}>
      <Status/>

      <View style={styles.content}>
          <Text>content</Text>
      </View>
      
      <View style={styles.toolbar}>
        <Text>toolbar</Text>
      </View>
      
      <View style={styles.inputMethodEditor}>
        <Text>inputMethodEditor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
});