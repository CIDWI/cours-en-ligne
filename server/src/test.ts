import { AppDataSource } from "./dataSource";
/*import { Animal } from './modules/animal/animalEntity'
import { animalRepository } from './modules/animal/animalRepository'
import { Client } from './modules/user/client/clientEntity'
import { clientRepository } from './modules/user/client/clientRepository'
import { Company } from './modules/user/company/companyEntity'
import { companyRepository } from './modules/user/company/companyRepository'

import { User } from './modules/user/userEntity'
import { userRepository } from './modules/user/userRepository'

const test = async () => {
  await AppDataSource.initialize()
  const animal = new Animal()
  animal.name = 'choupies'
  animal.spicies = 'dog'

  await animalRepository.save(animal)

  const user = new User()
  user.login = 'plop5'
  user.password = 'azerty'
  user.animal = animal

  await userRepository.save(user)

  const client = new Client()
  client.login = 'plop6'
  client.password = 'aertyop'
  client.adress = "23 rue pérotin" 

  await clientRepository.save(client)

  const company = new Company()
  company.login = 'plop7'
  company.password = 'azertyiop'
  company.companyName = 'Alten'

  await companyRepository.save(company)
}

test() */
const test = async () => {
  await AppDataSource.initialize();
};
test();
