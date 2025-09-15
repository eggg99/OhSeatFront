import { useState } from "react";
import '@/styles/custom.scss'

interface ScreenSelectorProps {
    screenList: any[];
    selectedScreen: any | null;
    onScreenChange: (screen: any) => void
}

export default function ScreenSelector({ screenList, selectedScreen, onScreenChange }:ScreenSelectorProps){
    if(screenList.length === 0) return <p>상영관이 없습니다.</p>
    return(
        <div className="content-wrapper py-4">
            <div className="flex justify-center gap-4 flex-wrap">
                {screenList.map((screen) => {
                    const isChecked = selectedScreen?.screenId === screen.screenId;
                    return(
                        <div className="checkbox-item" key={screen.screenId}>
                            <input
                                type="radio"
                                id={screen.screenId}
                                name="screen"
                                className="checkbox"
                                checked={isChecked}
                                onChange={() => onScreenChange(screen)} // ✅ 객체 전체 전달
                            />
                            <label
                                htmlFor={screen.screenId}
                                className={`terms-label ${isChecked ? "checked" : ""}`}
                            >{ screen.screenName }</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}