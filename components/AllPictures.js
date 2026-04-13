import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Modal, StyleSheet, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Picker } from '@react-native-picker/picker'; 
import { addPictureToFolder } from './GallerySlice';

export default function AllPictures() {
  const pictures = useSelector(state => state.gallery.allPictures);
  const folders = useSelector(state => state.gallery.folders);
  const dispatch = useDispatch();

  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(Object.keys(folders)[0]);
  return (
    <View style={styles.container}>
      
      <FlatList
        data={pictures}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImg(item)} style={styles.card}>
            <Image source={item} style={styles.thumbnail} resizeMode="cover"/>
          </TouchableOpacity>
        )}
      />

      
      <Modal visible={!!selectedImg} animationType="slide">
        <View style={styles.modalContent}>
          <Image source={selectedImg} style={styles.bigImage} />
          
          <Text style={{ marginTop: 20 }}>Choisir un dossier :</Text>
          <Picker
            selectedValue={selectedFolder}
            style={{ width: 250 }}
            onValueChange={(item) => setSelectedFolder(item)}
          >
            {Object.keys(folders).map(name => (
              <Picker.Item key={name} label={name} value={name} />
            ))}
          </Picker>

          <View style={styles.buttonRow}>
            <Button title="Ajouter au dossier" onPress={() => {
              dispatch(addPictureToFolder({ folderName: selectedFolder, image: selectedImg }));
              setSelectedImg(null);
              alert("Ajouté !");
            }} />
            <Button title="Fermer" color="red" onPress={() => setSelectedImg(null)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  card: {
    margin: 5,
    width: 100, 
    height: 100,
  },
  thumbnail: { 
    width: 100, 
    height: 100, 
    borderRadius: 10,
    backgroundColor: '#f0f0f0', 
  },
  modalContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  bigImage: { width: '100%', height: '50%', resizeMode: 'contain' },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 20 }
});