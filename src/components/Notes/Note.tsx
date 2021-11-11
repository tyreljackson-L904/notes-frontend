import { FC, FocusEvent } from "react";
import INote from "../../interfaces/note.interface";
import "./Note.css";

type Props = {
  note: INote;
  onNoteUpdate: Function;
};

const Note: FC<Props> = ({ note, onNoteUpdate }) => {
  const onTextInputBlur = (event: FocusEvent<HTMLDivElement>) => {
    const newTextValue = event.currentTarget.textContent;
    if (newTextValue === note.text) {
      return;
    }
    console.log("note text changed");
    const updatedNoteObject: INote = {
      ...note,
      text: newTextValue || "",
    };
    onNoteUpdate(updatedNoteObject);
  };

  return (
    <div className="note">
      <div
        onBlur={onTextInputBlur}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="note__text"
      >
        {note.text}
      </div>
      <div className="note__link">
        <a href={note.link}>{note.link}</a>
      </div>
    </div>
  );
};

export default Note;
