const Database = require('../database/Database');
const db = new Database('orders');

const customerService = require('./customerService');
const { getAllProductsService } = require('./productService');

const getAllOrdersService = async () => {
   return new Promise((resolve, reject) => {
      db.readAllData((err, data) => {
         if(err){
            reject({ error: "Erro ao buscar pedidos!" });
         }else{
            data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
            resolve(data);
         }
      });
   });
}

const getOrderByIdService = async (id) => {
   return new Promise((resolve, reject) => {
      db.get(id, (err, data) => {
         if(err){
            reject({error :`Pedido com ID ${id} não encontrado!`});
         }else{
            resolve({id, ...JSON.parse(data.toString())});
         }
      })
   });
}

const getOrdersBySearchService = async (type, param) => {
   let resultOrders = [];
   return new Promise(async (resolve, reject) => {
      const orders = await getAllOrdersService();
      if (type === 1) {
         orders.forEach(order => {
            const index = order.items.findIndex(item => item.id === param);
            if(index !== -1){
               resultOrders.push(order);
            }
         });
      }else if (type === 2) {
         orders.forEach(order =>{
            if(order.customer === param){
               resultOrders.push(order);
            }
         });
      }

      if(resultOrders.length > 0){
         resolve(resultOrders);
      }else{
         reject("Nenhum pedido encontrado.");
      }
   });
};

const createOrderService = async (order) => {
   return new Promise( async (resolve, reject) => {
      try{
         await customerService.getCustomerByIdService(order.customer);
         const products = await getAllProductsService();
         const orderItems = order.items;

         let productsNotFound = [];
         orderItems.forEach(item => {
            const index = products.findIndex(prod => Number(prod.id) === Number(item.id));
            if (index === -1) {
               productsNotFound.push(item.id);
            }
         });

         if (productsNotFound.length > 0) {
            reject(`Produtos com id ${productsNotFound} não encontrados!`);
         }else{
            const data = await getAllOrdersService();
            const nextId = data.length > 0 ? Number(data[data.length -1].id) + 1 : 1;
            db.put(nextId, JSON.stringify(order), err =>{
               if(err){
                  reject( "Erro ao cadastrar pedido!" );
               }else{
                  resolve({ id : nextId, ...order });
               }
            })
         }
      }catch(error){
         reject(error);
      }
   });
};

const updateOrderService = async (id, order) =>{
   return new Promise(async (resolve, reject) => {
      try{
         await customerService.getCustomerByIdService(order.customer);
         await getOrderByIdService(id);
         db.put(id, JSON.stringify(order), (err) =>{
            if(err){
               reject("Erro ao atualizar pedido!");
            }else{
               resolve({id, ...order});
            }
         });
      }catch(error){
         return error;
      }
   });
}

//falta delete

const deleteOrderService = async (id) => {
   try{
      await getOrderByIdService(id);
      return new Promise((resolve, reject) => {
         db.del(id,  (err) => {
            if (err) {
               reject({error : `Erro ao deletar pedido com ID ${id}!`});
            } else {
               resolve({ message: `Pedido com ID ${id} deletado com sucesso!`});
            }
         });
      });
   }catch(error){
      return error
   }
}

// const deleteProductService = async (id) => {
// 	try{
// 		await getProductByIdService(id);
// 		return new Promise((resolve, reject) => {
// 			db.del(id, (err) => {
// 				if(err){
// 					reject({ error: "Erro ao excluir produto!" });
// 				}else{
// 					resolve({ message : `Produto com id ${id} excluído.` })
// 				}
// 			});
// 		});
// 	}catch(error){
// 		return error;
// 	}
// }

module.exports = {
   getAllOrdersService,
   getOrderByIdService,
   getOrdersBySearchService,
   createOrderService,
   updateOrderService,
   deleteOrderService
}
