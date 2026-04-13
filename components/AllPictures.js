import React, { useState } from 'react';
// 1. On ajoute Platform pour gérer les différences iOS/Android
import { View, FlatList, Image, TouchableOpacity, Modal, StyleSheet, Text, Button, Platform } from 'react-native'; 
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
          {/* Correction pour l'affichage de l'image (web/mobile) */}
          <Image 
            source={selectedImg?.uri ? { uri: selectedImg.uri } : selectedImg} 
            style={styles.bigImage} 
          />
          
          <Text style={{ marginTop: 20, fontWeight: 'bold', color: '#000' }}>
            Choisir un dossier :
          </Text>

          {/* --- MODIFICATION ICI POUR LE MOBILE --- */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedFolder}
              style={{ 
                width: 250, 
                height: Platform.OS === 'ios' ? 150 : 50, // Hauteur plus grande pour iOS
                color: '#000' // Force le texte en noir
              }}
              onValueChange={(item) => setSelectedFolder(item)}
              dropdownIconColor="#000" // Pour Android
            >
              {Object.keys(folders).map(name => (
                <Picker.Item 
                  key={name} 
                  label={name} 
                  value={name} 
                  color="#000" // Force la couleur de l'écriture
                />
              ))}
            </Picker>
          </View>

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
  card: { margin: 5, width: 100, height: 100 },
  thumbnail: { width: 100, height: 100, borderRadius: 10, backgroundColor: '#f0f0f0' },
  modalContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  // Conteneur pour aider le Picker à s'afficher sur iOS
  pickerContainer: {
    width: 250,
    justifyContent: 'center',
    marginVertical: 10,
  },
  bigImage: { width: '100%', height: '40%', resizeMode: 'contain', borderRadius: 15 },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 20 }
});