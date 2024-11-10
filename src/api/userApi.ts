import { useUserStore } from "@/hooks/useUserStore";
import { getDatabase, ref, child, get } from "firebase/database";

export const fetchUserData = async (userId: string) => {
	const dbRef = ref(getDatabase());
	try {
		const snapshot = await get(child(dbRef, `users/${userId}`));
		if (snapshot.exists()) {
			const userData = snapshot.val();
			useUserStore.getState().setUser(userData);
		} else {
			console.log("No data available");
		}
	} catch (error) {
		console.error("Error fetching users:", error);
	}
};
