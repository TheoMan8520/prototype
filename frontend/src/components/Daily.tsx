import { useParams } from "react-router-dom";

const Daily = () => {
    const {index} = useParams();
    const {date} = useParams();
    const {month} = useParams();
    const getDayLabel = () => {
        const dayIndex = parseInt(index);
        switch (dayIndex % 7) {
            case 0:
                return 'Sunday';
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            default:
                return 'Invalid Day';
        }
    }

  return (
    <div>
      This is daily of {date} with index:{index} which is {getDayLabel()} in {month}
    </div>
  )
}

export default Daily
