const Helpers = ({ used, saverOn, active, onEliminate, onExtra, onSaver }) => (
  <div className="helpers">
    <button disabled={!active || used.eliminate} onClick={onEliminate}>Loại 1 đáp án</button>
    <button disabled={!active || used.extra} onClick={onExtra}>Thêm 15 giây</button>
    <button disabled={!active || used.saver} onClick={onSaver}>
      {saverOn ? 'Phao đang bật' : 'Phao cứu sinh'}
    </button>
  </div>
);

export default Helpers;
