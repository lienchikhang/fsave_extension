export interface ISearch {
    handleAddUrl: (newUrl: Url) => void;
    // setUrls: (newUrl: Url) => void;
}

export interface Url {
    label: string;
    url: string;
    icon?: string;
}

export interface IListUrl {
    setUrls: (newUrl: Url) => void;
    handleDelete: (index: number) => void;
}

export interface ISearchPrev<T> {
    value: T,
    setValue: (cd: (prev: T) => T) => void;
}

export interface IModal {
    isModalOpen: boolean;
    handleOk: (index: number, editUrl: Url) => void;
    handleCancel: () => void;
    editUrl: Url | undefined;
}

export interface IState {
    urlList: {
        urls: Url[];
    }
}

export interface IInitialState {
    urls: Url[];
}