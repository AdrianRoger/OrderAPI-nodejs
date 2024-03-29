let products = [
    { id: 1, name: 'abacate', value: "2.99" },
    { id: 2, name: 'laranja', value: "1.99" },
    { id: 3, name: 'maçã', value: "0.99" },
    { id: 4, name: 'melão', value: "3.99" },
    { id: 5, name: 'melancia', value: "5.00"}
];

const {
    getAllProductsService, getProductByIdService,
    createProductService, updateProductService, deleteProductService,
} = require('../services');


const getAllProducts = async (req, res) => {
    try {
        const data = await getAllProductsService();
        res.status(200).json(data);
    }catch(error){
        return res.status(500).json(error);
    }
}

const getProductById = async (req, res) => {
    const productId = parseInt(req.params.id);
    try{
        const data = await getProductByIdService(productId);
        res.status(200).json(data);
    }catch(error){
        return res.status(404).json({ error : "Produto não encontrado!"});
    }
}

const createProduct = async (req, res) => {
    const { name, value } = req.body;
    //verificação dos dados está sendo feita no middleware
    const sanitizedValue = parseFloat(value).toFixed(2);
    const newProduct = { name, value: sanitizedValue };

    try{
        const data = await createProductService(newProduct);
        res.status(201).json(data);
    }catch(error){
        res.status(500).json({error : "Erro ao cadastrar novo cliente!"});
    }
}

const updateProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, value } = req.body;
    const sanitizedValue = parseFloat(value).toFixed(2);

    try{
        const data = await updateProductService(productId, { name : name, value : sanitizedValue } );
        return res.status(200).json(data);
    }catch(error){
        return res.status(500).json({error : "Erro ao atualizar produto!"});
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id || null;

    try{
        const data = await deleteProductService(productId);
        return res.status(200).json(data);
    }catch(error){
        return res.status(500).json(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    products
}

