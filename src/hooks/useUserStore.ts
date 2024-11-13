import { User } from "@/types/user";
import { create } from "zustand/react";
import { persist, createJSONStorage } from "zustand/middleware";

interface IUserStore {
	user: User;
	setUser: (user: User) => void;
}

export const useUserStore = create<IUserStore>()(
	persist(
		(set) => ({
			user: {
				email: "",
				name: "",
				lastName: "",
				studentId: "",
				career: "",
			},
			setUser: (user: User) => set({ user }),
		}),
		{
			name: "user-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
