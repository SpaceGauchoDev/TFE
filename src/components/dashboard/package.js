const Package = ({clientName, packageName, adultsNumber, minorsNumber, finalPrice}) => {
    return (
        <div>
            <p>Client: {clientName}</p>
            <p>Package: {packageName}</p>
            <p>Adults: {adultsNumber}</p>
            <p>Minors: {minorsNumber}</p>
            <p>Price: {finalPrice}</p>
            <hr/>
        </div>
    )
}

export default Package
