import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';

import PackageOption from './packageOption';
import ValidatedTextInput from './validatedTextInput';
import ValidatedNumberInput from './validatedNumberInput';

const SellPackage = ({apiKey, userId}) => {
    // inicial setup
    // these "selector" vars have nothing to do with useSepector hook and everything to do with poor naming
    const [selectorItems, setSelectorItems] = useState([{id: 1, nombre: "placeholderName", foto:"placeholderPicture.jpg"}]);
    const [selectorItemsRecieved, setSelectorItemsRecieved] = useState(false);

    // User input data
    const [currentSelectorValue, setCurrentSelectorValue] = useState(selectorItems[0].id);
    const [clientNameValue, setClientNameValue] = useState(null);
    const [adultsNumberValue, setAdultsNumberValue] = useState(null);
    const [minorsNumberValue, setMinorsNumberValue] = useState(null);
    
    // Used for validation
    const [validClientName, setValidClientName] = useState(false);
    const [validAdultsNumber, setValidAdultsNumber] = useState(false);
    const [validMinorsNumber, setValidMinorsNumber] = useState(false);
    const [validTotalPeopleNumber, setValidTotalPeopleNumber] = useState(true);

    // Misc
    const dispatch = useDispatch();

    // Input fields prop objects
    const nameField = { uniqueId: 1, 
        invalidWarningText: "Required field", 
        labelText: "Name: ", 
        placeholderText: "John Smith", 
        validStateSetter: setValidClientName,
        outValueSetter: setClientNameValue}

    const adultsField = {   uniqueId: 1, 
        invalidWarningText: "Required field, must be a number equal or higher than 1", 
        labelText: "Adults: ", 
        placeholderText: "1", 
        inclusiveMin: 1, 
        validStateSetter: setValidAdultsNumber, 
        outValueSetter: setAdultsNumberValue}

    const minorsField = {   uniqueId: 2, 
        invalidWarningText: "Required field, must be a number equal or higher than 0", 
        labelText: "Minors: ", 
        placeholderText: "0", 
        inclusiveMin: 0, 
        validStateSetter: setValidMinorsNumber, 
        outValueSetter: setMinorsNumberValue} 


    const saleAttempt = () => {
        // TODO: validate total people number before a sale is attempted
        if(adultsNumberValue + minorsNumberValue > 10){
            setValidTotalPeopleNumber(false);
            return;
        }            

        fetch("https://destinos.develotion.com/ventas.php", {
            "method": "POST",
            "headers": {
                "apikey": apiKey,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                "idVendedor": userId,
                "nombreCliente": clientNameValue,
                "idPaquete": currentSelectorValue,
                "cantidadMayores": adultsNumberValue,
                "cantidadMenores": minorsNumberValue
            })
        })
            .then(responseOne => responseOne.json())
            .then(responseTwo => {
                updatePagackesSold();
                resetForm();
            })
            .catch(err => {
                console.log("FETCH ERROR @ saleAttempt");
                console.log(err);
            });
    };

    const resetForm = () => {
        // TODO: reset clientNameValue, currentSelectorValue, adultsNumberValue, minorsNumberValue input fields
        setValidTotalPeopleNumber(true);
    }
    
    // After sale we should update the locally stored data
    const updatePagackesSold = () => {
        let ventasUrl = "https://destinos.develotion.com/ventas.php?";
        ventasUrl += "idVendedor=" + userId;

        fetch(ventasUrl, {
            "method": "GET",
            "headers": {
                "apikey": apiKey,
                "content-type": "application/json"
                }
        })
            .then(responseOne => responseOne.json())
                .then(responseTwo => {
                    dispatch({ type: "NUMBER_OF_SALES_UPDATE", payload: {sales:  responseTwo.ventas.length} });
                    dispatch({ type: "SALES_UPDATE", payload: responseTwo.ventas });
                })
            .catch(err => {
                console.log("FETCH ERROR @ updatePagackesSold");
                console.log(err);
            });
    }    

    // Selector managment
    const selectionChanged = e => {
        setCurrentSelectorValue(e.target.value);
        console.log("selection changed");
    };

    //  TODO: we already have this info by this point, consider removing this redundant 
    //  fetch and use packagesInfo saved at the store
    const getSelectorItems = () => {
        fetch("https://destinos.develotion.com/paquetes.php", {
            "method": "GET",
            "headers": {
                "apikey": apiKey,
                "content-type": "application/json"
                }
            })
            .then(responseOne => responseOne.json())
                .then(responseTwo => {
                    setSelectorItems (responseTwo.destinos);
                    setCurrentSelectorValue(selectorItems[0].id);
                    setSelectorItemsRecieved(true);
                })
            .catch(err => {
                console.log("FETCH ERROR @ getSelectorItems");
                console.log(err);
            });
    };

    useEffect(() => {
        getSelectorItems();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            if(validClientName &&
                validAdultsNumber &&
                validMinorsNumber &&
                selectorItemsRecieved){
                    saleAttempt();
                }
        }
    }

    // TODO: Make package select into a component
    // TODO: Make better validTotalPeopleNumber warning
    return (
        <div>
            <ValidatedTextInput {...nameField}/>
            <ValidatedNumberInput {...adultsField}/>
            <ValidatedNumberInput {...minorsField}/>
            <div className="form-group">
                <label htmlFor="salePackageTypeInput">Package: </label>
                <br/>
                <select name="salePackageTypeInput" value={currentSelectorValue} onChange={selectionChanged} onKeyDown={handleKeyDown}>
                    {selectorItems.map(packageOption => <PackageOption key={packageOption.id} {...packageOption}/>)}
                </select>
            </div>
            <input  name="sale" 
                    className="btn btn-block login-btn" 
                    type="button" 
                    value="Sell Package" 
                    onKeyDown={handleKeyDown} 
                    onClick={saleAttempt} 
                    disabled={ !(   validClientName && 
                                    validAdultsNumber && 
                                    validMinorsNumber &&
                                    selectorItemsRecieved)}/>
            {!validTotalPeopleNumber && <p>Total number of passengers can't be higher than 10</p>}
        </div>
    );
};

export default SellPackage