// framework
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { Bar } from 'react-chartjs-2';

// my stuffs
import "./travelersPerDestination.css";

const TravelersPerDestination = () => {
    /*
    const [travelersArray, setTravelersArray] = useState({  listId:"0",
                                                            packageName: "phPackageName",
                                                            travelers: 0});
    */    

    const [travelersArray, setTravelersArray] = useState(null);
    let packagesInfo = useSelector(state => state.packagesInfo);
    let packagesSold = useSelector(state => state.userSales);

    const options = {
        indexAxis: 'x',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Total travelers per package:',
            },
        },
    };

    const updateTravelersArray = () => {
        //  updateTravelersArray will be called a couple of times, don't run the body of this method until
        //  we are certain we have all the data
        if(packagesInfo != null && packagesSold != null){
            let newTravelersArray = [];
            
            packagesInfo.forEach((pI,i) => {
                let totalPassengers = 0;
                packagesSold.forEach((pS) => {
                    if(pI.id === pS.id_paquete){
                        totalPassengers+= parseInt(pS.cantidad_mayores);
                        totalPassengers+= parseInt(pS.cantidad_menores);      
                    }
                });

                const newTravelersTotal = { listId: i,
                                            packageName: pI.nombre,
                                            travelers: totalPassengers};

                newTravelersArray = [...newTravelersArray, newTravelersTotal];
            });

            setTravelersArray(newTravelersArray);
        }
    };

    useEffect(() => {
        updateTravelersArray();
    }, [packagesSold,packagesInfo]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        updateTravelersArray();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="travelersPerDestination-wrapper">
            {travelersArray!= null && <Bar  
                                                data={{ labels: travelersArray.map(p => p.packageName),
                                                        datasets:[{ label: 'Travelers', 
                                                                    data: travelersArray.map(p => p.travelers), 
                                                                    borderWidth: 1,
                                                    },],
                                                }}
                                                options={options} 
            />}
        </div>
    )
}

export default TravelersPerDestination
