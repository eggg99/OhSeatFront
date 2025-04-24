import TheaterList from './TheaterList'
import '../../styles/custom.scss'
import ScreenList from './ScreenList'
import SeatReviewList from './SeatReviewList'

export default function NavRecommend() {
  return (
    <div className="flex">
        <TheaterList/>
        <ScreenList/>
        <SeatReviewList/>
    </div>
  )
}