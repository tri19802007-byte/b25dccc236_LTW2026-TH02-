import AnswerButton from './AnswerButton';
import { LEVELS, LETTERS } from '../data';

const QuestionCard = ({ k, total, question, hidden, status, selected, onChoose }) => {
  const getState = (i) => {
    if (status === 'locked') return i === selected ? 'locked' : 'normal';
    if (status === 'revealed') {
      if (i === question.answer) return 'correct';
      if (i === selected) return 'wrong';
    }
    return 'normal';
  };
  return (
    <div className="question-card">
      <p className="meta">{`Câu ${k}/${total} · ${question.topic} · ${LEVELS[question.level]}`}</p>
      <h2>{question.question}</h2>
      <div className="answers in" key={question.id}>
        {question.options.map((opt, i) => (
          <AnswerButton
            key={i}
            letter={LETTERS[i]}
            text={opt}
            state={getState(i)}
            hidden={hidden.includes(i)}
            disabled={status !== 'answering'}
            onClick={() => onChoose(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
