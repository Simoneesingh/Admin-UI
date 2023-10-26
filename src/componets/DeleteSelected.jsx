import "./DeleteSelected.css";

const DeleteSelected = ({ handleDeleteSelected }) => {
  return (
    <>
      <button className="DeleteSelected" onClick={handleDeleteSelected}>
        DELETE SELECTED
      </button>
    </>
  );
};

export default DeleteSelected;
