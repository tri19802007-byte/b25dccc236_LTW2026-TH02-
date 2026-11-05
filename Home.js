import { useNavigate } from 'react-router-dom';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();
  const best = history.reduce((b, h) => (!b || h.score > b.score ? h : b), null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) navigate('/play');
  };

  return (
    <div>
      <div className="hero">
        <h1>Rung chuông vàng</h1>
        <p>Thử thách kiến thức Lập trình Web · 15 câu · 20 giây mỗi câu</p>
      </div>
      <ul className="rules">
        <li>📚 15 câu hỏi về HTML, CSS, JavaScript và React, mỗi câu 20 giây.</li>
        <li>⭐ Câu dễ 10 điểm, trung bình 20 điểm, khó 30 điểm.</li>
        <li>⚠️ Trả lời sai hoặc hết giờ là bị loại. Đúng cả 15 câu: rung chuông vàng (300 điểm).</li>
        <li>🛟 Có 3 quyền trợ giúp: Loại 1 đáp án, Thêm 15 giây, Phao cứu sinh.</li>
      </ul>
      {best && <p className="record">{`Kỷ lục: ${best.score} điểm – ${best.name}`}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Tên người chơi:{' '}
          <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
        </label>{' '}
        <button type="submit" disabled={!playerName.trim()}>Vào thi</button>
      </form>
    </div>
  );
};

export default Home;
