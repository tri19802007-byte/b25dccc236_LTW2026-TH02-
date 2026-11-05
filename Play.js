import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import Helpers from '../components/Helpers';
import { TIME_PER_QUESTION, EXTRA_TIME } from '../data';
import { calcScore, getRank } from '../utils';

const Play = ({ questions, playerName, onFinish }) => {
  const navigate = useNavigate();
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [status, setStatus] = useState('answering');
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [hidden, setHidden] = useState([]);
  const [used, setUsed] = useState({ eliminate: false, extra: false, saver: false });
  const [saverOn, setSaverOn] = useState(false);

  const q = questions[index];
  const score = calcScore(answers);

  const finish = (finalAnswers, reason) => {
    const finalScore = calcScore(finalAnswers);
    const rank = getRank(finalScore);
    const correctCount = finalAnswers.filter((a) => a.correct).length;
    onFinish({
      id: Date.now(),
      name: playerName,
      score: finalScore,
      rank,
      correctCount,
      playedAt: new Date().toLocaleString('vi-VN'),
    });
    navigate('/result', {
      replace: true,
      state: { name: playerName, score: finalScore, rank, correctCount, reason },
    });
  };

  const goNext = () => {
    const correct = selected === q.answer;
    const saved = !correct && saverOn;
    const newAnswers = [...answers, { id: q.id, level: q.level, correct, saved }];
    setAnswers(newAnswers);
    if (!correct && !saved) {
      finish(newAnswers, selected === null ? 'timeout' : 'wrong');
      return;
    }
    if (index === total - 1) {
      finish(newAnswers, newAnswers.every((a) => a.correct) ? 'gold' : 'completed');
      return;
    }
    setIndex(index + 1);
    setSelected(null);
    setTimeLeft(TIME_PER_QUESTION);
    setHidden([]);
    setSaverOn(false);
    setStatus('answering');
  };

  const choose = (i) => {
    if (status !== 'answering' || hidden.includes(i)) return;
    setSelected(i);
    setStatus('locked');
  };

  useEffect(() => {
    if (status !== 'answering') return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [status, index]);

  useEffect(() => {
    if (status === 'answering' && timeLeft <= 0) setStatus('revealed');
  }, [timeLeft, status]);

  useEffect(() => {
    if (status === 'locked') {
      const id = setTimeout(() => setStatus('revealed'), 2000);
      return () => clearTimeout(id);
    }
    if (status === 'revealed') {
      const id = setTimeout(goNext, 1500);
      return () => clearTimeout(id);
    }
  }, [status]);

  useEffect(() => {
    const handleKey = (e) => {
      const i = ['1', '2', '3', '4'].indexOf(e.key);
      if (i === -1) return;
      choose(i);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [status, hidden, index]);

  useEffect(() => {
    document.title = `Câu ${index + 1}/${total} – ${score} điểm`;
    return () => {
      document.title = 'Rung chuông vàng';
    };
  }, [index, score, total]);

  const eliminate = () => {
    const pool = q.options
      .map((_, i) => i)
      .filter((i) => i !== q.answer && !hidden.includes(i));
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setHidden([...hidden, pick]);
    setUsed({ ...used, eliminate: true });
  };
  const addTime = () => {
    setTimeLeft((t) => t + EXTRA_TIME);
    setUsed({ ...used, extra: true });
  };
  const useSaver = () => {
    setSaverOn(true);
    setUsed({ ...used, saver: true });
  };

  return (
    <div className="play">
      <ScoreBoard score={score} answers={answers} index={index} total={total} />
      <Timer timeLeft={timeLeft} />
      <QuestionCard
        k={index + 1}
        total={total}
        question={q}
        hidden={hidden}
        status={status}
        selected={selected}
        onChoose={choose}
      />
      <Helpers
        used={used}
        saverOn={saverOn}
        active={status === 'answering'}
        onEliminate={eliminate}
        onExtra={addTime}
        onSaver={useSaver}
      />
    </div>
  );
};

export default Play;
