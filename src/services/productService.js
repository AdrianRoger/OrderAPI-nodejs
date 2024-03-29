const Database = require('../database/Database');
const db = new Database('products');

const getAllProductsService = async () => {
   return new Promise((resolve, reject) => {
      db.readAllData((err, data) => {
         if(err){
            reject({ error: "Erro ao buscar produtos!" });
         }else{
            data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
            resolve(data);
         }
      });
   });
};

const getProductByIdService = async (id) => {
   return await new Promise((resolve, reject) => {
      db.get(id, (err, data) => {
         if(err){
            reject({ error : "Produto não encontrado!" });
         }else{
            resolve({id: id, ...JSON.parse(data.toString())});
         }
      });
   });
};

const createProductService = async (product) => {
   try{
      let nextId;
      const data = await getAllProductsService();
      nextId = data.length > 0 ? Number(data[data.length -1].id) + 1 : 1;

      return await new Promise( (resolve, reject)=> {
         db.put(nextId, JSON.stringify(product), (err)=>{
            if(err){
               reject({ error : "Erro ao cadastrar produto!"});
            }else{
               resolve({ id : nextId, ...product });
            }
         });
      });
   }catch(error){
      return error;
   }
};

const updateProductService = async (id, updatedProduct) => {
   try{
      await getProductByIdService(id);
      return await new Promise((resolve, reject) => {
         db.put(id, JSON.stringify(updatedProduct), (err) =>{
            if(err){
               reject({error : "Erro ao atualizar produto!" });
            }else{
               resolve({id, ...updatedProduct});
            }
         });
      });
   }catch(error){
      return error;
   }
};

const deleteProductService = async (id) => {
	try{
		await getProductByIdService(id);
		return new Promise((resolve, reject) => {
			db.del(id, (err) => {
				if(err){
					reject({ error: "Erro ao excluir produto!" });
				}else{
					resolve({ message : `Produto com id ${id} excluído.` })
				}
			});
		});
	}catch(error){
		return error;
	}
}

module.exports = {
   getAllProductsService,
   getProductByIdService,
   createProductService,
   updateProductService,
   deleteProductService
}