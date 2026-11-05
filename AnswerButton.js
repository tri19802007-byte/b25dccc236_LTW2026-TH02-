const AnswerButton = ({ letter, text, state, hidden, disabled, onClick }) => {
  if (hidden) return <button className="answer hidden-opt" disabled />;
  return (
    <button className={`answer ${state}`} disabled={disabled} onClick={onClick}>
      <b className="letter">{`${letter}.`}</b> {text}
    </button>
  );
};

export default AnswerButton;
