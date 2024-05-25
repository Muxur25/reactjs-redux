export const inc = () => ({type: "INC"})
export const decr = () => ({type: "DECR"})
export const rnd = () => ({type: "RND", payload: Math.floor(Math.random() * 100)})