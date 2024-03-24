import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { addUrl } from "../redux/reducers/urlList.reducer";
import { closeAddMultiModal } from "../redux/reducers/modal.reducer";
import { convertStr } from "../methods/methods";

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

export default function ModalConfirm() {
  const [tabList, setTabList] = useState<ConvertTab[]>([]);
  const [shouldReset, setShouldReset] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isAddMultiOpen } = useSelector(
    (state: {
      modal: {
        isAddMultiOpen: boolean;
      };
    }) => state.modal
  );

  //getAllTabs
  useEffect(() => {
    chrome.tabs.query({ currentWindow: true }, (currentWindow) => {
      let tabs: ConvertTab[] = [];
      for (var tab of currentWindow) {
        let convertTab = {
          url: tab.url,
          label: tab.title,
          icon: tab.favIconUrl,
          isChecked: true,
        } as ConvertTab;
        tabs.push(convertTab);
      }
      setTabList([...tabs]);
    });
  }, [shouldReset]);

  const handleClose = () => console.log("e");

  const handleCheck = (index: number) => {
    tabList[index].isChecked = !tabList[index].isChecked;
    setTabList([...tabList]);
  };

  const handleConfirm = (tabList: ConvertTab[]) => {
    //filter checked url
    let filterTabList = tabList.filter((tab) => tab.isChecked == true);

    //convert back to {url, label, icon}
    filterTabList = filterTabList.map((tab) => {
      return {
        url: tab.url,
        label: tab.label,
        icon: tab.icon,
      };
    });

    //handle save
    for (let tab of filterTabList) {
      dispatch(addUrl(tab));
    }

    setShouldReset(true);
    dispatch(closeAddMultiModal(false));
  };

  const handleCloseModal = () => {
    dispatch(closeAddMultiModal(false));
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
        <div className="modal__btnSection">
          <button onClick={handleCloseModal}>Cancel</button>
          <button onClick={() => handleConfirm(tabList)}>Confirm</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Modal
        open={isAddMultiOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="p">
            Look like you have{" "}
            <span className="strong__span">more than one</span> tab saving.
          </Typography>
          {renderList()}
        </Box>
      </Modal>
    </div>
  );
}
