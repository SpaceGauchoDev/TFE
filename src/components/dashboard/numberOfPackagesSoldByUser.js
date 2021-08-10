import { useSelector} from 'react-redux'

const NumberOfPackagesSoldByUser = () => {
    let numberOfSales = useSelector(state => state.numberOfUserSales);
    return (
        <div>
            <p>Paquetes vendidos: {numberOfSales}</p>
        </div>
    )
}

export default NumberOfPackagesSoldByUser
