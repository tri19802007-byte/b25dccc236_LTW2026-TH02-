import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const MESSAGES = {
  gold: 'Chúc mừng! Bạn đã rung chuông vàng (đúng cả 15 câu)',
  wrong: 'Bạn đã bị loại (trả lời sai)',
  timeout: 'Hết giờ!',
  completed: 'Bạn đã hoàn thành 15 câu',
};

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!state) return <Navigate to="/" replace />;
  const { name, score, rank, correctCount, reason } = state;
  return (
    <div>
      {reason === 'gold' &&
        Array.from({ length: 36 }, (_, i) => (
          <i
            key={i}
            className="confetti"
            style={{
              left: `${(i * 29) % 100}%`,
              animationDelay: `${(i % 12) * 0.2}s`,
              background: ['#f59e0b', '#2563eb', '#db2777', '#22c55e', '#7c3aed'][i % 5],
            }}
          />
        ))}
      <div className={`result-card ${reason}`}>
      <h2>{MESSAGES[reason]}</h2>
      <p>{`Người chơi: ${name}`}</p>
      <p>{`Số câu trả lời đúng: ${correctCount}`}</p>
      <p>{`Điểm: ${score}`}</p>
      <p>{`Danh hiệu: ${rank}`}</p>
      </div>
      <button onClick={() => navigate('/play')}>Chơi lại</button>{' '}
      <button onClick={() => navigate('/')}>Về trang chủ</button>
    </div>
  );
};

export default Result;
