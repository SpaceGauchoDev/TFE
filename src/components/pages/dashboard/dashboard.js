import "./dashboard.css";

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
    // update page title
    const baseName = useSelector(state => state.basePageName);
    useEffect(() => {
        document.title = baseName + "Dashboard";
     }, [baseName]);

    const logged = useSelector(state => state.logged);
    
    if(!logged){
        return <Redirect to="/"/>
    }

    return (
        <div>
            <p>Dashboard</p>
        </div>
    )
}


export default Dashboard

