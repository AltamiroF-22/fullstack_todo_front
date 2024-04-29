export interface UsersSearchedProps {
  _id: string;
  name: string;
  email: string;
  isFollowing: boolean;
  userPicture?: string;
}

export interface SearchUserProps {
  closeSearch: () => void;
}
