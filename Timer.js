import { TIME_PER_QUESTION } from '../data';

const Timer = ({ timeLeft }) => (
  <div className="timebox">
    <p className={timeLeft <= 5 ? 'timer danger' : 'timer'}>{`Còn ${timeLeft} giây`}</p>
    <div className="bar">
      <i style={{ transform: `translateX(${Math.min(100, (timeLeft / TIME_PER_QUESTION) * 100)}%)` }} />
    </div>
  </div>
);

export default Timer;
