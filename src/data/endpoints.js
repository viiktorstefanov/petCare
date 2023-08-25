import { del, get, post, put } from './api.js';

const endpoints = {
  animals: '/data/pets?sortBy=_createdOn%20desc&distinct=name',
  animal: '/data/pets',
  donate: '/data/donation?where=petId%3D%22',
  makeDonate: '/data/donation',
  userDonate: '/data/donation?where=petId%3D%22'
};

export async function getAnimals() {
  return await get(endpoints.animals);
}

export async function createAnimal(data) {
  return await post(endpoints.animal, {
    name: data.name,
    breed: data.breed,
    age: data.age,
    weight: data.weight,
    image: data.image,
  });
}

export async function getAnimalById(id) {
  return await get(`${endpoints.animal}/${id}`);
}

export async function deleteAnimal(id) {
  return await del(`${endpoints.animal}/${id}`);
}

export async function editAnimal(animal, id) {
  return await put(`${endpoints.animal}/${id}`, {
    name: animal.name,
    breed: animal.breed,
    age: animal.age,
    weight: animal.weight,
    image: animal.image,
  });
}


export async function getAnimalDonates(petId) {
  return await get(
    `${endpoints.donate}${petId}%22&distinct=_ownerId&count`
  );
}


export async function donateAnimalById(petId) {
  return await post(endpoints.makeDonate, {
    petId,
  });
}

export async function getUserDonateCheck(userId, petId) {
  return await get(
    `${endpoints.userDonate}${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
