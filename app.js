import { auth, db } from "./firebaseConfig.js"; 
import { collection, addDoc ,query,where ,getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";    



const form = document.querySelector("#todo-form");  
let  todoArray = []
onAuthStateChanged(auth, (user) => { 
    if (user) { 
        // console.log("User ID:", user.uid); // Display user ID when logged in
        getDataFromFirestore()
    } else { 
        window.location = "login.html"; // Redirect to login if not authenticated
    }
});  


form.addEventListener('submit', async (e) => {  
    e.preventDefault();  
    const title = document.querySelector("#title").value;  
    const description = document.querySelector("#description").value;  

    try {  
        const docRef = await addDoc(collection(db, "todo"), {  
            title: title,  
            description: description,  
            uid: auth.currentUser.uid // Correct reference to user ID  
        
        });  
        renderDataOnScreen(todoArray);

        // console.log("Document written with ID:", docRef.id);  
    } catch (e) {  
        console.error("Error adding document:", e);  
    }  
});



 async function getDataFromFirestore(){
   todoArray =  [];
    const q = query(collection(db, "todo"), where( "uid", "==" ,auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      todoArray.push({...doc.data(), docid: doc.id});       
    });  
    console.log(todoArray)
    renderDataOnScreen(todoArray)
}

function renderDataOnScreen(arr){
    let html = ''
    const table = document.querySelector("#table")
     arr.map((res)=>{
        html+= `
        <tr>
        <td>${res.title}</td>
        <td>${res.description}</td>
         <td> <button id="delbtn" onclick="deletMethod('${res.docid}')">Delete</button></td>
         <td> <button id="delbtn" onclick="UpdatedtMethod('${res.docid}')">UPDate</button></td>
         </tr>
     `
     })
     table.innerHTML = html;
}

renderDataOnScreen(todoArray)