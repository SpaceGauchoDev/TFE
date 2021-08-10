// framework
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { Bar } from 'react-chartjs-2';

// my stuffs
import "./averagePricePerPackage.css";



const AveragePricePerPackage = () => {
    /*
    const [averagePricesArray, setAveragePricesArray] = useState({  listId:"0",
                                                                    packageName: "phPackageName"
                                                                    averagePrice: 0});
    */    

    const [averagePricesArray, setAveragePricesArray] = useState(null);
    let packagesInfo = useSelector(state => state.packagesInfo);

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
                text: 'Average price per package:',
            },
        },
    };

    const updateAveragePricesArray = () => {
        //  updateAveragePricesArray will be called a couple of times, don't run the body of this method until
        //  we are certain we have all the data
        if(packagesInfo != null){
            let newAveragePricesArray = [];

            packagesInfo.forEach((pI,i) => {
                const average = (parseInt(pI.precio_mayor) + parseInt(pI.precio_menor))/2;
                const newAverage = {    listId: i,
                                        packageName: pI.nombre,
                                        averagePrice: average}
                newAveragePricesArray = [...newAveragePricesArray, newAverage];
            });

            setAveragePricesArray(newAveragePricesArray);
        }
    };



    useEffect(() => {
        updateAveragePricesArray();
    }, [packagesInfo]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        updateAveragePricesArray();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="pricePerPackage-wrapper">
            {averagePricesArray!= null && <Bar  
                                                data={{ labels: averagePricesArray.map(p => p.packageName),
                                                        datasets:[{ label: 'Average price', 
                                                                    data: averagePricesArray.map(p => p.averagePrice), 
                                                                    borderWidth: 1,
                                                    },],
                                                }}
                                                options={options} 
            />}
        </div>
    )
}

export default AveragePricePerPackage
