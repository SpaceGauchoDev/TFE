import "./dashboard.css";
import SellPackage from "./sellPackage";

import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
        </div>
    )
}


export default Dashboard

//<input type="select" name="salePackageTypeInput" className="form-control" placeholder="Bahamas" ref={salePackageTypeInput}/>