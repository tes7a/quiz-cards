import React, {ChangeEvent, useState} from "react";
import SuperInputText from "../components/SuperInputText/SuperInputText";
import SuperCheckbox from "../components/SuperCheckbox/SuperCheckbox";
import SuperButton from "../components/SuperButton/SuperButton";
import s from './TestComponent.module.css'
import {Link} from "react-router-dom";
import { Loading } from "../utils/Loading";
import { Sorting } from "../faetures/sorting/Sorting";

export const TestComponent = () => {
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'

    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text)
        }
    }

    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div>
            <h1>TEST</h1>
            <div className={s.column}>
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    //spanClassName={s.testSpanError}
                />

                <SuperInputText
                    className={s.blue}
                />



                <SuperButton>
                    default
                </SuperButton>

                <SuperButton
                    red
                    onClick={showAlert}
                >
                    delete
                </SuperButton>

                <SuperButton disabled>
                    disabled
                </SuperButton>

                {/*----------------------------------------------------*/}

                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}
                >
                    some text
                </SuperCheckbox>

                <SuperCheckbox checked={checked} onChange={testOnChange}/>
                
               {/*<Loading/>*/}
                <Sorting/>
            </div>
        </div>
    )

}