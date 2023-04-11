const BASE = 'https://jsonplace-univclone.herokuapp.com';

export async function getUsers() {
  try {
    const response = await fetch(`${ BASE }/users`);
    const userList = await response.json();
    return userList;
  } catch (error) {
    throw error;
  }
}

export async function getPostsByUser(userId) {
  try {
    const response = await fetch(`${ BASE }/users/${ userId }/posts`);
    const postData = await response.json();
    return postData;
  } catch (error) {
    throw error;
  }
}

export async function getTodosByUser(userId) {
  try {
    const response = await fetch(`${ BASE }/users/${ userId }/todos`);
    const todoData = await response.json();
    return todoData;
  } catch (error) {
    throw error;
  }
}
