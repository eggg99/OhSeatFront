import { useNavigate } from "react-router-dom";
import type  {EventDataPage, EventData} from "@/types/Event";
import {CATEGORY_LABEL} from "../../../types/EventAnn";
import { formatDateDot } from "@/utils/format";

interface Props {
  eventList : EventData[];
  isEdit : boolean;
  selectedIds?: number[];
  onSelectEvent?: (eventId: number) => void;
}

export const EventItem:React.FC<Props> = ({
  eventList,
  isEdit=false,
  selectedIds = [],
  onSelectEvent = () => {},
}) => {
  const navigate = useNavigate();

  if (eventList.length === 0) {
    return (
      <li><a href="#" className="event_post_wrap">이벤트가 없습니다 🥲</a></li>
    )
  }
  return (
    <>
      {eventList.map((item: EventData) => {
        const isSelected = selectedIds.includes(item.eventId);
        const baseUrl = "http://localhost:8000/"
        const src = `${baseUrl.replace(/\/$/, '')}/${item.imgUrl.replace(/^\//, '')}`;
        return(
         <li
          key={`event-${item?.eventId}`}
          onClick={() => {
            if (isEdit) {
              onSelectEvent?.(item.eventId)
            } else {
              navigate(`/event/${item?.eventId}`)
            }
          }}
         >
           <a
             href="#"
             className={`
              event_post_wrap
              ${isEdit ? 'edit_mode' : ''}
              ${isSelected ? 'checked' : ''}
            `}
           >
            <div className="event_category">
              <i>{CATEGORY_LABEL[item.categoryId] ?? ''}</i>
              {item.end && <i className="end">종료</i>}
            </div>
            <img src={src} alt={item.title} />
            <p>{item.title}</p>
            <span>{formatDateDot(item.startDt)} ~ {formatDateDot(item.endDt)}</span>
           </a>
         </li>
        );
      })}
    </>
  );
}
