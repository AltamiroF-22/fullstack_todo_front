export interface EditingAddTasksProps {
  method: string;
  popUpTitle: string;
  closePopUp: () => void;
  onSubmit: (formData: {
    title: string;
    description: string;
    visibility: string;
    status: string;
  }) => void;
  defaultTitle?: string;
  defaultDescription?: string;
}
