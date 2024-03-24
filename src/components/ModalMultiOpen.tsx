import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { closeOpenMultiModal } from "../redux/reducers/modal.reducer";
import { Url } from "../interfaces";
import { useEffect, useState } from "react";
import { convertStr } from "../methods/methods";
import { Checkbox } from "@mui/material";

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

export default function ModalMultiOpen() {
  const [tabList, setTabList] = useState<ConvertTab[]>([]);
  const dispatch = useDispatch();
  const { isOpenMultiOpen } = useSelector(
    (state: {
      modal: {
        isOpenMultiOpen: boolean;
      };
    }) => state.modal
  );

  //get urlList from redux store
  const urlFormRedux = useSelector(
    (state: {
      urlList: {
        urls: Url[];
      };
    }) => state.urlList.urls
  );

  //get Tabs and convert it to {url, label, icon, isChecked} when component is mounted
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

  //close modal
  const handleCloseModal = () => {
    dispatch(closeOpenMultiModal(false));
  };

  //check or uncheck url want to open
  const handleCheck = (index: number) => {
    tabList[index].isChecked = !tabList[index].isChecked;
    setTabList([...tabList]);
  };

  const handleConfirm = (tabList: ConvertTab[]) => {
    //filter checked url, get tabs which isChecked = true
    let filterTabList = tabList.filter((tab) => tab.isChecked == true);

    //convert back to {url, label, icon}
    filterTabList = filterTabList.map((tab) => {
      return {
        url: tab.url,
        label: tab.label,
        icon: tab.icon,
      };
    });

    // open tabs
    // dispatch(updateUrls(filterTabList));
    if (filterTabList) {
      for (let url of filterTabList) {
        window.open(url.url);
      }
    }

    // setShouldReset(true);
    dispatch(closeOpenMultiModal(false));
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
        open={isOpenMultiOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="p">
            Do you want to
            <span className="strong__span delete">Open</span> these tab(s){" "}
            <span>?</span>.
          </Typography>
          {renderList()}
        </Box>
      </Modal>
    </div>
  );
}
