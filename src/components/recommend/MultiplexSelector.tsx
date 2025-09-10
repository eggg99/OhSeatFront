import React, { useState } from "react"
import '../../styles/custom.scss';

interface MultiplexSelectorProps {
  selectedMultiplex: string[];
  onChange: (value: string[]) => void;
}

const multiplexList = [
    { id: "all", label: "전체" },
    { id: "1", label: "CGV" },
    { id: "2", label: "메가박스" },
    { id: "3", label: "롯데시네마" },
  ]

export default function MultiplexSelector({selectedMultiplex, onChange}: MultiplexSelectorProps) {
  // 전체 선택 여부
  const isAllChecked = multiplexList
                        .filter((t) => t.id !== "all")
                        .every((t) => selectedMultiplex.includes(t.id));

  // 전체 토글
  const toggleAll = () => {
    if(isAllChecked){
      onChange([]); // 전체 해제
    } else {
      onChange(multiplexList.filter((t) => t.id !== "all").map((t) => t.id)); // 전체 선택
    }
  }

  // 개별 토글
  const toggleItem = (id : string) => {
    if(selectedMultiplex.includes(id)){
      onChange(selectedMultiplex.filter((v) => v !== id));
    } else {
      onChange([...selectedMultiplex, id]);
    }
  }

  return (
    <div className="content-wrapper py-2">
        <div className="flex justify-center gap-20">
          {/* 반복 렌더링 */}
        {multiplexList.map(({ id, label }) => {
          const isChecked =
            id === "all" ? isAllChecked : selectedMultiplex.includes(id);

          const onCheckboxChange =
            id === "all" ? toggleAll : () => toggleItem(id); 

          return (
            <div className="checkbox-item" key={id}>
              <input
                type="checkbox"
                id={id}
                className="checkbox"
                checked={isChecked}
                onChange={onCheckboxChange}
              />
              <label
                htmlFor={id}
                className={`terms-label ${isChecked ? "checked" : ""}`}
              >
                {label}
              </label>
            </div>
          )
        })}
        </div>
    </div>
  )
}
