import { useState } from 'react';
import './App.css'

interface Dog {
  imgUrl: string;
  countLike: number;
  countDislike: number;
}

function App() {
  const [doglist, setDogList] = useState<Dog []> ([
    {
      imgUrl: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nfGVufDB8fDB8fHww",
      countLike: 0,
      countDislike: 0
    }
  ])
   
  return (
    <>
      <div className='card-list'>
        <div className='card-dog'>
          <img src={dog.imgUrl} alt="" />
          <div className='container-count'>
            <span className='count-like'>0 ❤️</span>
            <span className='count-dislike'>0 🤮</span>
          </div>
          <div className='buttons'>
            <button className='button-like'>Like</button>
            <button className='button-dislike'> Dislike</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
