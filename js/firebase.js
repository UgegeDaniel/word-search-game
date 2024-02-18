const firebaseConfig = {
  apiKey: "AIzaSyBodXU1l6o2LRga_bSzUc81M3VYNoTbhtM",
  authDomain: "ecommerce-12a5f.firebaseapp.com",
  projectId: "ecommerce-12a5f",
  storageBucket: "ecommerce-12a5f.appspot.com",
  messagingSenderId: "862162330426",
  appId: "1:862162330426:web:e49960805911a8acb4e603",
  measurementId: "G-WWGHRH0J4D",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

// Function to fetch user data
function fetchUserData(userId) {
  if (!userId) {
    console.error("User ID is empty or null");
    return Promise.resolve(null);
  }

  return db
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
        console.log("No such document!");
        return null;
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      return null;
    });
}

async function updateFieldsInFirebase(documentId, fieldsToUpdate) {
  const filteredProfile = Object.fromEntries(
    Object.entries(fieldsToUpdate).filter(([_, value]) => value !== undefined)
  );

  try {
    const docRef = db.doc("users/" + documentId); // Correctly access the document reference
    const existingUserData = (await docRef.get()).data(); // Get the document data
    const updatedUserData = { ...existingUserData, ...filteredProfile };
    await docRef.update(updatedUserData); // Update the document
    localStorage.setItem("ws-userDetails", JSON.stringify(updatedUserData));
    return true;
  } catch (error) {
    console.error("Error updating document in Firebase:", error);
    return false;
  }
}
