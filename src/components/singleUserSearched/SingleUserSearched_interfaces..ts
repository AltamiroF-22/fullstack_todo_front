export interface SingleUserProps {
  follow?: boolean;
  name?: string;
  email?: string;
  image?: string;
  addFriend?: () => void;
  removeFriend?: () => void;
}
