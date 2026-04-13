import React, { useState } from 'react'; 
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createFolder } from './GallerySlice'; 

export default function Folders({ navigation }) {
  const [newFolderName, setNewFolderName] = useState('');
  const folders = useSelector(state => state.gallery.folders);
  const dispatch = useDispatch();

  const handleCreateFolder = () => {
    if (newFolderName.trim().length > 0) {
      dispatch(createFolder(newFolderName.trim()));
      setNewFolderName(''); 
    } else {
      alert("Veuillez saisir un nom de dossier");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Dossiers 📁</Text>

      <View style={styles.addFolderContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom du nouveau dossier..."
          value={newFolderName}
          onChangeText={setNewFolderName}
        />
        <Button title="Créer" onPress={handleCreateFolder} />
      </View>
   

      <FlatList
        data={Object.keys(folders)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.folderCard}
            onPress={() => navigation.navigate('PicturesInFolder', { folderName: item })}
          >
            <Text style={{ fontSize: 30, marginRight: 15 }}>📂</Text>
            <View>
              <Text style={styles.folderName}>{item}</Text>
              <Text style={styles.photoCount}>{folders[item].length} photo(s)</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  addFolderContainer: { 
    flexDirection: 'row', 
    marginBottom: 25, 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 8,
    alignItems: 'center'
  },
  input: { 
    flex: 1, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    marginRight: 10, 
    padding: 5 
  },
  folderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  folderName: { fontSize: 18, fontWeight: '600' },
  photoCount: { color: '#666' }
});