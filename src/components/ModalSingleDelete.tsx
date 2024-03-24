import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeDeleteSingleModal } from "../redux/reducers/modal.reducer";
import { Url } from "../interfaces";
import { updateUrls } from "../redux/reducers/urlList.reducer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalSingleDelete() {
  const { isDeleteSingleOpen, deleteSingleIndex } = useSelector(
    (state: {
      modal: {
        isDeleteSingleOpen: boolean;
        deleteSingleIndex: number;
      };
    }) => state.modal
  );

  console.log("delete modal index", isDeleteSingleOpen);
  console.log("daw", deleteSingleIndex);

  const urlFormRedux = useSelector(
    (state: {
      urlList: {
        urls: Url[];
      };
    }) => state.urlList.urls
  );
  const dispatch = useDispatch();

  const handleCloseDeleteSingleModal = () => {
    dispatch(closeDeleteSingleModal(false));
  };

  const handleConfirmDeleteSingle = () => {
    if (urlFormRedux) {
      const tempList = urlFormRedux.filter(
        (url: Url) => url !== urlFormRedux[deleteSingleIndex]
      );
      dispatch(updateUrls([...tempList]));
      dispatch(closeDeleteSingleModal(false));
    }
  };

  return (
    <div>
      <Modal
        open={isDeleteSingleOpen}
        onClose={handleCloseDeleteSingleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="p">
            Do you want to
            <span className="strong__span delete">Delete</span> this tab{" "}
            <span>?</span>.
          </Typography>
          <div className="modal__btnSection delete">
            <button
              className="btnDelete"
              onClick={handleCloseDeleteSingleModal}
            >
              Cancel
            </button>
            <button className="btnDelete" onClick={handleConfirmDeleteSingle}>
              Confirm
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
