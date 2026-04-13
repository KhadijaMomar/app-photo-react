# 📸 MyGallery App - React Native & Redux

Une application mobile de gestion de galerie photo développée avec **React Native (Expo)** et **Redux Toolkit**. L'application permet de visualiser des photos, de créer des dossiers personnalisés, d'organiser ses images et de prendre de nouvelles photos via la caméra.

## 🚀 Fonctionnalités

- **Galerie Principale** : Affichage d'une grille de photos stockées localement et prises avec l'appareil.
- **Gestion de Dossiers** : 
  - Création dynamique de nouveaux dossiers.
  - Ajout de photos de la galerie vers un dossier spécifique (via un Picker).
  - Consultation des photos par dossier.
  - Suppression de photos à l'intérieur d'un dossier.
- **Caméra** : Prise de photos en temps réel et ajout automatique à la galerie globale.
- **Navigation** : Système de navigation par onglets (Tabs) et par piles (Stack) avec React Navigation.

## 🛠️ Technologies utilisées

- **Framework** : [React Native (Expo)](https://expo.dev/)
- **Gestion d'état** : [Redux Toolkit](https://redux-toolkit.js.org/)
- **Navigation** : [React Navigation](https://reactnavigation.org/) (Bottom Tabs & Stack)
- **Caméra** : [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)
- **UI** : React Native StyleSheet & Picker.

## 📁 Structure du Projet

```text
├── assets/               # Images locales (photo1.jpg, etc.)
├── components/           
│   ├── AllPictures.js    # Écran de la galerie principale
│   ├── Camera.js         # Écran de prise de vue
│   ├── Folders.js        # Gestion et liste des dossiers
│   ├── GallerySlice.js   # Logique Redux (Actions et Reducers)
│   └── PicturesInFolder.js # Vue détaillée d'un dossier
├── store/
│   └── store.js          # Configuration du store Redux
├── App.js                # Point d'entrée avec la navigation
└── package.json          # Dépendances du projet

---
## 📁 Cloner le Projet

```bash

```
```bash
git clone [https://github.com/KhadijaMomar/app-photo-react.git)
cd app-photo-react

```
```bash
npm install
# ou
npx expo install
```
```bash
npx expo install expo-camera @react-native-picker/picker @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack react-native-safe-area-context react-native-screens
```

```bash
npx expo start
```