import { useState, useEffect } from 'react';

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

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const handleConfirm = () => {
    onUpdate(fieldName, fieldValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFieldValue(value);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div>
          <label htmlFor={fieldName}>{label}: </label>
          {isMultiline ? (
            <textarea
              id={fieldName}
              value={fieldValue as string}
              onChange={(e) => setFieldValue(e.target.value)}
            />
          ) : (
            <input
              id={fieldName}
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
          <button type="button" onClick={handleConfirm}>
            Confirm
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p>{label}:</p>
          <p>{value}</p>
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </>
  );
};

export default EditableField;
