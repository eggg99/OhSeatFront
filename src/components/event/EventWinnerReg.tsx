import { useState } from "react";
import { FileUpload } from "../common/file/FileUpload";

export default function EventWinnerReg () {


    return (
        <div className="os_sub_contents">
            <div className="flex gap-3">
                <div>
                    <select>
                        <option value="">선택</option>
                        <option value="1">시사회</option>
                        <option value="2">예매권</option>
                    </select>
                </div>
                <div>
                    <input type="text" placeholder="게시글 제목"/>
                </div>
            </div>

            <div>
                <textarea></textarea>
            </div>

            <div>
                <button>등록</button>
            </div>
        </div>
    )
}