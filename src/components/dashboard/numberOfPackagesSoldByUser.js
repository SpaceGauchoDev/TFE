import { useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux'

const NumberOfPackagesSoldByUser = ({apiKey, userId}) => {
    const dispatch = useDispatch();

    const getUpdatedPackagesSold = () => {
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
            })
            .catch(err => {
                console.log("FETCH ERROR @ getUpdatedPackagesSold");
                console.log(err);
            });
    }

    // TODO: this generates a warning, clean it up if possible
    // React Hook useEffect has a missing dependency: 'getUpdatedPackagesSold'. 
    // Either include it or remove the dependency array  react-hooks/exhaustive-deps
    // Research: useCallback
    useEffect(() => {
        getUpdatedPackagesSold();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let numberOfSales = useSelector(state => state.numberOfUserSales);
    return (
        <div>
            <p>Paquetes vendidos: {numberOfSales}</p>
        </div>
    )
}

export default NumberOfPackagesSoldByUser
