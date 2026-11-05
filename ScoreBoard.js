const ScoreBoard = ({ score, answers, index, total }) => (
  <div className="scoreboard">
    <p>{`Điểm: ${score}`}</p>
    <div className="cells">
      {Array.from({ length: total }, (_, i) => {
        const a = answers[i];
        let cls = 'cell';
        if (a && a.correct) cls += ' ok';
        else if (a && a.saved) cls += ' saved';
        if (i === index) cls += ' current';
        return <span key={i} className={cls}>{i + 1}</span>;
      })}
    </div>
  </div>
);

export default ScoreBoard;
