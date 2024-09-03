import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
}

interface CheckoutState {
  formData: FormData;
  useSavedAddress: boolean;
  isHydrated: boolean;
  cart: CartItem[];
  setFormData: (data: Partial<FormData>) => void;
  setUseSavedAddress: (use: boolean) => void;
  setIsHydrated: (hydrated: boolean) => void;
  setCart: (cart: CartItem[]) => void;
  resetFormData: () => void;
  populateFormWithUserData: (data: any) => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  immer((set) => ({
    formData: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zipCode: "",
      email: "",
      phoneNumber: "",
    },
    useSavedAddress: false,
    isHydrated: false,
    cart: [],

    setFormData: (data) =>
      set((state) => {
        Object.assign(state.formData, data);
      }),

    setUseSavedAddress: (use) => set({ useSavedAddress: use }),

    setIsHydrated: (hydrated) => set({ isHydrated: hydrated }),

    setCart: (cart) => set({ cart }),

    resetFormData: () =>
      set((state) => {
        state.formData = {
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          zipCode: "",
          email: "",
          phoneNumber: "",
        };
      }),

    populateFormWithUserData: (data) =>
      set((state) => {
        state.formData = {
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          address: data.address || "",
          city: data.city || "",
          zipCode: data.zipCode || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
        };
      }),
  }))
);
