import {initializeApp} from 'firebase/app'

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDPw_JVrNqeWpGpDUfWRZ1_bbjfPisF5dc",
    authDomain: "fir-basics-github-tfk-5387f.firebaseapp.com",
    projectId: "fir-basics-github-tfk-5387f",
    storageBucket: "fir-basics-github-tfk-5387f.appspot.com",
    messagingSenderId: "335320390985",
    appId: "1:335320390985:web:781a260f2f6d163c1a0e98"
  };

  initializeApp(firebaseConfig)


const db=getFirestore()

const colRef=collection(db,'books')

getDocs(colRef)
  .then((snapshot)=>{
     // console.log(snapshot.docs);
     let books=[]
      snapshot.docs.forEach((doc)=>{
          books.push({...doc.data(), id:doc.id})
      })
      console.log(books);
     
  })
  .catch(err=>console.log(err.message))

  // adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

