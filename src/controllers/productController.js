let products = [
    { id: 1, name: 'abacate', value: "2.99" },
    { id: 2, name: 'laranja', value: "1.99" },
    { id: 3, name: 'maçã', value: "0.99" },
    { id: 4, name: 'melão', value: "3.99" },
    { id: 5, name: 'melancia', value: "5.00"}
];

const Database = require('../database/Database');
const db = new Database('products');

const getAllProducts = (req, res) => {
    db.readAllData( (err, data)=>{
        if(err){
            return res.status(500).json({ error : "Erro ao buscar produtos!"})
        }
    res.status(200).json(data);
    })
}

const getProductById = (req, res) => {
    const productId = parseInt(req.params.id);

    db.get(productId, (err, value)=>{
        if(err){
            return res.status(500).json({ error : 'Produto não encontrado.'})
        }
        res.status(200).json({id: productId, ...JSON.parse(value.toString())});
    });
}

const createProduct = (req, res) => {
    const { name, value } = req.body;
    if (!name || !value) {
        return res.status(400).json({ error: "Dados insuficientes!!" });
    }

    const sanitizedValue = parseFloat(value).toFixed(2);
    const newProduct = { name, value: sanitizedValue };
    let nextId;
    db.readAllData( (err, data)=>{
        if(err){
            return res.status(500).json({ error : "Erro ao buscar produtos!"})
        }
        nextId = data.length > 0 ? Number(data[data.length -1].id) + 1 : 1;

        db.put(nextId, JSON.stringify(newProduct), (err)=>{
          if(err){
              return res.status(500).json({ error : err});
          }
          res.status(201).json({ id : nextId, ...newProduct });
        });
    });
}

const updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, value } = req.body;
    const sanitizedValue = parseFloat(value).toFixed(2);

    db.get(productId, (err, value)=>{
        if(err){
            return res.status(500).json({ error : 'Produto não encontrado.'})
        }

        const updatedProduct = { name, value : sanitizedValue };

        db.put(productId, JSON.stringify(updatedProduct), (err) =>{
           if(err){
               return res.status(500).json({ error : "Erro ao atualizar o produto!"})
           }
           res.status(200).json({ message : `Produto com id ${productId} atualizado!`})
        });
    });
}

const deleteProduct = (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({ error : "Parâmetro id na URL incorreto!"});
    }

    db.get(id, (err, data) =>{
        if(err){
            return res.status(500).json({ error : "Produto nao encontrado!"});
        }

        db.del(id, (err) =>{
            if(err){
                return res.status(500).json({ error: 'Erro ao excluir produto' });
            }
            res.status(200).json({ message : `Produto com id ${id} excluído.` });
        });
    });
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    products
}

