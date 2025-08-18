const Cart = () => {
    const [cart, setCart] = React.useState([]);
    const [Name, setName] = React.useState('');
    const [Price, setPrice] = React.useState('');
    const [Quantity, setQuantity] = React.useState('');
    const [editIndex, setEditIndex] = React.useState(null);
    const [editItem, setEditItem] = React.useState({});
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(5);
    const [nextId, setNextId] = React.useState(1);
    const [currentItems, setCurrentItems] = React.useState([]);

    React.useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('/Home/GetItems');
                const data = await response.json();
                setCart(data);
                setCurrentItems(data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
                console.log(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, [currentPage]);

    React.useEffect(() => {
        setCurrentItems(cart.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [cart, currentPage]);

    //const updateQuantity = async (Id, newQuantity) => {
    //    try {
    //        const response = await fetch('/Home/UpdateQuantity', {
    //            method: 'POST',
    //            headers: {
    //                'Content-Type': 'application/json',
    //            },
    //            body: JSON.stringify({ Id, Quantity: newQuantity }),
    //        });

    //        if (response.ok) {
    //            const result = await response.json();
    //            if (result.success) {
    //                setCart(result.items); // replace entire cart with updated data
    //            }
    //        }
    //    } catch (error) {
    //        console.error('Error updating quantity:', error);
    //    }
    //};

    //const handleIncrement = (Id) => {
    //    const item = cart.find(i => i.Id === Id);
    //    if (item) {
    //        const newQuantity = item.Quantity + 1;
    //        updateQuantity(Id, newQuantity);
    //    }
    //};

    //const handleDecrement = (Id) => {
    //    const item = cart.find(i => i.Id === Id);
    //    if (item) {
    //        const newQuantity = item.Quantity > 1 ? item.Quantity - 1 : 1;
    //        updateQuantity(Id, newQuantity);
    //    }
    //};

    const handleIncrement = (Id) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.Id === Id
                    ? { ...item, Quantity: item.Quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrement = (Id) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.Id === Id
                    ? { ...item, Quantity: item.Quantity > 1 ? item.Quantity - 1 : 1 }
                    : item
            )
        );
    };


    const addToCart = async () => {
        try {
            const newItem = {
                id: nextId,  // Unique ID for the new item
                name: Name,
                price: parseFloat(Price),
                quantity: parseInt(Quantity) // Ensure it's an integer
            };

            const response = await fetch('/Home/AddToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Send JSON data
                },
                body: JSON.stringify(newItem) // Send the item as a JSON string
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setCart(result.items);  // Update the cart with the new items
                    setName('');
                    setPrice('');
                    setQuantity('');
                    setNextId(nextId + 1);  // Increment the ID for the next item
                } else {
                    console.log(result.message || "Add failed");
                }
            } else {
                const errorText = await response.text();
                console.error('Error adding item:', errorText || response.statusText);
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };


    const removeFromCart = async (Id) => {
        try {
            const response = await fetch('/Home/RemoveFromCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: Id })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setCart(result.items);
                }
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEditItem = (Id) => {
        const itemToEdit = cart.find(item => item.Id === Id);
        setEditIndex(cart.findIndex(item => item.Id === Id));
        setEditItem({ ...itemToEdit });
    };

    const handleSaveEdit = async () => {
        try {
            const response = await fetch('/Home/EditItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editItem)
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    setCart(result.items);
                    setEditIndex(null);
                    setEditItem({});
                }
            }
        } catch (error) {
            console.error('Error editing item:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(cart.length / itemsPerPage);

    return (
        <div className="container mt-4">
            <h2>Your Shopping Cart</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={Price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={Quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={addToCart}
                >
                    Add Item
                </button>
            </div>

            {editIndex !== null && (
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={editItem.Name}
                        onChange={(e) => setEditItem({ ...editItem, Name: e.target.value })}
                    />
                    <input
                        type="number"
                        className="form-control mt-2"
                        value={editItem.Price}
                        onChange={(e) => setEditItem({ ...editItem, Price: parseFloat(e.target.value) })}
                    />
                    <input
                        type="number"
                        className="form-control mt-2"
                        value={editItem.Quantity}
                        onChange={(e) => setEditItem({ ...editItem, Quantity: parseInt(e.target.value) })}
                    />
                    <button
                        className="btn btn-success mt-2"
                        onClick={handleSaveEdit}
                    >
                        Save Edit
                    </button>
                </div>
            )}

            <ul className="list-group">
                {currentItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                        <div>
                            Name: {item.Name}<br />
                            Price: {item.Price}<br />
                            Quantity: {item.Quantity}
                        </div>
                        <div>
                            <button onClick={() => handleDecrement(item.Id)} style={{ marginRight: '10px' }}>-</button>
                            <span>{item.Quantity}</span>
                            <button onClick={() => handleIncrement(item.Id)} style={{ marginLeft: '10px' }}>+</button>
                        </div>
                        <div>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEditItem(item.Id)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFromCart(item.Id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-3">
                <button
                    className="btn btn-secondary me-2"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button
                    className="btn btn-secondary ms-2"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

ReactDOM.render(<Cart />, document.getElementById('root'));