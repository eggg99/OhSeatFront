import { useState } from "react"
import '../../styles/custom.scss'

const theater = [
    { id: "all-theater", label: "전체" },
    { id: "1", label: "CGV 구로" },
    { id: "2", label: "CGV 구로" },
    { id: "3", label: "CGV 구로" },
    { id: "4", label: "CGV 구로" },
    { id: "5", label: "CGV 구로" },
    { id: "6", label: "CGV 구로" },
    { id: "7", label: "CGV 구로" },
    { id: "8", label: "CGV 구로" },
    { id: "9", label: "CGV 구로" },
    { id: "10", label: "CGV 구로" },
    { id: "11", label: "CGV 구로" },
    { id: "12", label: "CGV 구로" },
    { id: "13", label: "CGV 구로" },
    { id: "14", label: "CGV 구로" },
    { id: "15", label: "CGV 구로" },
    { id: "16", label: "CGV 구로" },
    { id: "17", label: "CGV 구로" },
    { id: "18", label: "CGV 구로" },
    { id: "19", label: "CGV 구로" },
    { id: "20", label: "CGV 구로" },
    { id: "21", label: "CGV 구로" },
    { id: "22", label: "CGV 구로" },
    { id: "23", label: "CGV 구로" },
    { id: "24", label: "CGV 구로" },
    { id: "25", label: "CGV 구로" },
]

export default function NavRecommend() {
    const [checked, setChecked] = useState<string[]>([])

    const isAllChecked = theater.every((t) => checked.includes(t.id))

    const toggleAll = () => {
    setChecked(isAllChecked ? [] : theater.map((t) => t.id))
    }

    const toggleItem = (id: string) => {
    setChecked((prev) =>
        prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
    }

  return (
        <div className="flex-[1] content-wrapper p-4 vtcal">
        <div className="flex flex-col justify-center gap-4 flex-wrap items-center">
            {/* 반복 렌더링 */}
        {theater.map(({ id, label }) => {
          const isChecked =
            id === "all-theater" ? isAllChecked : checked.includes(id)
          const handleChange =
            id === "all-theater" ? toggleAll : () => toggleItem(id)

          return (
            <div className="checkbox-item w-full" key={id}>
              <input
                type="checkbox"
                id={id}
                className="checkbox"
                checked={isChecked}
                onChange={handleChange}
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