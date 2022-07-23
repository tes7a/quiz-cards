import {cardsAPI, CardsResp, GetDataType, GradeData, PostCardData, PutDataType} from '../../api/cardsAPI';
import {setAppErrorAC, setStatusAppAC} from '../../app/app-reducer';
import {AppDispatch, AppRootStateType, ThunkActionType} from '../../app/store';

const initialCardsState: initialCardsStateType = {
    cards: [],
    page: 1,
    pageCount: 10,
    cardsTotalCount: 10,
    maxGrade: 0,
    minGrade: 0,
    packUserId: '',
    totalCount: 0,
    currentCardsPackID: '',
    sortCardsMethod: undefined,
    currentGrade: [0, 0],
    countPerPage: [10, 25, 50]
};

export const CardsReducers = (state = initialCardsState, action: ActionsCardsType): initialCardsStateType => {
    switch (action.type) {
        case "cards/SET-CARDS":
            return {...state, ...action.cards}
        case "cards/SET-CARDS-TOTAL-COUNT":
            return {...state, totalCount: action.totalCount}
        case "cards/SET-CARDS-PAGE":
            return {...state, page: action.page}
        case "cards/UPDATE-GRADE":
            return {
                ...state,
                cards: state.cards.map(card => card.cardsPack_id === action.id ? {...card, grade: action.grade} : card)
            }
        case "cards/CURRENT-PACK-ID":
            return {...state, currentCardsPackID: action.id}
        case "cards/COUNT-ON-PAGE":
            return {...state, page: action.count}
        case "cards/MIN-MAX-GRADE":
            return {...state, minGrade: action.values[0], maxGrade: action.values[1]}
        case "cards/SORT-CARDS":
            return {...state, sortCardsMethod: action.sortCards}
        case "cards/GRADE": 
            return {...state, currentGrade: [...action.values]}
        default:
            return state
    }
}

// action
export const setCards = (cards: CardsResp) => ({type: 'cards/SET-CARDS', cards} as const);
export const setCardsTotalCount = (totalCount: number) => ({type: 'cards/SET-CARDS-TOTAL-COUNT', totalCount} as const);
export const setCardsPage = (page: number) => ({type: 'cards/SET-CARDS-PAGE', page} as const);
export const gradeCard = (id: string, grade: number) => ({type: "cards/UPDATE-GRADE", id, grade} as const);
export const setCurrentCardsPackID = (id: string ) => ({type: 'cards/CURRENT-PACK-ID',id} as const);
export const setCardsCountOnPage = (count: number) => ({type: 'cards/COUNT-ON-PAGE', count} as const);
export const setMinMaxGrade = (values: number[]) => ({type: 'cards/MIN-MAX-GRADE', values} as const);
export const setSortCards = (sortCards: string) => ({type: 'cards/SORT-CARDS', sortCards} as const);
export const setGrade = (values: number[]) => ({type: 'cards/GRADE', values} as const);

//thunk
export const getCards = (data?: GetDataType,) => async (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    const cards = getState().cards;
    try {
        const response = await cardsAPI.getCards({
            cardsPack_id: cards.currentCardsPackID || data?.cardsPack_id,
            page: cards.page,
            pageCount: data?.pageCount || cards.pageCount,
            min: cards.currentGrade[0],
            max: cards.currentGrade[1],
            cardQuestion: data?.cardQuestion || undefined,
            cardAnswer: data?.cardAnswer || undefined,
            sortCards: cards.sortCardsMethod
        });
        dispatch(setCards(response.data));
        dispatch(setAppErrorAC(''));
    } catch (e) {
        dispatch(setStatusAppAC('failed'))
    }
}
export const postCard = (data?: PostCardData, pack_ID?: string): ThunkActionType => async dispatch => {
    try{
        await cardsAPI.postCard(data)
        await dispatch(getCards({
            cardsPack_id: pack_ID
        }))
        dispatch(setAppErrorAC(''))
    }catch (e){
        dispatch(setStatusAppAC('failed'));
    }
}
export const deleteCard = (id: string, pack_ID: string): ThunkActionType => async dispatch => {
   try {
       await cardsAPI.deleteCard(id)
       await dispatch(getCards({
           cardsPack_id: pack_ID
       }))
       dispatch(setAppErrorAC(''))
   }catch (e) {
       dispatch(setStatusAppAC('failed'));
   }
}
export const putCard = (data: PutDataType, pack_ID: string): ThunkActionType => async dispatch => {
    try {
        await cardsAPI.putCard(data)
        await dispatch(getCards({
            cardsPack_id: pack_ID
        }))
        dispatch(setAppErrorAC(''))
    }catch (e) {
        dispatch(setStatusAppAC('failed'));
    }
}
export const gradeCards = (data: GradeData): ThunkActionType => async dispatch => {
    try {
        await cardsAPI.grade(data)
        await dispatch(getCards())
        dispatch(setAppErrorAC(''))
    }catch (e) {
        dispatch(setStatusAppAC('failed'));
    }
};

//type
export type ActionsCardsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof gradeCard>
    | ReturnType<typeof setCurrentCardsPackID>
    | ReturnType<typeof setCardsCountOnPage>
    | ReturnType<typeof setMinMaxGrade>
    | ReturnType<typeof setSortCards>
    | ReturnType<typeof setGrade>

export type initialCardsStateType = CardsResp & {
    totalCount: number,
    currentCardsPackID: string,
    sortCardsMethod: string | undefined,
    currentGrade: number[],
    countPerPage: number[],
};