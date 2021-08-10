import { useRef, useState } from 'react'

const ValidatedNumberInput = ({uniqueId, invalidWarningText, labelText, placeholderText, inclusiveMin, validStateSetter, outValueSetter}) => {
    let htmlName = uniqueId + "_NumberName";
    const inputRef = useRef(null);
    const [validInput, setValidInput] = useState(false);
    const [justLoaded, setJustLoaded] = useState(true);

    const validateNumberWithinRange = () => {
        if(justLoaded){
            setJustLoaded(false); 
        }

        let inputValue = inputRef.current.value;
        if(isNaN(inputValue) || inputValue < inclusiveMin ){    // TODO actual range validation instead of just lower limit
            setValidInput(false);
            validStateSetter(false);
            outValueSetter(inputValue);
            return;
        }

        setValidInput(true);
        validStateSetter(true);
        outValueSetter(parseInt(inputValue));
    };

    return (
        <div className="form-group">
            <label htmlFor={htmlName}>{labelText}</label>
            <input type="text" name={htmlName} className="form-control" placeholder={placeholderText} ref={inputRef} onChange={validateNumberWithinRange}/>
            {!(validInput||justLoaded) && <p>{invalidWarningText}</p>}
        </div>
    )
}

export default ValidatedNumberInput
