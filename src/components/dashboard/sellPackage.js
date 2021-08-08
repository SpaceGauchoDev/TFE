import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import PackageOption from './packageOption';


const SellPackage = ({logged, apiKey, userId}) => {
    const saleClientNameInput = useRef(null);
    const saleAdultsNumberInput = useRef(null);
    const saleMinorsNumberInput = useRef(null);

    const [selectorItems, setSelectorItems] = useState([{id: 0, nombre: "placeholderName", foto:"placeholderPicture.jpg"}, {id: 1, nombre: "placeholderToo", foto:"placeholderPictureToo.jpg"}]);
    const [currentSelectorValue, setCurrentSelectorValue] = useState(selectorItems[0].id);
  
    const [selectorItemsRecieved, setSelectorItemsRecieved] = useState(false);
    const [validClientName, setValidClientName] = useState(false);
    const [validAdultsNumber, setValidAdultsNumber] = useState(false);
    const [validMinorsNumber, setValidMinorsNumber] = useState(false);

    const validateAdults = () => {
        let adultsNumber = saleAdultsNumberInput.current.value;
        if (isNaN(adultsNumber) ||  adultsNumber <= 0){
            setValidAdultsNumber(false);
            return;
        }
        setValidAdultsNumber(true);
    }

    const validateMinors = () => {
        let minorsNumber = saleMinorsNumberInput.current.value;
        if (isNaN(minorsNumber) ||  minorsNumber < 0){
            setValidMinorsNumber(false);
            return;
        }
        setValidMinorsNumber(true);
    }
    
    const validateClientName = () => {
        let clientName = saleClientNameInput.current.value;
        if(!clientName || clientName.length === 0){
            setValidClientName(false);
            return;
        }
        console.log("valid client name");
        setValidClientName(true);
    }

    const saleAttempt = e => {
        fetch("https://destinos.develotion.com/ventas.php", {
            "method": "POST",
            "headers": {
                "apikey": apiKey,
                "content-type": "application/json"
            },
            "body": JSON.stringify({
                "idVendedor": userId,
                "nombreCliente": saleClientNameInput.current.value,
                "idPaquete": currentSelectorValue,
                "cantidadMayores": saleAdultsNumberInput.current.value,
                "cantidadMenores": saleMinorsNumberInput.current.value
            })
        })
            .then(responseOne => responseOne.json())
            .then(responseTwo => {
                console.log(responseTwo);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const selectionChanged = e => {
        setCurrentSelectorValue(e.target.value);
        console.log("selection changed");
    };

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
                    console.log(responseTwo);
                    setSelectorItems (responseTwo.destinos);
                    setSelectorItemsRecieved(true);
                })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getSelectorItems();
    }, []);

    return (
        <div>
            <div className="form-group">
                <label htmlFor="saleClientName">Name: </label>
                <input type="text" name="saleClientName" className="form-control" placeholder="Messi" ref={saleClientNameInput} onChange={validateClientName}/>
                {!validClientName && <p>Name can't be empty.</p>}
            </div>
            <div className="form-group">
                <label htmlFor="saleAdultsNumber">Adults: </label>
                <input type="text" name="saleAdultsNumber" className="form-control" placeholder="1" ref={saleAdultsNumberInput} onChange={validateAdults}/>
                {!validAdultsNumber && <p>Adults must be a number equal or higher than 1.</p>}
            </div>
            <div className="form-group">
                <label htmlFor="saleMinorsNumber">Children: </label>
                <input type="text" name="saleMinorsNumber" className="form-control" placeholder="0" ref={saleMinorsNumberInput} onChange={validateMinors}/>
                {!validMinorsNumber && <p>Children must be a number equal or higher than 0.</p>}
            </div>            
            <div className="form-group">
                <label htmlFor="salePackageTypeInput">Package: </label>
                <br/>
                <select name="salePackageTypeInput" value={currentSelectorValue} onChange={selectionChanged}>
                    {selectorItems.map(packageOption => <PackageOption key={packageOption.id} {...packageOption}/>)}
                </select>
            </div>
            <input name="sale" className="btn btn-block login-btn" type="button" value="Sell Package" onClick={saleAttempt} disabled={ !(validClientName && validAdultsNumber && validMinorsNumber && selectorItemsRecieved)}/>
        </div>
    );
};

export default SellPackage