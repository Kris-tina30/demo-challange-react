export function createPost(postData) {
  return {
    ...postData,
    _id: Date.now(),
    createdAt: new Date().toLocaleString(),
  };
}
