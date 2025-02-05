import { auth, db } from "./firebaseConfig.js"; 
import { collection, addDoc ,query,where ,getDocs ,doc, deleteDoc , updateDoc ,} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"; 
import { onAuthStateChanged , signOut} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";    



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
    let title = document.querySelector("#title").value;  
    let description = document.querySelector("#description").value;  

    try {  
        const docRef = await addDoc(collection(db, "todo"), {  
            title: title,  
            description: description,  
            uid: auth.currentUser.uid 
        });

        console.log("Document written with ID: ", docRef.id);
        
        document.querySelector("#title").value = "";  
        document.querySelector("#description").value = "";  

        getDataFromFirestore(); 

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
         <td> <button class="delbtn">Delete</button></td>
         <td> <button  class = "update-btn">UPDate</button></td>
         </tr>
     `
     });
     table.innerHTML = html;

     const updatebtn = document.querySelectorAll('.update-btn');
     updatebtn.forEach((btn,index)=>{ 
       
      btn.addEventListener('click', async(e)=>{
        let  newtitle = document.querySelector("#title").value = todoArray[index].title;
        let newdescription = document.querySelector("#description").value = todoArray[index].description;
        let id = todoArray[index].docid
        try {
            await updateDoc(doc(db, "todo", id), {
                title:newtitle,
                description:newdescription
            });

            console.log("Document updated successfully!");

           

        } catch (error) {
            console.error("Error updating document:", error);
        }
         renderDataOnScreen(todoArray)
      })
 })

 const delbtn = document.querySelectorAll('.delbtn');
delbtn.forEach((btn,index)=>{ 
 btn.addEventListener('click', async(e)=>{
    const id = todoArray[index].docid;
    await deleteDoc(doc(db, "todo", id)); // Delete from Firestore
    todoArray.splice(index,1);
    renderDataOnScreen(todoArray)
 })
})

}

renderDataOnScreen(todoArray);


const logoutbtn =document.querySelector('#logout');

logoutbtn.addEventListener('click',()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('singout sucessfull')
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
})