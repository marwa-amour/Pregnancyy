import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../../services/postService';

const allToppings = [
  { name: "1st trimester", checked: false },
  { name: "2st trimester", checked: false },
  { name: "3st trimester", checked: false },
]

export const Checkbox = ({ isChecked, label, checkHandler, index }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor={`checkbox-${index}`}>{label}</label>
    </div>
  )
}
export default function AddPost() {


  const navigate = useNavigate();
  const [title, setTitle] = useState(null);
  const [explaintite, setExplaintite] = useState(null);
  const [image, setImage] = useState(null);
  const [body, setBody] = useState(null);
  const [catagories, setCatagories] = useState([]);
  const [likes, setLikes] = useState(0);
  const [toppings, setToppings] = useState(allToppings)

  const handleSubmit = async (e) => {
    setCatagories([])
    toppings.map((topping)=>
      topping.checked? catagories.push(topping.name) :''
    )
    console.log(catagories)
    e.preventDefault();
     await createPost(title, explaintite, image, body, catagories, likes);

    return navigate('/posts');
  }

  const updateCheckStatus = index => {
    setToppings(
      toppings.map((topping, currentIndex) =>
        currentIndex === index
          ? { ...topping, checked: !topping.checked }
          : topping
      )
    )
  }

  return (
    <div className='createPostForm'>
      <h5>Add new post</h5>
      <form onSubmit={(e)=>handleSubmit(e)}>

        <label htmlFor="title">title </label>
        <input type="text" name='title' onChange={(e)=>setTitle(e.target.value)} placeholder='enter title'/>

        <br/><br/>

        <label htmlFor="Explaintite">Explain title </label>
        <input type="text" name='Explaintite' onChange={(e)=>setExplaintite(e.target.value)} placeholder='enter Explain title'/>

        <br/><br/>

        <label htmlFor="image">image </label>
        <input type="text" name='image' onChange={(e)=>setImage(e.target.value)} placeholder="enter image's link"/>

        <br/><br/>

        <label htmlFor="body">body </label>
        <input type="text" name='body' onChange={(e)=>setBody(e.target.value)}  placeholder='enter body'/>

        <br/><br/>

        {toppings.map((topping, index) => (
          <Checkbox
            key={topping.name}
            isChecked={topping.checked}
            checkHandler={() => updateCheckStatus(index)}
            label={topping.name}
            index={index}
          />
        ))}

        <br/><br/>

        <label htmlFor="likes">likes </label>
        <input type="text" name='likes' onChange={(e)=>setLikes(e.target.value)} placeholder="enter like's count"/>

        <br/><br/>

        <button type='submit'>Create New User</button>

      </form>
    </div>
  )
  
}
