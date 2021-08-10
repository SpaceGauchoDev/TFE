import "./dashboard.css";
import SellPackage from "./sellPackage";
import NumberOfPackagesSoldByUser from "./numberOfPackagesSoldByUser";

import { useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    const sessionData = useSelector(state => state.sessionUserData);

    // kick user if not logged
    if(!sessionData.logged){
        return <Redirect to="/"/>
    }
    return (
        <div>
            <hr/>
            <SellPackage {...sessionData}/>
            <hr/>
            <NumberOfPackagesSoldByUser {...sessionData}/>
            <hr/>
        </div>
    )
}


export default Dashboard