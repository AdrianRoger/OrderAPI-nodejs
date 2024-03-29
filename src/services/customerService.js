const Database = require('../database/Database');
const db = new Database('customers');

const getAllCustomersService = async () => {
	return new Promise((resolve, reject) => {
		db.readAllData((err, data) => {
			if(err){
				reject({ error: "Erro ao buscar clientes!" });
			}else{
				resolve(data);
			}
		});
	});
};

const getCustomerByIdService = async (id) => {
	return await new Promise((resolve, reject) => {
		db.get(id, (err, data) => {
			if(err){
			  reject({ error : "Cliente não Encontrado!" });
			}else{
			  resolve({id: id, ...JSON.parse(data.toString())});
			}
		});
	});
};

const createCustomerService = async (customer) => {
	try{
		let nextId;
		const data = await getAllCustomersService();
		nextId = data.length > 0 ? Number(data[data.length -1].id) + 1 : 1;

		return await new Promise( (resolve, reject)=> {
			db.put(nextId, JSON.stringify(customer), (err)=>{
				if(err){
					reject({ error : "Erro ao cadastrar cliente!"});
				}else{
					resolve({ id : nextId, ...customer });
				}
			});
		});
	}catch(error){
		return error;
	}
};

const updateCustomerService = async (id, updatedCustomer) => {
	try{
		await getCustomerByIdService(id);
		return await new Promise((resolve, reject) => {
			db.put(id, JSON.stringify(updatedCustomer), (err) =>{
				if(err){
					reject({error : "Erro so atualizar cliente!" });
				}else{
					resolve({id, ...updatedCustomer});
				}
			});
		});
	}catch(error){
		return error;
	}
};

const deleteCustomerService = async (id) => {
	try{
		await getCustomerByIdService(id);
		return new Promise((resolve, reject) => {
			db.del(id, (err) => {
				if(err){
					reject({ error: "Erro ao excluir cliente!" });
				}else{
					resolve({ message : `Cliente com id ${id} excluído.` })
				}
			});
		});
	}catch(error){
		return error;
	}
}

module.exports = {
	getAllCustomersService,
	getCustomerByIdService,
	createCustomerService,
	updateCustomerService,
	deleteCustomerService
}