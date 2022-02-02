import {Packs} from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../routes/routes";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {getPacksTC, createPackTC, changePackTitleTC, removePackTC, setPacksPageAC, setSortPacks} from "./PacksReducer";
import {PackDataType} from "../../api/packsAPI";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import classes from "./PacksContainer.module.css"
import SuperButton from "../../components/SuperButton/SuperButton";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";

export const PacksContainer = () => {
    const [rangeValue, setRangeValue] = useState<[number, number]>([0, 200]);
    const min = rangeValue[0];
    const max = rangeValue[1];
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [pageCount, setPageCount] = useState(10);
    const currentPage: number = useSelector<AppRootStateType, number>(state => state.packs.page);
    const [searchValue, setSearchValue] = useState('');
    const [showMyPacksPage, setShowMyPacksPage] = useState(false);
    const [cardName, setCardName] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editName, setEditName] = useState('');
    const [packId, setPackId] = useState('');
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const packs: Array<PackDataType> = useSelector<AppRootStateType, Array<PackDataType>>(state => state.packs.packs);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const totalCount: number = useSelector<AppRootStateType, number>(state => state.packs.totalCount);
    const sortType = useSelector<AppRootStateType, string | undefined>(state => state.packs.sortMethod);

    const searchPacks = useCallback(() => {
        // if (isLoggedIn) {
        //     if (showMyPacksPage) {
        //         dispatch(getPacksTC({id: authID, currentPage, pageCount, min, max}));
        //     } else {
        //         dispatch(getPacksTC({currentPage, sortType, pageCount, min, max}));
        //     }
        // }
    }, [rangeValue])

    const changeRangeValue = (value: [number, number]) => {
        setRangeValue(value);
    }

    const changePageCount = (value: number) => {
        setPageCount(+value);
    }

    const changeNumberPage = useCallback((value: number) => {
        dispatch(setPacksPageAC(value));
    }, [currentPage]);

    const ref: any = useRef();

    const getAllPacks = useCallback(() => {
        setShowMyPacksPage(false);
        dispatch(getPacksTC({currentPage, pageCount}));
    }, [currentPage, showMyPacksPage, pageCount])

    const getMyPacks = useCallback(() => {
        setShowMyPacksPage(true);
        dispatch(getPacksTC({id: authID, currentPage}));
    }, [showMyPacksPage, currentPage, authID])

    const onChangeSearchValue = (value: string) => {
        setSearchValue(value);
    }

    const addPacks = () => {
        setShowAddModal(true);
    };

    const addPack = () => {
        dispatch(createPackTC(cardName, showMyPacksPage, authID));
        setShowAddModal(false);
        setCardName('');
    }

    const changeTitle = useCallback(() => {
        dispatch(changePackTitleTC(packId, editName));
        setShowEditModal(false);
        setEditName('');
        setPackId('');
    }, [packId, editName])

    const closeModal = useCallback(() => {
        if (showAddModal) {
            setShowAddModal(false);
            setCardName('');
        } else if (showEditModal) {
            setShowEditModal(false);
            setEditName('');
            setPackId('');
        }
    }, [showAddModal, cardName, showEditModal, editName, packId])

    const sortCallBack = (sort: string) => {
        dispatch(setSortPacks(sort))
    }
    const removePack = useCallback((id: string) => {
        dispatch(removePackTC(id, currentPage, showMyPacksPage, authID))
    }, [currentPage, showMyPacksPage, authID]);


    useOnClickOutside(ref, closeModal);

    useEffect(() => {
        if (isLoggedIn) {
            if (showMyPacksPage) {
                dispatch(getPacksTC({id: authID, currentPage, pageCount, min, max}));
            } else {
                dispatch(getPacksTC({currentPage, sortType, pageCount, min, max}));
            }
        }
    }, [dispatch, isLoggedIn, currentPage, sortType, pageCount, min, max]);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const onChangePackNameHandler = (value: string) => setCardName(value);
    const onChangeEditNameHandler = (value: string) => setEditName(value);

    const editHandler = (id: string, name: string) => {
        setEditName(name);
        setPackId(id);
        setShowEditModal(true);
    }

    return (
        <div className={classes.packsContainer}>
            {showAddModal || showEditModal ? <div className={classes.modal}>
                {
                    showAddModal &&
                    <div className={classes.container} ref={ref}>
                        {showAddModal
                            ? <SuperInputText
                                className={classes.modalFields}
                                onChangeText={onChangePackNameHandler}
                                type='text' name='name'
                                placeholder='Name'
                                value={cardName}
                            />
                            : <SuperInputText
                                className={classes.modalFields}
                                onChangeText={onChangeEditNameHandler}
                                type='text' name='name'
                                placeholder='Name'
                                value={editName}
                            />
                        }
                        <div className={classes.buttonsWrapper}>
                            <SuperButton className={classes.modalAddButton} onClick={addPack}>Add</SuperButton>
                            <SuperButton className={classes.modalCloseButton} onClick={closeModal}>Close</SuperButton>
                        </div>
                    </div>
                }
                {
                    showEditModal &&
                    <div className={classes.container} ref={ref}>
                        <SuperInputText
                            className={classes.modalFields}
                            onChangeText={onChangeEditNameHandler}
                            type='text' name='name'
                            placeholder='Name'
                            value={editName}
                        />
                        <div className={classes.buttonsWrapper}>
                            <SuperButton className={classes.modalAddButton} onClick={changeTitle}>Edit</SuperButton>
                            <SuperButton className={classes.modalCloseButton} onClick={closeModal}>Close</SuperButton>
                        </div>
                    </div>
                }
            </div> : null}
            <Packs
                getPacks={getAllPacks}
                sortCallback={sortCallBack}
                sortMethod={sortType}
                addPacks={addPacks}
                onChangeSearchValue={onChangeSearchValue}
                packs={packs}
                authID={authID}
                searchValue={searchValue}
                editHandler={editHandler}
                removePack={removePack}
                totalCount={totalCount}
                currentPage={currentPage}
                changeNumberPage={changeNumberPage}
                getMyPacks={getMyPacks}
                showMyPacksPage={showMyPacksPage}
                options={options}
                changePageCount={changePageCount}
                pageCount={pageCount}
                changeRangeValue={changeRangeValue}
                rangeValue={rangeValue}
                searchPacks={searchPacks}
            />
        </div>
    )
}
