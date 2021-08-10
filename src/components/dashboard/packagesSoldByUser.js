// framework
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';

// my stuffs
import PackageSoldByUser from "./packageSoldByUser";

const PackagesSoldByUser = () => {
    /*
    const [packagesArray, setPackagesArray] = useState({listId:"0",
                                                        clientName: "phClientName", 
                                                        packageName: "phPackageName",
                                                        adultsNumber: 0,
                                                        minorsNumber: 0,
                                                        finalPrice: 0});
    */
    const [packagesArray, setPackagesArray] = useState(null);
    let packagesInfo = useSelector(state => state.packagesInfo);
    let packagesSold = useSelector(state => state.userSales);

    const updatePackagesArray = () => {
        //  UpdatePackagesArray will be called a couple of times, don't run the body of this method until
        //  we are certain we have all the data
        if(packagesInfo != null && packagesSold != null){
            let newPackagesArray = [];
            packagesSold.forEach((p,i) => {

                const info = packagesInfo.find(info => info.id === p.id_paquete);

                if(info !== undefined){
                    let price = parseInt(p.cantidad_mayores)*parseInt(info.precio_mayor);
                    price += parseInt(p.cantidad_menores)*parseInt(info.precio_menor);
    
                    const newPackage = {listId: i,
                                        clientName: p.nombre_cliente,
                                        packageName: info.nombre,
                                        adultsNumber: p.cantidad_mayores,
                                        minorsNumber: p.cantidad_menores,
                                        finalPrice: price
                    };
                    newPackagesArray = [...newPackagesArray, newPackage];
                }else{
                    console.log("PACKAGE WITH INVALID ID FOUND AT @ updatePackagesArray");
                }
            });

            setPackagesArray(newPackagesArray);
        }
    };

    useEffect(() => {
        updatePackagesArray();
    }, [packagesSold,packagesInfo]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        updatePackagesArray();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h2>All packages sold: </h2>
            {packagesArray!== null && packagesArray.map(p => <PackageSoldByUser key={p.listId} {...p}/>)}
        </div>
    )
}

export default PackagesSoldByUser
