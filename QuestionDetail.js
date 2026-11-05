import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS, POINTS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const q = questions.find((item) => item.id === Number(id));

  return (
    <div>
      {q ? (
        <>
          <h2>{`Câu hỏi số ${q.id} – ${q.topic} (${LEVELS[q.level]}, ${POINTS[q.level]} điểm)`}</h2>
          <p>{q.question}</p>
          <ul className="options">
            {q.options.map((opt, i) => (
              <li key={i} className={i === q.answer ? 'correct-opt' : ''}>
                {`${LETTERS[i]}. ${opt}`}
                {i === q.answer && ' (Đáp án đúng)'}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Không tìm thấy câu hỏi</p>
      )}
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default QuestionDetail;
