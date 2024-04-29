import DefaultImage from "../../assets/images/default_img.webp";

export interface UserDataProps {
  _id: string;
  name: string;
  email: string;
  password: string;
  friends: string[];
  profilePicture?: string;
}

export interface UserFriendsProps {
  _id: string;
  name: string;
  profilePicture: string;
  email: string;
}

export interface CloseProps {
  closeBtn: () => void;
  closeOnLink: () => void;
}

export const InitialUserData: UserDataProps = {
  _id: "",
  name: "",
  email: "",
  password: "",
  friends: [],
  profilePicture: DefaultImage,
};
