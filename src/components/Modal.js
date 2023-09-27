export default function Modal({ modal, onClearList, onToggleModal }) {
  return (
    <>
      {modal ? (
        <div className='modal'>
          <p>‼️ Are you sure you want to delete all of your items?</p>
          <div>
            <button className='btn' onClick={onClearList}>
              Yes
            </button>
            <button className='btn' onClick={onToggleModal}>
              No
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
