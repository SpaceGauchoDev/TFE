// framework
import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Redirect } from 'react-router-dom';

// my stuffs
import "./dashboard.css";
import SellPackage from "./sellPackage";
import NumberOfPackagesSoldByUser from "./numberOfPackagesSoldByUser";
import PackagesSoldByUser from "./packagesSoldByUser";
import PackagesMostSoldByUser from "./packagesMostSoldByUser";
import PackagesNotYetSoldByUser from "./packagesNotYetSoldByUser";
import AveragePricePerPackage from './averagePricePerPackage';
import TravelersPerDestination from './travelersPerDestination';

const Dashboard = () => {
    const sessionData = useSelector(state => state.sessionUserData);
    const dispatch = useDispatch();

    const updatePagackesSold = () => {
        let ventasUrl = "https://destinos.develotion.com/ventas.php?";
        ventasUrl += "idVendedor=" + sessionData.userId;

        fetch(ventasUrl, {
            "method": "GET",
            "headers": {
                "apikey": sessionData.apiKey,
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

    const updatePagackesInfo = () => {
        fetch("https://destinos.develotion.com/paquetes.php", {
            "method": "GET",
            "headers": {
                "apikey": sessionData.apiKey,
                "content-type": "application/json"
                }
            })
            .then(responseOne => responseOne.json())
                .then(responseTwo => {
                    dispatch({ type: "PACKAGES_INFO_UPDATE", payload: responseTwo.destinos });
                })
            .catch(err => {
                console.log("FETCH ERROR @ updatePagackesInfo");
                console.log(err);
            });
    }

    useEffect(() => {
        if(sessionData !== null && sessionData.logged){
            updatePagackesSold();
            updatePagackesInfo();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // kick user if not logged
    if(!sessionData.logged){
        return <Redirect to="/"/>
    }
    return (
        <div>
            <hr/>
            <SellPackage {...sessionData}/>
            <hr/>
            <NumberOfPackagesSoldByUser />
            <hr/>
            <PackagesSoldByUser />
            <hr/>
            <PackagesMostSoldByUser />
            <hr/>
            <PackagesNotYetSoldByUser />
            <hr/>
            <div className="graphs-wrapper">
                <AveragePricePerPackage />
                <TravelersPerDestination />
            </div>
        </div>
    )
}


export default Dashboard