import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, TOPICS } from '../data';

const QuestionBank = ({ questions }) => {
  const [topic, setTopic] = useState('');
  const [term, setTerm] = useState('');

  const handleTermShift = (e) => setTerm(e.target.value);

  const keyword = term.trim().toLowerCase();
  const filtered = questions.filter(
    (q) => (topic === '' || q.topic === topic) && q.question.toLowerCase().includes(keyword)
  );

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div className="filters">
        <label>
          Chủ đề:{' '}
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">Tất cả</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>{' '}
        <label>
          Tìm kiếm:{' '}
          <input value={term} onChange={handleTermShift} placeholder="Nội dung câu hỏi" />
        </label>
      </div>
      <p>{`Có ${filtered.length} câu hỏi`}</p>
      <table>
        <thead>
          <tr><th>STT</th><th>Chủ đề</th><th>Mức độ</th><th>Câu hỏi</th></tr>
        </thead>
        <tbody>
          {filtered.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td><span className={`badge t-${q.topic}`}>{q.topic}</span></td>
              <td><span className={`badge lv-${q.level}`}>{LEVELS[q.level]}</span></td>
              <td><Link to={`/questions/${q.id}`}>{q.question}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;
