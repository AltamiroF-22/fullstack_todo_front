export interface TaskProps {
  hasButtons: boolean;
  hasVisibility: boolean;
  complete: boolean;
  title: string;
  description: string;
  status: string;
  visibility?: string;
  editBtn?: () => void;
  deleteBtn?: () => void;
}
