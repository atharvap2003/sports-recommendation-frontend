// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3AmLQYuRKSTGkOwWc1gNIcZ036NzF48E",
    authDomain: "math-react-site-6b395.firebaseapp.com",
    projectId: "math-react-site-6b395",
    storageBucket: "math-react-site-6b395.appspot.com",
    messagingSenderId: "413900846768",
    appId: "1:413900846768:web:ad202ed7744cc16f366d75",
    measurementId: "G-4483N6ZJ1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
