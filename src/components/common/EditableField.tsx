import { useState } from 'react';

interface EditableFieldProps {
  label: string;
  value: string | number;
  fieldName: string;
  onUpdate: (field: string, value: string | number) => void;
  isMultiline?: boolean;
}

// Editable field with switch between pargraph and input/textarea field
const EditableField = ({
  label,
  value,
  fieldName,
  onUpdate,
  isMultiline = false,
}: EditableFieldProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);

  const handleConfirm = () => {
    onUpdate(fieldName, fieldValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFieldValue(value);
    setIsEditing(false);
  };

  return (
    <div>
      <label>{label}: </label>
      {isEditing ? (
        <div>
          {isMultiline ? (
            <textarea
              value={fieldValue as string}
              onChange={(e) => setFieldValue(e.target.value)}
            />
          ) : (
            <input
              type={typeof value === 'number' ? 'number' : 'text'}
              value={fieldValue}
              onChange={(e) =>
                setFieldValue(
                  typeof value === 'number'
                    ? Number(e.target.value)
                    : e.target.value
                )
              }
            />
          )}
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{value}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
