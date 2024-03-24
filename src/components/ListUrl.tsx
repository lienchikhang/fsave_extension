import React, { MouseEventHandler, useEffect, useState } from "react";
import { Url } from "../interfaces";
import { useSelector } from "react-redux";
import { convertStr } from "../methods/methods";
import { useDispatch } from "react-redux";
// import { updateUrls } from "../redux/reducers/urlList.reducer";
import {
  openDeleteMultiModal,
  openDeleteSingleModal,
  openOpenMultiModal,
} from "../redux/reducers/modal.reducer";

const ListUrl: React.FC = () => {
  const [listUrl, setListUrl] = useState<Url[] | null>([]);
  const [canClick, setCanClick] = useState<boolean>(false);
  const dispatch = useDispatch();
  const urlFormRedux = useSelector(
    (state: {
      urlList: {
        urls: Url[];
      };
    }) => state.urlList.urls
  );

  useEffect(() => {
    setListUrl(urlFormRedux);
    localStorage.setItem("urls", JSON.stringify(urlFormRedux));
  }, [urlFormRedux]);

  useEffect(() => {
    if (listUrl && listUrl.length > 0) {
      setCanClick(true);
    }
  }, [listUrl]);

  const handleNavigate = (url: string) => {
    window.open(url);
  };

  const handleClick = (
    url: string
  ): MouseEventHandler<HTMLTableRowElement> | undefined => {
    return (e) => {
      e.preventDefault();
      handleNavigate(url);
    };
  };

  const handleClickDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    indexUrl: number
  ) => {
    e.stopPropagation();
    console.log(indexUrl);
    if (listUrl)
      dispatch(openDeleteSingleModal({ bool: true, index: indexUrl }));
  };

  const handleClickDeleteAll = () => {
    if (listUrl && listUrl.length == 0) {
      setCanClick(false);
      return;
    }
    dispatch(openDeleteMultiModal(true));
  };

  const handleOpenAll = () => {
    //confirm
    dispatch(openOpenMultiModal(true));
  };

  return (
    <div className="table__wrapper">
      <div className="table__top">
        <button onClick={handleOpenAll}>Open all</button>
        <button
          className={`${canClick ? "" : "unactive"}`}
          onClick={handleClickDeleteAll}
        >
          Delete all
        </button>
      </div>
      <div className="table__bottom">
        {listUrl &&
          listUrl.map((url: Url, index: number) => {
            return (
              <div
                key={index}
                className="list__item"
                onClick={handleClick(url.url)}
              >
                <img
                  className="item__img"
                  src={url.icon ? url.icon : "./vite.svg"}
                  alt="icon"
                />
                <h3>{convertStr(url.label)}</h3>
                <button
                  onClick={(e) => handleClickDelete(e, index)}
                  className="item__btn"
                >
                  <i className="fa-solid fa-delete-left"></i>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListUrl;
