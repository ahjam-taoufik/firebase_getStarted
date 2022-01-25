import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
     getAuth,
     createUserWithEmailAndPassword,
     signOut,
     signInWithEmailAndPassword,
     onAuthStateChanged
    } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPw_JVrNqeWpGpDUfWRZ1_bbjfPisF5dc",
  authDomain: "fir-basics-github-tfk-5387f.firebaseapp.com",
  projectId: "fir-basics-github-tfk-5387f",
  storageBucket: "fir-basics-github-tfk-5387f.appspot.com",
  messagingSenderId: "335320390985",
  appId: "1:335320390985:web:781a260f2f6d163c1a0e98",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const colRef = collection(db, "books");

//==============snapshot
const q = query(colRef, orderBy("createdAt"));

onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

//adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

//get a single document
// const docRef=doc(db, 'books' , 'JfBuBC8BF2QesTYXFA65')
// getDoc(docRef)
// .then((doc)=>{
//         console.log(doc.data(),doc.id);
//     })

//  get a single document in real time change
//     const docRef=doc(db, 'books' , 'JfBuBC8BF2QesTYXFA65')
// onSnapshot(docRef,(doc)=>{
//     console.log(doc.data(),doc.id);
// })

//updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "apdated title",
  }).then(() => {
    updateForm.reset();
  });
});

// signUp users
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
     // console.log(cred)
     // console.log('==============================')
    //  console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
     // console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
    //  console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
  })


