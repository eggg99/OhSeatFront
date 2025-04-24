import { useState } from "react"
import '../../styles/custom.scss'

const screen = [
    { id: "all-screen", label: "전체" },
    { id: "screen1", label: "1관" },
    { id: "screen2", label: "2관" },
    { id: "screen3", label: "3관" },
    { id: "screen4", label: "4관" },
]

export default function ScreenList() {
    const [checked, setChecked] = useState<string[]>([])

    const isAllChecked = screen.every((t) => checked.includes(t.id))

    const toggleAll = () => {
    setChecked(isAllChecked ? [] : screen.map((t) => t.id))
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
        {screen.map(({ id, label }) => {
          const isChecked =
            id === "all-screen" ? isAllChecked : checked.includes(id)
          const handleChange =
            id === "all-screen" ? toggleAll : () => toggleItem(id)

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