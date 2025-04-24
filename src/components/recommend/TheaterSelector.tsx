import { useState } from "react"
import '../../styles/custom.scss';

const theatersBrand = [
    { id: "all-theatersBrand", label: "전체" },
    { id: "cgv", label: "CGV" },
    { id: "megabox", label: "메가박스" },
    { id: "lottecinema", label: "롯데시네마" },
]

export default function TheaterSelector() {
  const [checked, setChecked] = useState<string[]>([])

  const isAllChecked = theatersBrand.every((t) => checked.includes(t.id))

  const toggleAll = () => {
    setChecked(isAllChecked ? [] : theatersBrand.map((t) => t.id))
  }

  const toggleItem = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  return (
    <div className="content-wrapper py-2">
        <div className="flex justify-center gap-20">
          {/* 반복 렌더링 */}
        {theatersBrand.map(({ id, label }) => {
          const isChecked =
            id === "all-theatersBrand" ? isAllChecked : checked.includes(id)
          const handleChange =
            id === "all-theatersBrand" ? toggleAll : () => toggleItem(id)

          return (
            <div className="checkbox-item" key={id}>
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
