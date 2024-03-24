import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeDeleteMultiModal } from "../redux/reducers/modal.reducer";
import { Url } from "../interfaces";
import { useEffect, useState } from "react";
import { convertStr } from "../methods/methods";
import { updateUrls } from "../redux/reducers/urlList.reducer";
import { Checkbox } from "@mui/material";
// import { updateUrls } from "../redux/reducers/urlList.reducer";

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

interface ConvertTab {
  url: string;
  label: string;
  icon: string;
  isChecked?: boolean;
}

export default function ModalMultiDelete() {
  const [tabList, setTabList] = useState<ConvertTab[]>([]);
  const dispatch = useDispatch();
  const { isDeleteMultiOpen } = useSelector(
    (state: {
      modal: {
        isDeleteMultiOpen: boolean;
      };
    }) => state.modal
  );

  const urlFormRedux = useSelector(
    (state: {
      urlList: {
        urls: Url[];
      };
    }) => state.urlList.urls
  );

  useEffect(() => {
    let tabs: ConvertTab[] = [];
    for (var tab of urlFormRedux) {
      let convertTab = {
        url: tab.url,
        label: tab.label,
        icon: tab.icon,
        isChecked: true,
      } as ConvertTab;
      tabs.push(convertTab);
    }
    setTabList([...tabs]);
  }, [urlFormRedux]);

  const handleCloseModal = () => {
    dispatch(closeDeleteMultiModal(false));
  };

  const handleCheck = (index: number) => {
    tabList[index].isChecked = !tabList[index].isChecked;
    setTabList([...tabList]);
  };

  const handleConfirm = (tabList: ConvertTab[]) => {
    //filter checked url
    let filterTabList = tabList.filter((tab) => tab.isChecked == false);

    //convert back to {url, label, icon}
    filterTabList = filterTabList.map((tab) => {
      return {
        url: tab.url,
        label: tab.label,
        icon: tab.icon,
      };
    });

    //handle save
    dispatch(updateUrls(filterTabList));

    // setShouldReset(true);
    dispatch(closeDeleteMultiModal(false));
  };

  const renderList = () => {
    return (
      <div className="modal__content">
        <ul className="modal__list">
          {tabList &&
            tabList.map((tab, index) => {
              return (
                <li key={index}>
                  <Checkbox
                    checked={tab.isChecked}
                    onChange={() => handleCheck(index)}
                  />
                  <p>{convertStr(tab.label)}</p>
                </li>
              );
            })}
        </ul>
        <div className="modal__btnSection delete">
          <button className="btnDelete" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="btnDelete" onClick={() => handleConfirm(tabList)}>
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Modal
        open={isDeleteMultiOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="p">
            Do you want to
            <span className="strong__span delete">Delete</span> these tab(s){" "}
            <span>?</span>.
          </Typography>
          {renderList()}
        </Box>
      </Modal>
    </div>
  );
}
