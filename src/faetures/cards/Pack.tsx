import React from "react";
import {PackDataType} from "../../api/packsAPI";
import SuperButton from "../../components/SuperButton/SuperButton";

export const Pack: React.FC<PackPropsType> = ({pack, authID, editHandler, ...props}: PackPropsType) => {
    return (
        <tr>
            <td>{pack.name}</td>
            <td>{pack.cardsCount}</td>
            <td>{pack.updated}</td>
            <td>{pack.user_name}</td>
            <td>
                {authID === pack.user_id && <SuperButton red>Delete</SuperButton>}
                {authID === pack.user_id && <SuperButton onClick={() => editHandler(pack._id, pack.name)}>Edit</SuperButton>}
                <SuperButton>Learn</SuperButton>
            </td>
        </tr>
    )
}

type PackPropsType = {
    pack: PackDataType
    authID: string
    editHandler: (id: string, name: string) => void
}