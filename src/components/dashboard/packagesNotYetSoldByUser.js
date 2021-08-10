// framework
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';

// my stuffs
import PackageNotYetSoldByUser from './packageNotYetSoldByUser';

const PackagesNotYetSoldByUser = () => {
    /*
    const [notSoldPackagesArray, setNotSoldPackagesArray] = useState({  listId:"0",
                                                                packageName: "phPackageName"});
    */  

    const [notSoldPackagesArray, setNotSoldPackagesArray] = useState(null);
    let packagesInfo = useSelector(state => state.packagesInfo);
    let packagesSold = useSelector(state => state.userSales);

    const updateNotSoldPackagesArray = () => {
        //  updateTopPackagesArray will be called a couple of times, don't run the body of this method until
        //  we are certain we have all the data
        if(packagesInfo != null && packagesSold != null){
            let newNotSoldPackagesArray = [];
            
            packagesInfo.forEach((pI,i) => {
                let counter = 0;
                packagesSold.forEach((pS) => {
                    if(pI.id === pS.id_paquete){
                        counter++;
                    }
                });

                // TODO: Lazy logic, there must be a more elegant way of doing this...
                if(counter === 0){
                    const newNotSoldPackage = { listId: i,
                                               packageName: pI.nombre}
                    newNotSoldPackagesArray = [...newNotSoldPackagesArray, newNotSoldPackage];
                }
            });

            setNotSoldPackagesArray(newNotSoldPackagesArray);
        }
    };

    useEffect(() => {
        updateNotSoldPackagesArray();
    }, [packagesSold,packagesInfo]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        updateNotSoldPackagesArray();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps    

    return (
        <div>
            <h2>Not yet sold packages: </h2>
            {notSoldPackagesArray!== null && notSoldPackagesArray.map(p => <PackageNotYetSoldByUser key={p.listId} {...p}/>)}
        </div>
    )
}

export default PackagesNotYetSoldByUser
