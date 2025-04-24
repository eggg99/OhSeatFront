import { useState } from "react"
import '../../styles/custom.scss'

const regions = [
    { id: "all-regions", label: "전체" },
    { id: "seoul", label: "서울" },
    { id: "incheon", label: "인천" },
    { id: "gyeonggi", label: "경기" },
    { id: "chungcheong", label: "충청" },
    { id: "gangwon", label: "강원" },
    { id: "jeolla", label: "전라" },
    { id: "gyeongsang", label: "경상" },
    { id: "daegu", label: "대구" },
    { id: "busan", label: "부산" },
    { id: "ulsan", label: "울산" },
    { id: "jeju", label: "제주" },
]

export default function RegionSelector() {
 const [checked, setChecked] = useState<string[]>([])

  const isAllChecked = regions.every((t) => checked.includes(t.id))

  const toggleAll = () => {
    setChecked(isAllChecked ? [] : regions.map((t) => t.id))
  }

  const toggleItem = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  return (
    <div className="content-wrapper py-4">
      <div className="flex justify-center gap-4 flex-wrap">
        {/* 반복 렌더링 */}
        {regions.map(({ id, label }) => {
          const isChecked =
            id === "all-regions" ? isAllChecked : checked.includes(id)
          const handleChange =
            id === "all-regions" ? toggleAll : () => toggleItem(id)

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
