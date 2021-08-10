import { useRef, useState } from 'react'

const ValidatedTextInput = ({uniqueId, invalidWarningText, labelText, placeholderText, validStateSetter, outValueSetter}) => {

    let htmlName = uniqueId + "_TextName";
    const inputRef = useRef(null);
    const [validInput, setValidInput] = useState(false);
    const [justLoaded, setJustLoaded] = useState(true);

    const validateEmptyOrNull = () => {
        if(justLoaded){
            setJustLoaded(false); 
        }

        let inputValue = inputRef.current.value;
        if(!inputValue || inputValue.length === 0){
            console.log("invalid!");
            setValidInput(false);
            validStateSetter(false);
            outValueSetter(inputValue);
            return;
        }
        setValidInput(true);
        validStateSetter(true);
        outValueSetter(inputValue);
        console.log("valid!");
    };

    return (
        <div className="form-group">
            <label htmlFor={htmlName}>{labelText}</label>
            <input type="text" name={htmlName} className="form-control" placeholder={placeholderText} ref={inputRef} onChange={validateEmptyOrNull}/>
            {!(validInput||justLoaded) && <p>{invalidWarningText}</p>}
        </div>
    )
}

export default ValidatedTextInput
