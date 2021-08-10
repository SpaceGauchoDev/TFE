// framework
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';

// my stuffs
import PackageMostSoldByUser from './packageMostSoldByUser';

const PackagesMostSoldByUser = () => {
    /*
    const [topPackagesArray, setTopPackagesArray] = useState({  listId:"0",
                                                                packageName: "phPackageName",
                                                                timesSold: 0});
    */    

    const [topPackagesArray, setTopPackagesArray] = useState(null);
    let packagesInfo = useSelector(state => state.packagesInfo);
    let packagesSold = useSelector(state => state.userSales);
    let salesMin = useSelector(state => state.salesMinForTopComponent);

    const updateTopPackagesArray = () => {
        //  updateTopPackagesArray will be called a couple of times, don't run the body of this method until
        //  we are certain we have all the data
        if(packagesInfo != null && packagesSold != null){
            let newTopPackagesArray = [];
            
            packagesInfo.forEach((pI,i) => {
                let counter = 0;
                packagesSold.forEach((pS) => {
                    if(pI.id === pS.id_paquete){
                        counter++;
                    }
                });

                if(counter >= salesMin){
                    const newTopPackage = { listId: i,
                                            packageName: pI.nombre,
                                            timesSold: counter}
                    newTopPackagesArray = [...newTopPackagesArray, newTopPackage];
                }
            });

            setTopPackagesArray(newTopPackagesArray);
        }
    };

    useEffect(() => {
        updateTopPackagesArray();
    }, [packagesSold,packagesInfo]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        updateTopPackagesArray();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h2>Most sold packages: </h2>
            {topPackagesArray!== null && topPackagesArray.map(p => <PackageMostSoldByUser key={p.listId} {...p}/>)}
        </div>
    )
}

export default PackagesMostSoldByUser
