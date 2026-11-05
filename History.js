import { RANKS } from '../data';

const History = ({ history, onClear, onRemove }) => {
  const handleRemove = (h) => {
    if (window.confirm(`Xóa lượt chơi của ${h.name} (${h.score} điểm)?`)) onRemove(h.id);
  };
  const sorted = [...history].sort((a, b) => b.score - a.score);
  const total = history.reduce((sum, h) => sum + h.score, 0);
  const max = history.reduce((m, h) => Math.max(m, h.score), 0);
  const avg = history.length ? Math.round(total / history.length) : 0;

  return (
    <div>
      <h2>Lịch sử các lượt chơi</h2>
      {history.length === 0 ? (
        <p>Chưa có lượt chơi nào.</p>
      ) : (
        <>
          <p>{`Số lượt chơi: ${history.length}`}</p>
          <p>{`Điểm cao nhất: ${max}`}</p>
          <p>{`Điểm trung bình: ${avg}`}</p>
          <table>
            <thead>
              <tr>
                <th>Người chơi</th><th>Số câu đúng</th><th>Điểm</th><th>Danh hiệu</th><th>Thời gian</th><th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((h) => (
                <tr key={h.id}>
                  <td>{h.name}</td><td>{h.correctCount}</td><td>{h.score}</td>
                  <td><span className={`badge rk${RANKS.findIndex((r) => r.title === h.rank)}`}>{h.rank}</span></td><td>{h.playedAt}</td>
                  <td><button className="danger-btn" onClick={() => handleRemove(h)}>Xóa</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p><button className="danger-btn" onClick={onClear}>Xóa lịch sử</button></p>
        </>
      )}
    </div>
  );
};

export default History;
