import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removePictureFromFolder } from './GallerySlice'; 

export default function PicturesInFolder({ route }) {
  const { folderName } = route.params;
  const dispatch = useDispatch();
  
  const folders = useSelector(state => state.gallery.folders);
  const photosDuDossier = folders[folderName] || [];

  const handleDelete = (photo) => {
    dispatch(removePictureFromFolder({ folderName: folderName, image: photo }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dossier : {folderName}</Text>
      
      {photosDuDossier.length === 0 ? (
        <Text style={styles.emptyText}>Ce dossier est vide. 📂</Text>
      ) : (
        <FlatList
          data={photosDuDossier}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item} style={styles.image} resizeMode="cover" />
              
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDelete(item)}
              >
                <Text style={styles.deleteText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#888' },
  card: {
    margin: 5,
    width: 100, 
    height: 100,
    borderRadius: 10,
    overflow: 'visible', 
    backgroundColor: '#f0f0f0',
    position: 'relative', 
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  }
});