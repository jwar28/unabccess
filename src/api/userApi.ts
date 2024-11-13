import { db } from "@/lib/firebaseConfig";
import { User } from "@/types/user";
import { collection , doc, getDoc, setDoc } from "firebase/firestore";

const usersRef = collection(db, "users");

export const fetchUserData = async(uid: string) => {
  try {
    const userDocRef = doc(usersRef, uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as User;
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export const setUserData = async(uid: string, userData: User) => {
  try {
    const userDocRef = doc(usersRef, uid); 
    await setDoc(userDocRef, userData, { merge: true });

    console.log("User data successfully written!");
    return true;
  } catch (error) {
    console.error("Error writing user data:", error);
    return false;
  }
}

