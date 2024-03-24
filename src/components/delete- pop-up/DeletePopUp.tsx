import "./DeletePopUp.sass";

interface DeletePopUpButtonsProps {
  deleteBtn: () => void;
  cancelBtn: () => void;
}

const DeletePopUp = ({ deleteBtn, cancelBtn }: DeletePopUpButtonsProps) => {
  return (
    <main className="background-bulr" onClick={cancelBtn}>
      <section className="pop-up">
        <h1>Are you sure?</h1>
        <div className="buttons">
          <button className="delete-btn" onClick={deleteBtn}> Delete</button>
          <button onClick={cancelBtn}>Cancel</button>
        </div>
      </section>
    </main>
  );
};
export default DeletePopUp;
